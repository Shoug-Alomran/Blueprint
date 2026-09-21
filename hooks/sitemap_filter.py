from __future__ import annotations

from pathlib import Path
import xml.etree.ElementTree as ET


SITEMAP_NS = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
ET.register_namespace("", SITEMAP_NS["sm"])

_excluded_urls: set[str] = set()


def on_config(config):
    _excluded_urls.clear()
    return config


def _page_url(page, config) -> str:
    return f"{str(config.site_url).rstrip('/')}/{str(page.url).lstrip('/')}".rstrip("/")


def on_page_context(context, page, config, nav):
    meta = getattr(page, "meta", {}) or {}
    page_url = _page_url(page, config)
    page_canonical_url = (getattr(page, "canonical_url", "") or page_url).rstrip("/")
    canonical_override = str(meta.get("canonical", "") or "").rstrip("/")
    robots_content = str(meta.get("robots", "") or "").lower()

    if meta.get("redirect_to"):
        _excluded_urls.add(page_url)

    if "noindex" in robots_content:
        _excluded_urls.add(page_url)

    if canonical_override and canonical_override != page_canonical_url:
        _excluded_urls.add(page_url)

    return context


def on_post_build(config):
    sitemap_path = Path(config["site_dir"]) / "sitemap.xml"
    if not sitemap_path.exists() or not _excluded_urls:
        return

    tree = ET.parse(sitemap_path)
    root = tree.getroot()

    for url_node in list(root.findall("sm:url", SITEMAP_NS)):
        loc_node = url_node.find("sm:loc", SITEMAP_NS)
        if loc_node is None or not loc_node.text:
            continue

        if loc_node.text.rstrip("/") in _excluded_urls:
            root.remove(url_node)

    tree.write(sitemap_path, encoding="utf-8", xml_declaration=True)


def on_page_content(html, page, config, files):
    """Keep local links and previews portable when served below /site/."""
    import posixpath
    import re
    base = str(page.url).rstrip('/') or '.'
    if not str(page.url).endswith('/'):
        base = posixpath.dirname(str(page.url)) or '.'
    prefix = posixpath.relpath('.', base)
    prefix = '' if prefix == '.' else prefix + '/'
    return re.sub(r'(\b(?:href|src|poster)=["\'])/(?!/)', lambda match: match.group(1) + prefix, html)
