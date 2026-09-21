"""Translate the Arabic build (/ar/) from a single catalog.

Most pages on this site render from Jinja templates in overrides/, written in
English. Rather than turning every string in those templates into a lookup
key, this hook translates the *rendered* Arabic pages using i18n/ar/*.yml, so
the templates stay readable and there is one place to maintain Arabic copy.

How a page is translated
------------------------
* Text runs are looked up whole ("Services & Pricing").
* Sentences that carry inline markup -- a headline with <br> and <em>, a
  price with <small>SAR</small> -- are translated as one unit, markup
  included, because Arabic word order rarely lines up piece by piece with the
  English. A unit is the outermost element whose content is only text and
  inline tags.
* alt, title, aria-label and placeholder attributes, and the description /
  Open Graph meta tags, are translated too.
* Anything inside <script>, <style>, <pre>, <code> or an element marked
  translate="no" is left alone.
* Internal page links are pointed at their /ar/ twin, so a visitor who
  switches to Arabic stays in Arabic. Assets, downloads and the language
  toggle itself (it carries hreflang) are left pointing where they were.

Every English string on an Arabic page that has no entry in the catalog is
written to i18n/missing-ar.txt after the build, so new template copy never
ships untranslated without anyone noticing.
"""

from __future__ import annotations

import html
import json
import logging
import posixpath
import re
from collections import defaultdict
from pathlib import Path

import yaml
from mkdocs.plugins import event_priority

log = logging.getLogger("mkdocs.hooks.i18n_ar")

LOCALE = "ar"
PREFIX = LOCALE + "/"

INLINE = {
    "a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn", "em",
    "i", "kbd", "mark", "q", "s", "samp", "small", "span", "strong", "sub",
    "sup", "time", "u", "var", "wbr",
}
VOID = {
    "area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta",
    "param", "source", "track", "wbr",
}
# Content is copied verbatim: never translated, never used to split a unit.
OPAQUE = ("script", "style", "textarea", "pre", "code", "svg", "math", "template")

TOKEN = re.compile(
    r"(?P<comment><!--.*?-->)"
    r"|(?P<opaque><(?P<oname>" + "|".join(OPAQUE) + r")\b[^>]*>.*?</(?P=oname)\s*>)"
    r"|(?P<decl><[!?][^>]*>)"
    r"|(?P<tag></?[A-Za-z][^>]*>)"
    r"|(?P<text>[^<]+)"
    r"|(?P<stray><)",
    re.S | re.I,
)
TAG_NAME = re.compile(r"</?\s*([A-Za-z][A-Za-z0-9-]*)")
ATTR = re.compile(r'(\s)(alt|title|aria-label|placeholder)="([^"]*)"', re.I)
HREF = re.compile(r'(\shref=")([^"]*)(")', re.I)
META_KEYS = {
    "description", "og:title", "og:description", "twitter:title",
    "twitter:description",
}

# Strings that are not prose: never reported as missing.
NOT_PROSE = re.compile(
    r"^(?:"
    r"[\W\d_]+"                                  # numbers, symbols, arrows
    r"|\S+@\S+\.\S+"                             # emails
    r"|(?:https?://|www\.)\S+"                   # urls
    r"|[\w.-]+\.(?:com|net|org|io|tech|sa|dev)/?\S*"  # bare domains
    r"|[\w./-]+\.(?:html|pdf|png|jpe?g|svg|css|js|json|md)"  # file names
    r")$",
    re.I,
)

_catalog: dict[str, str] = {}
_patterns: list[tuple[re.Pattern, str]] = []
# Entries from runtime.yml, embedded in each Arabic page for
# javascripts/i18n-runtime.js to apply to text that scripts insert later.
_runtime: dict = {"strings": {}, "patterns": []}
_pages: set[str] = set()
_missing: dict[str, set[str]] = defaultdict(set)
_root = Path(".")


# --------------------------------------------------------------------------
# Normalisation shared by catalog keys and page content
# --------------------------------------------------------------------------

def _norm_text(value: str) -> str:
    return " ".join(html.unescape(value).split())


def _norm_tag(raw: str) -> str:
    tag = " ".join(raw.split())
    tag = re.sub(r"\s*/>$", ">", tag)
    return tag


def _norm_key(value: str) -> str:
    """Normalise a catalog key or a unit's content to one comparable form."""
    out = []
    for m in TOKEN.finditer(value):
        if m.group("text") is not None:
            out.append(html.unescape(m.group("text")))
        elif m.group("tag"):
            out.append(_norm_tag(m.group("tag")))
        else:
            out.append(m.group(0))
    key = " ".join("".join(out).split())
    key = re.sub(r"\s*<br>\s*", "<br>", key)
    return key


def _is_prose(key: str) -> bool:
    plain = re.sub(r"<[^>]+>", " ", key)
    if re.search(r"[\u0600-\u06FF]", plain):
        return False  # already Arabic (Latin terms such as HTML are expected)
    if len(re.findall(r"[A-Za-z]", plain)) < 2:
        return False
    return not NOT_PROSE.match(plain.strip())


# --------------------------------------------------------------------------
# Loading
# --------------------------------------------------------------------------

def _load_catalog(folder: Path) -> None:
    """Load every i18n/ar/*.yml file: one per page group, plus common.yml."""
    _catalog.clear()
    _patterns.clear()
    _runtime["strings"], _runtime["patterns"] = {}, []
    files = sorted(folder.glob("*.yml"))
    if not files:
        log.warning("i18n: no catalog files in %s; Arabic pages will stay English", folder)
        return
    for path in files:
        data = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
        for entry in data.get("strings", []) or []:
            en, ar = entry.get("en"), entry.get("ar")
            if en is None or ar is None:
                continue
            key = _norm_key(str(en))
            if path.name == "runtime.yml":
                _runtime["strings"][key] = str(ar)
            if key in _catalog and _catalog[key] != str(ar):
                log.warning("i18n: %s redefines %r", path.name, key[:60])
            _catalog[key] = str(ar)
        for entry in data.get("patterns", []) or []:
            _patterns.append((re.compile(entry["match"]), entry["ar"]))
            if path.name == "runtime.yml":
                # Python's \1 back-references become JavaScript's $1.
                _runtime["patterns"].append([entry["match"], re.sub(r"\\(\d)", r"$\1", entry["ar"])])


# --------------------------------------------------------------------------
# Tokenising and unit detection
# --------------------------------------------------------------------------

def _tokenise(source: str) -> list[dict]:
    tokens = []
    for m in TOKEN.finditer(source):
        kind = m.lastgroup
        raw = m.group(0)
        tok = {"kind": kind, "raw": raw}
        if kind == "tag":
            name = TAG_NAME.match(raw).group(1).lower()
            tok["name"] = name
            tok["closing"] = raw.startswith("</")
            tok["void"] = name in VOID or raw.rstrip().endswith("/>")
        elif kind == "opaque":
            tok["name"] = m.group("oname").lower()
        tokens.append(tok)
    return tokens


def _elements(tokens: list[dict]) -> list[dict]:
    """Pair open and close tags into elements with parent links."""
    elements, stack = [], []
    for i, tok in enumerate(tokens):
        if tok["kind"] != "tag" or tok["void"]:
            continue
        if not tok["closing"]:
            el = {"open": i, "close": None, "name": tok["name"],
                  "parent": stack[-1] if stack else None,
                  "no_translate": 'translate="no"' in tok["raw"].replace("'", '"')}
            elements.append(el)
            stack.append(el)
            continue
        # Close the nearest matching element; tolerate stray closers.
        for depth in range(len(stack) - 1, -1, -1):
            if stack[depth]["name"] == tok["name"]:
                for el in stack[depth:]:
                    if el["close"] is None:
                        el["close"] = i
                del stack[depth:]
                break
    return [el for el in elements if el["close"] is not None]


def _is_unit_candidate(el: dict, tokens: list[dict]) -> bool:
    content = tokens[el["open"] + 1: el["close"]]
    if not content:
        return False
    has_tag, has_direct_text, depth = False, False, 0
    in_headerlink = False
    for tok in content:
        kind = tok["kind"]
        # A heading's permalink anchor (<a class="headerlink">¶</a>) is not
        # part of the sentence: without this, every markdown heading would
        # need its anchor spelled out in the catalog key.
        if kind == "tag" and tok["name"] == "a":
            if not tok["closing"] and "headerlink" in tok["raw"]:
                in_headerlink = True
                continue
            if tok["closing"] and in_headerlink:
                in_headerlink = False
                continue
        if in_headerlink:
            continue
        if kind == "text":
            if depth == 0 and tok["raw"].strip():
                has_direct_text = True
        elif kind == "comment":
            continue
        elif kind == "opaque":
            if tok["name"] != "code":
                return False
            has_tag = True
        elif kind == "tag":
            if tok["name"] not in INLINE:
                return False
            has_tag = True
            if not tok["void"]:
                depth += -1 if tok["closing"] else 1
        else:
            return False
    return has_tag and has_direct_text


def _plan(tokens: list[dict]):
    """Return (units by open index, token indices that must not change)."""
    elements = _elements(tokens)
    candidate = {id(el): _is_unit_candidate(el, tokens) for el in elements}
    units, frozen = {}, set()
    for el in elements:
        if el["no_translate"]:
            frozen.update(range(el["open"] + 1, el["close"]))
        if not candidate[id(el)]:
            continue
        parent = el["parent"]
        if parent is not None and candidate.get(id(parent)):
            continue  # an enclosing element is the unit
        units[el["open"]] = el
    return units, frozen


# --------------------------------------------------------------------------
# Translation
# --------------------------------------------------------------------------

def _lookup(key: str) -> str | None:
    if key in _catalog:
        return _catalog[key]
    for pattern, replacement in _patterns:
        m = pattern.match(key)
        if m:
            return m.expand(replacement)
    return None


def _translate_text(raw: str, page: str) -> str:
    key = _norm_text(raw)
    if not key:
        return raw
    found = _lookup(key)
    if found is None:
        if _is_prose(key):
            _missing[key].add(page)
        return raw
    lead = raw[: len(raw) - len(raw.lstrip())]
    trail = raw[len(raw.rstrip()):]
    safe = found.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    return lead + safe + trail


def _translate_attrs(raw: str, name: str, page: str) -> str:
    def swap(value: str) -> str:
        key = _norm_text(value)
        found = _lookup(key) if key else None
        if found is None:
            if key and _is_prose(key):
                _missing[key].add(page)
            return value
        return html.escape(found, quote=True)

    raw = ATTR.sub(lambda m: m.group(1) + m.group(2) + '="' + swap(m.group(3)) + '"', raw)
    if name == "meta":
        which = re.search(r'\s(?:name|property)="([^"]+)"', raw)
        if which and which.group(1).lower() in META_KEYS:
            raw = re.sub(r'(\scontent=")([^"]*)(")',
                         lambda m: m.group(1) + swap(m.group(2)) + m.group(3), raw)
    return raw


def _rewrite_href(raw: str, page_url: str) -> str:
    """Point an internal page link at its Arabic twin."""
    if "hreflang=" in raw:
        return raw

    def fix(m):
        href = m.group(2)
        if not href or href.startswith(("#", "mailto:", "tel:", "javascript:", "data:",
                                         "http:", "https:", "//")):
            return m.group(0)
        split = re.match(r"([^?#]*)(.*)", href)
        path, suffix = split.group(1), split.group(2)
        if re.search(r"\.[A-Za-z0-9]{1,5}$", path):
            return m.group(0)  # a file, not a page
        target = posixpath.normpath(posixpath.join(page_url, path))
        target = "" if target in (".", "") else target + "/"
        if target.startswith(PREFIX) or target not in _pages:
            return m.group(0)
        localised = PREFIX + target
        relative = posixpath.relpath(localised or ".", page_url or ".")
        relative = "./" if relative == "." else relative + "/"
        return m.group(1) + relative + suffix + m.group(3)

    return HREF.sub(fix, raw)


def translate(source: str, page_url: str) -> str:
    tokens = _tokenise(source)
    units, frozen = _plan(tokens)
    out, i, n = [], 0, len(tokens)
    while i < n:
        tok = tokens[i]
        kind = tok["kind"]
        if kind == "tag" and not tok["closing"]:
            raw = _translate_attrs(tok["raw"], tok["name"], page_url)
            if tok["name"] == "a":
                raw = _rewrite_href(raw, page_url)
            out.append(raw)
            unit = units.get(i)
            if unit and i not in frozen:
                inner = "".join(t["raw"] for t in tokens[i + 1: unit["close"]])
                key = _norm_key(inner)
                found = _lookup(key)
                if found is not None:
                    out.append(found)
                    i = unit["close"]
                    continue
                if _is_prose(key):
                    _missing[key].add(page_url)
                # No whole-unit entry: fall through and translate the parts.
            i += 1
            continue
        if kind == "text" and i not in frozen:
            out.append(_translate_text(tok["raw"], page_url))
        else:
            out.append(tok["raw"])
        i += 1
    return "".join(out)


# --------------------------------------------------------------------------
# MkDocs events
# --------------------------------------------------------------------------

def on_config(config):
    global _root
    _root = Path(config.config_file_path).parent
    _load_catalog(_root / "i18n" / "ar")
    _missing.clear()
    return config


def on_files(files, config):
    for f in files.documentation_pages():
        url = f.url
        # MkDocs reports the homepage's file URL as "./", not "".
        if url.startswith("./"):
            url = url[2:]
        if url.startswith(PREFIX):
            url = url[len(PREFIX):]
        _pages.add(url)
    return files


def on_post_page(output, page, config):
    if not page.url.startswith(PREFIX) and page.url != LOCALE:
        return output
    output = translate(output, page.url)
    if _runtime["strings"] or _runtime["patterns"]:
        payload = json.dumps(_runtime, ensure_ascii=False).replace("</", "<\\/")
        output = output.replace("</head>", f"<script>window.BP_I18N={payload};</script>\n</head>", 1)
    return output


@event_priority(-300)
def on_post_build(config):
    report = _root / "i18n" / "missing-ar.txt"
    if not _missing:
        if report.exists():
            report.unlink()
        return
    lines = ["# English strings on Arabic pages with no entry in i18n/ar/*.yml",
             "# Add each one under `strings:` in the matching file and rebuild.", ""]
    for key in sorted(_missing):
        pages = ", ".join(sorted(_missing[key])[:4])
        lines.append(f"{key}\n    -> {pages}")
    report.write_text("\n".join(lines) + "\n", encoding="utf-8")
    log.warning("i18n: %d untranslated strings on Arabic pages (see %s)",
                len(_missing), report.relative_to(_root))
