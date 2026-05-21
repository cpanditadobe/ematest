/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-split
 * Base block: hero
 * Source selector: header.secondary-section
 * Structure: Split hero with text/CTAs on one side and images on the other
 * Generated: 2026-05-21
 *
 * Target table structure (from block library):
 *   Row 1: Background image(s) - the visual side of the split
 *   Row 2: Title (heading) + Subheading (text) + Call-to-Action links
 */
export default function parse(element, { document }) {
  // Extract heading (h1 with class h1-heading, fallback to any h1/h2)
  const heading = element.querySelector('h1.h1-heading, h1, h2');

  // Extract subheading (p with class subheading, fallback to first paragraph)
  const subheading = element.querySelector('p.subheading, p');

  // Extract CTA buttons from button-group or direct links
  const buttonGroup = element.querySelector('.button-group');
  const ctaLinks = buttonGroup
    ? Array.from(buttonGroup.querySelectorAll('a.button, a'))
    : Array.from(element.querySelectorAll('a.button, a.secondary-button'));

  // Extract images (cover images from the visual/image side of the split)
  const images = Array.from(element.querySelectorAll('img.cover-image, img'));

  // Build cells to match hero block library structure
  const cells = [];

  // Row 1: Images (background/visual side of the split hero)
  if (images.length > 0) {
    cells.push([images]);
  }

  // Row 2: Content (heading + subheading + CTAs) in a single cell
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  if (ctaLinks.length > 0) contentCell.push(...ctaLinks);
  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-split', cells });
  element.replaceWith(block);
}
