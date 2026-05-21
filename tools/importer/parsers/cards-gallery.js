/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-gallery variant.
 * Base block: cards
 * Source: https://wknd-trendsetters.site
 * Selector: .grid-layout.grid-gap-sm:has(.utility-aspect-1x1)
 * Generated: 2026-05-21
 *
 * Source structure: A grid of div.utility-aspect-1x1 containers, each holding
 * a single img.cover-image with alt text. These are image-only gallery cards.
 *
 * Target structure (Cards block library):
 * - 2 columns per row: image in cell 1, text content in cell 2
 * - Each row represents one card
 * - For gallery variant: image + alt text as description
 */
export default function parse(element, { document }) {
  // Extract all gallery image containers
  const imageContainers = element.querySelectorAll('.utility-aspect-1x1');

  const cells = [];

  imageContainers.forEach((container) => {
    // Each container has a single cover-image
    const img = container.querySelector('img.cover-image, img');

    if (img) {
      // Cell 1: the image element
      const imageCell = img;

      // Cell 2: alt text as description (preserves accessibility content)
      const textCell = [];
      if (img.alt) {
        const description = document.createElement('p');
        description.textContent = img.alt;
        textCell.push(description);
      }

      // Each row is [imageCell, textCell] matching Cards block 2-column structure
      cells.push([imageCell, textCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-gallery', cells });
  element.replaceWith(block);
}
