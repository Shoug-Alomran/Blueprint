"""Mirrored stylesheets for the Arabic build.

Flexbox and grid already follow dir="rtl", but the stylesheets also use a lot
of physical geometry: margin-left, border-right, `left: 0`, text-align: left,
translateX() hover nudges, 4-value margin/padding shorthands. On Arabic pages
all of that has to point the other way.

Rather than maintain a hand-written override file that drifts every time a
stylesheet changes, this hook writes a mirrored copy of each stylesheet in
extra_css at build time (styles/home.css -> styles/home.rtl.css) and points
the Arabic build at those copies. English pages keep loading the originals.
This is the same model as Bootstrap's bootstrap.rtl.css.

To keep a declaration physical on Arabic pages, end it with `/* rtl:ignore */`
on the same line.
"""

from __future__ import annotations

import logging
import re
from pathlib import Path

from mkdocs.plugins import event_priority

log = logging.getLogger("mkdocs.hooks.rtl_css")

_original_css: list[str] = []

SWAP_PROPS = re.compile(r"left|right", re.I)
FOUR_VALUE = {
    "margin", "padding", "border-width", "border-style", "border-color",
    "inset", "scroll-margin", "scroll-padding",
}
KEYWORD_PROPS = {"text-align", "float", "clear", "caption-side", "resize"}
ORIGIN_PROPS = {"transform-origin", "background-position", "background-position-x",
                "perspective-origin", "object-position", "mask-position"}
# The terminator is a lookahead so it is left in place for the next match:
# minified rules put no whitespace between declarations.
DECL = re.compile(r"(?P<pre>[{;\s])(?P<prop>-?[a-zA-Z-]+)\s*:\s*(?P<val>[^;{}]+?)(?=\s*[;}])")


def _swap_words(value: str) -> str:
    return re.sub(r"\b(left|right)\b",
                  lambda m: "right" if m.group(1) == "left" else "left", value)


def _split_top(value: str) -> list[str]:
    """Split on whitespace outside parentheses."""
    parts, depth, cur = [], 0, ""
    for ch in value:
        if ch == "(":
            depth += 1
        elif ch == ")":
            depth -= 1
        if ch.isspace() and depth == 0:
            if cur:
                parts.append(cur)
                cur = ""
            continue
        cur += ch
    if cur:
        parts.append(cur)
    return parts


def _negate(length: str) -> str:
    length = length.strip()
    if re.fullmatch(r"[-+]?0*\.?0+(?:[a-z%]*)", length):
        return length
    if length.startswith("-"):
        return length[1:]
    if re.match(r"^(calc|var|min|max|clamp)\(", length):
        return f"calc(-1 * {length})"
    return "-" + length.lstrip("+")


def _flip_translate(value: str) -> str:
    def tx(m):
        return f"{m.group(1)}({_negate(m.group(2))})"

    def txy(m):
        args = _split_args(m.group(2))
        if args:
            args[0] = _negate(args[0])
        return f"{m.group(1)}({', '.join(args)})"

    value = re.sub(r"\b(translateX)\(([^()]*(?:\([^()]*\)[^()]*)*)\)", tx, value)
    value = re.sub(r"\b(translate3d|translate)\(([^()]*(?:\([^()]*\)[^()]*)*)\)", txy, value)
    return value


def _split_args(inner: str) -> list[str]:
    args, depth, cur = [], 0, ""
    for ch in inner:
        if ch == "(":
            depth += 1
        elif ch == ")":
            depth -= 1
        if ch == "," and depth == 0:
            args.append(cur.strip())
            cur = ""
            continue
        cur += ch
    if cur.strip():
        args.append(cur.strip())
    return args


def _flip_origin(value: str) -> str:
    """Mirror the horizontal component of a position value."""
    value = _swap_words(value)
    parts = _split_top(value)
    if parts:
        first = parts[0]
        if re.fullmatch(r"0(?:px|rem|em)?", first):
            parts[0] = "100%"
        elif first == "100%":
            parts[0] = "0"
        elif re.fullmatch(r"-?\d*\.?\d+%", first):
            parts[0] = f"{100 - float(first[:-1]):g}%"
    return " ".join(parts)


def _flip_decl(prop: str, value: str) -> tuple[str, str]:
    important = ""
    m = re.search(r"\s*!important\s*$", value)
    if m:
        important, value = " !important", value[: m.start()]
    low = prop.lower()

    if low in FOUR_VALUE:
        parts = _split_top(value)
        if len(parts) == 4:
            parts[1], parts[3] = parts[3], parts[1]
            value = " ".join(parts)
    elif low == "border-radius" and "/" not in value:
        parts = _split_top(value)
        if len(parts) == 4:
            value = " ".join([parts[1], parts[0], parts[3], parts[2]])
        elif len(parts) == 3:
            value = " ".join([parts[1], parts[0], parts[1], parts[2]])
        elif len(parts) == 2:
            value = " ".join([parts[1], parts[0]])
    elif low in KEYWORD_PROPS:
        value = _swap_words(value)
    elif low in ORIGIN_PROPS:
        value = _flip_origin(value)
    elif low in ("transform", "-webkit-transform"):
        value = _flip_translate(value)
    elif low == "translate":
        parts = _split_top(value)
        if parts:
            parts[0] = _negate(parts[0])
            value = " ".join(parts)

    if "left" in low or "right" in low:
        prop = SWAP_PROPS.sub(lambda m: "right" if m.group(0) == "left" else "left", prop)

    return prop, value + important


def mirror(css: str) -> str:
    comments = [m.span() for m in re.finditer(r"/\*.*?\*/", css, flags=re.S)]

    def in_comment(pos: int) -> bool:
        return any(a <= pos < b for a, b in comments)

    def replace(m):
        if in_comment(m.start("prop")):
            return m.group(0)
        line_start = css.rfind("\n", 0, m.start()) + 1
        line_end = css.find("\n", m.end())
        line = css[line_start: line_end if line_end != -1 else len(css)]
        prop, val = m.group("prop"), m.group("val")
        if "rtl:ignore" in line or prop.startswith("--"):
            return m.group(0)  # opted out, or a custom property's raw value
        new_prop, new_val = _flip_decl(prop, val)
        return f"{m.group('pre')}{new_prop}: {new_val}"

    return DECL.sub(replace, css)


def _rtl_name(path: str) -> str:
    return re.sub(r"\.css$", ".rtl.css", path)


def _current_language(config) -> str:
    plugin = config.plugins.get("i18n")
    return getattr(plugin, "current_language", None) or "en"


def on_config(config):
    _original_css[:] = [str(p) for p in config.extra_css]
    return config


def on_pre_build(config):
    local = [p for p in _original_css if not re.match(r"^(https?:)?//", p)]
    if _current_language(config) == "ar":
        config.extra_css[:] = [_rtl_name(p) if p in local else p for p in _original_css]
    else:
        config.extra_css[:] = list(_original_css)


@event_priority(-50)
def on_post_build(config):
    docs = Path(config["docs_dir"])
    site = Path(config["site_dir"])
    written = 0
    for rel in _original_css:
        if re.match(r"^(https?:)?//", rel):
            continue
        src = docs / rel
        if not src.exists():
            continue
        dest = site / _rtl_name(rel)
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_text(
            "/* Generated by hooks/rtl_css.py from " + rel + " -- do not edit. */\n"
            + mirror(src.read_text(encoding="utf-8")),
            encoding="utf-8",
        )
        written += 1
    if written:
        log.info("rtl: mirrored %d stylesheets for Arabic pages", written)
