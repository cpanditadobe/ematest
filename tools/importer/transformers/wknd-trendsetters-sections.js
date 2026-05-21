/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: wknd-trendsetters sections.
 * Inserts section breaks (<hr>) and Section Metadata blocks based on template sections.
 * Selectors validated against migration-work/cleaned.html:
 *   - header.section.secondary-section (Hero)
 *   - section:has(.breadcrumbs) (Featured Article)
 *   - section.secondary-section:has(.utility-aspect-1x1) (Photo Gallery, style: grey)
 *   - section:has(.tabs-wrapper) (Testimonials)
 *   - section.secondary-section:has(.article-card) (Latest Articles, style: grey)
 *   - section:has(.faq-list) (FAQ)
 *   - section.inverse-section (CTA Banner)
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { document } = payload;
    const sections = payload.template && payload.template.sections;
    if (!sections || sections.length < 2) return;

    // Process sections in reverse order to avoid offset issues when inserting elements
    const reversedSections = [...sections].reverse();

    reversedSections.forEach((section) => {
      const sectionEl = element.querySelector(section.selector);
      if (!sectionEl) return;

      // Add Section Metadata block if section has a style
      if (section.style) {
        const sectionMetadataBlock = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.append(sectionMetadataBlock);
      }

      // Insert <hr> before section if it is not the first section
      const isFirst = sections.indexOf(section) === 0;
      if (!isFirst) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    });
  }
}
