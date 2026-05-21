/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-article
 * Base block: columns
 * Source: https://wknd-trendsetters.site
 * Selector: section:has(.breadcrumbs)
 * Generated: 2026-05-21
 *
 * Extracts a two-column article layout:
 *   Column 1: Cover image
 *   Column 2: Breadcrumbs, heading, author name, date/read time
 */
export default function parse(element, { document }) {
  // Column 1: Cover image
  const coverImage = element.querySelector('img.cover-image, img.utility-aspect-3x2, .grid-layout > div:first-child img');

  // Column 2: Content elements
  const breadcrumbs = element.querySelector('.breadcrumbs');
  const heading = element.querySelector('h2.h2-heading, h2, h1');

  // Author info
  const authorContainer = element.querySelector('.flex-horizontal.flex-gap-xxs');
  const dateContainer = element.querySelector('.utility-margin-top-0-5rem, .flex-horizontal.flex-gap-xxs + .flex-horizontal');

  // Build content for column 2
  const contentCell = [];

  if (breadcrumbs) {
    contentCell.push(breadcrumbs);
  }

  if (heading) {
    contentCell.push(heading);
  }

  if (authorContainer) {
    contentCell.push(authorContainer);
  }

  if (dateContainer && dateContainer !== authorContainer) {
    contentCell.push(dateContainer);
  }

  // Build cells: one row with two columns
  const cells = [];

  // Row 1: [image column, content column]
  const imageCell = [];
  if (coverImage) {
    imageCell.push(coverImage);
  }

  cells.push([imageCell, contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-article', cells });
  element.replaceWith(block);
}
