/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-banner
 * Base block: hero
 * Source selector: section.inverse-section
 * Generated: 2026-05-21
 *
 * Target structure (from block library):
 *   Row 1: Background image (optional)
 *   Row 2: Title (heading) + Subheading (text) + Call-to-Action (link)
 *
 * Source structure:
 *   - img.cover-image — background/overlay image
 *   - h2.h1-heading — main title
 *   - p.subheading — description paragraph
 *   - .button-group a.button — CTA link(s)
 */
export default function parse(element, { document }) {
  // Extract background image
  const bgImage = element.querySelector('img.cover-image, img[class*="cover"], img[class*="background"], img[class*="overlay"]');

  // Extract heading (h2.h1-heading in source, fallback to other heading levels)
  const heading = element.querySelector('h2.h1-heading, h1, h2[class*="heading"], h2');

  // Extract subheading/description
  const description = element.querySelector('p.subheading, p[class*="subheading"], .card-body > p, .utility-text-on-overlay > p');

  // Extract CTA links from button group
  const ctaLinks = Array.from(element.querySelectorAll('.button-group a.button, .button-group a, a.button.inverse-button, a.inverse-button'));

  // Build cells to match block library structure:
  // Row 1: background image (optional)
  // Row 2: heading + subheading + CTA(s)
  const cells = [];

  // Row 1: Background image (only if present)
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Row 2: Content cell — heading, description, and CTA(s) in a single cell
  // Wrap all content elements in a container div so they render as one cell
  const contentContainer = document.createElement('div');
  if (heading) contentContainer.appendChild(heading);
  if (description) contentContainer.appendChild(description);
  if (ctaLinks.length > 0) {
    ctaLinks.forEach((link) => contentContainer.appendChild(link));
  }
  cells.push([contentContainer]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-banner', cells });
  element.replaceWith(block);
}
