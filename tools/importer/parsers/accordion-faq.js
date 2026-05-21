/* eslint-disable */
/* global WebImporter */
/**
 * Parser for accordion-faq
 * Base block: accordion
 * Source: https://wknd-trendsetters.site
 * Selector: .faq-list
 * Generated: 2026-05-21
 *
 * Source structure:
 *   div.faq-list > details.faq-item
 *     > summary.faq-question > span (question text)
 *     > div.faq-answer > p (answer content)
 *
 * Target structure (from block library):
 *   2-column table, one row per accordion item
 *   Column 1: Title/question text
 *   Column 2: Content/answer body
 */
export default function parse(element, { document }) {
  // Extract all FAQ items from the source
  const faqItems = element.querySelectorAll('details.faq-item, details');

  const cells = [];

  faqItems.forEach((item) => {
    // Extract question - from summary element
    const summary = item.querySelector('summary.faq-question, summary');
    const questionSpan = summary ? summary.querySelector('span') : null;

    // Extract answer - from faq-answer div or direct content after summary
    const answerDiv = item.querySelector('div.faq-answer, .faq-answer');

    // Build the title cell - use the span text or the full summary content
    const titleCell = [];
    if (questionSpan) {
      titleCell.push(questionSpan);
    } else if (summary) {
      titleCell.push(summary);
    }

    // Build the content cell - use the answer div's children
    const contentCell = [];
    if (answerDiv) {
      const answerContent = answerDiv.querySelectorAll('p, ul, ol, div, h1, h2, h3, h4, h5, h6, a, img');
      if (answerContent.length > 0) {
        answerContent.forEach((el) => contentCell.push(el));
      } else {
        // Fallback: use the answer div itself
        contentCell.push(answerDiv);
      }
    }

    // Only add row if we have both title and content
    if (titleCell.length > 0 && contentCell.length > 0) {
      cells.push([titleCell, contentCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}
