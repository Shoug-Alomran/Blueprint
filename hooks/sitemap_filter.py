from __future__ import annotations

from pathlib import Path
import xml.etree.ElementTree as ET


SITEMAP_NS = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
ET.register_namespace("", SITEMAP_NS["sm"])

_excluded_urls: set[str] = set()


def on_page_context(context, page, config, nav):
    meta = getattr(page, "meta", {}) or {}

    if meta.get("redirect_to"):
        page_url = getattr(page, "canonical_url", "") or f"{config.site_url}{page.url}"
        _excluded_urls.add(page_url.rstrip("/"))

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
