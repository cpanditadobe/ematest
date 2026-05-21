/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-article
 * Base block: cards
 * Source selector: .grid-layout.grid-gap-md:has(.article-card)
 * Description: Parses article card grids into Cards block format.
 *   Each article card has an image, category tag, date, title, and link.
 * Generated: 2026-05-21
 */
export default function parse(element, { document }) {
  // Find all article cards within the grid
  const articleCards = element.querySelectorAll('a.article-card, .article-card');

  const cells = [];

  articleCards.forEach((card) => {
    // Cell 1: Image
    const image = card.querySelector('.article-card-image img, img.cover-image, img');

    // Cell 2: Text content (heading, description/meta, link)
    const contentCell = [];

    // Extract the heading
    const heading = card.querySelector('h3, h2, h4, .h4-heading, [class*="heading"]');
    if (heading) {
      // Create a strong element for the heading to match Cards block structure
      const h = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = heading.textContent.trim();
      h.appendChild(strong);
      contentCell.push(h);
    }

    // Extract category tag and date as description
    const tag = card.querySelector('.tag, .article-card-meta span:first-child');
    const date = card.querySelector('.paragraph-sm, .utility-text-secondary, .article-card-meta span:last-child');

    if (tag || date) {
      const metaText = [];
      if (tag) metaText.push(tag.textContent.trim());
      if (date) metaText.push(date.textContent.trim());
      const metaParagraph = document.createElement('p');
      metaParagraph.textContent = metaText.join(' | ');
      contentCell.push(metaParagraph);
    }

    // Extract link/CTA - the card itself is typically a link
    const linkHref = card.tagName === 'A' ? card.getAttribute('href') : null;
    if (linkHref) {
      const ctaLink = document.createElement('a');
      ctaLink.setAttribute('href', linkHref);
      ctaLink.textContent = 'Read more';
      const ctaParagraph = document.createElement('p');
      ctaParagraph.appendChild(ctaLink);
      contentCell.push(ctaParagraph);
    }

    // Build the row: [image, textContent]
    if (image || contentCell.length > 0) {
      const imageCell = image ? [image] : [''];
      cells.push([imageCell, contentCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells });
  element.replaceWith(block);
}
