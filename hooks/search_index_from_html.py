"""Rebuild search_index.json from the rendered pages.

Most pages on this site render from Jinja templates in overrides/ rather than
from their markdown body, so MkDocs' own index — built from markdown — misses
their real content and, worse, still carries superseded copy (an older pricing
table, for one). Searching then surfaces text that no longer appears anywhere
on the page.

This runs after the build, reads what was actually written to site/, and
replaces the index with the visible text of each page.
"""

from __future__ import annotations

import json
import re
from html.parser import HTMLParser
from pathlib import Path

from mkdocs.plugins import event_priority

# Non-default languages built into their own subdirectory by mkdocs-static-i18n.
LOCALES = ("ar",)

# Chrome that appears on every page: indexing it makes every query match
# everything.
SKIP_TAGS = {"script", "style", "noscript", "svg", "template"}
SKIP_CLASSES = (
    "studio-header",
    "studio-nav",
    "studio-footer",
    "bp-footer",
    "bp-search",
    "studio-skip",
    "md-skip",
)


VOID_TAGS = {
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr",
}


class PageText(HTMLParser):
    """Collect the visible text of a page, skipping shared chrome.

    Skipping is depth-tracked: when a skipped element opens we remember how
    deep the tag stack was, and we only resume collecting once we have popped
    back out to that depth. The earlier version decremented on every closing
    tag, which let nav text leak back in after the first child closed.
    """

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.parts: list[str] = []
        self.title = ""
        self.headings: list[str] = []
        self._stack: list[str] = []
        self._skip_from: int | None = None
        self._in_title = False
        self._in_heading = False
        self._heading = ""

    @property
    def _skipping(self) -> bool:
        return self._skip_from is not None

    def handle_starttag(self, tag, attrs):
        if tag in VOID_TAGS:
            return
        self._stack.append(tag)
        if self._skipping:
            return
        classes = dict(attrs).get("class", "") or ""
        if tag in SKIP_TAGS or any(c in classes.split() for c in SKIP_CLASSES):
            self._skip_from = len(self._stack) - 1
            return
        if tag == "title":
            self._in_title = True
        elif tag in ("h1", "h2", "h3"):
            self._in_heading = True
            self._heading = ""

    def handle_startendtag(self, tag, attrs):
        return  # self-closing: nothing to collect

    def handle_endtag(self, tag):
        if tag in VOID_TAGS:
            return
        # Unwind to the most recent matching open tag.
        if tag in self._stack:
            while self._stack:
                popped = self._stack.pop()
                if popped == tag:
                    break
        if self._skipping and len(self._stack) <= self._skip_from:
            self._skip_from = None
            return
        if self._skipping:
            return
        if tag == "title":
            self._in_title = False
        elif tag in ("h1", "h2", "h3"):
            self._in_heading = False
            text = self._heading.strip()
            if text:
                self.headings.append(text)
            self._heading = ""

    def handle_data(self, data):
        if self._skipping:
            return
        if self._in_title:
            self.title += data
            return
        if not data.strip():
            return
        if self._in_heading:
            self._heading += data
        self.parts.append(data.strip())


def _clean(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def _collect(site_dir: Path, subdir: str | None) -> list[dict]:
    """Visible text of every page under site_dir (or site_dir/subdir)."""
    base = site_dir / subdir if subdir else site_dir
    docs = []
    for html_file in sorted(base.rglob("*.html")):
        rel = html_file.relative_to(site_dir)
        parts = rel.parts
        if subdir is None and parts and parts[0] in LOCALES:
            continue  # another language's pages live in their own index
        inner = parts[1:] if subdir else parts
        if inner and inner[0] in {"cv-templates", "assets", "search"}:
            continue
        if rel.name == "404.html" or "assets/examples" in rel.as_posix():
            continue

        try:
            raw = html_file.read_text(encoding="utf-8", errors="ignore")
        except OSError:
            continue

        parser = PageText()
        try:
            parser.feed(raw)
        except Exception:
            continue

        text = _clean(" ".join(parser.parts))
        if len(text) < 40:
            continue

        location = rel.as_posix()
        location = location[: -len("index.html")] if location.endswith("index.html") else location
        title = _clean(parser.title.split(" - ")[0]) or _clean(
            parser.headings[0] if parser.headings else location or "Home"
        )
        docs.append({"location": location, "title": title, "text": text})
    return docs


# Runs after mkdocs-static-i18n (-100) has built /ar/, and after Material's
# search plugin, which would otherwise overwrite this index with the
# markdown-based one. The Arabic build triggers this too, partway through;
# the outer English build runs it again last, so the final files are complete.
@event_priority(-200)
def on_post_build(config):
    site_dir = Path(config["site_dir"])
    index_path = site_dir / "search" / "search_index.json"

    payload = {"config": {"lang": ["en"], "separator": r"[\s\-]+", "pipeline": []}, "docs": []}
    if index_path.exists():
        try:
            payload = json.loads(index_path.read_text(encoding="utf-8"))
        except (OSError, ValueError):
            pass

    targets = [(None, index_path)] + [
        (loc, site_dir / loc / "search" / "search_index.json")
        for loc in LOCALES if (site_dir / loc).is_dir()
    ]
    for subdir, path in targets:
        docs = _collect(site_dir, subdir)
        if not docs:
            continue
        out = dict(payload)
        out["docs"] = docs
        if subdir:
            out["config"] = {**payload.get("config", {}), "lang": [subdir]}
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(json.dumps(out, ensure_ascii=False), encoding="utf-8")
        print(f"INFO    -  search: indexed {len(docs)} {subdir or 'en'} pages")
