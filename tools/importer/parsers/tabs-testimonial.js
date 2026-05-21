/* eslint-disable */
/* global WebImporter */

/**
 * Parser: tabs-testimonial
 * Base block: tabs
 * Source: https://wknd-trendsetters.site
 * Selector: .tabs-wrapper
 * Generated: 2026-05-21
 *
 * Transforms tabbed testimonial content into a Tabs block table.
 * Each tab row: col1 = tab label (person name), col2 = tab content (image, name, role, quote).
 */
export default function parse(element, { document }) {
  // Extract tab panes (content panels)
  const tabPanes = element.querySelectorAll('.tab-pane');
  // Extract tab menu buttons (labels)
  const tabButtons = element.querySelectorAll('.tab-menu-link, .tab-menu button');

  const cells = [];

  tabPanes.forEach((pane, index) => {
    // --- Tab Label (column 1) ---
    // Get the label from the corresponding tab button's strong/name text
    let labelText = '';
    const correspondingButton = tabButtons[index];
    if (correspondingButton) {
      const nameEl = correspondingButton.querySelector('strong');
      labelText = nameEl ? nameEl.textContent.trim() : correspondingButton.textContent.trim();
    } else {
      // Fallback: use the name from the pane content itself
      const paneName = pane.querySelector('.paragraph-xl strong, strong');
      labelText = paneName ? paneName.textContent.trim() : `Tab ${index + 1}`;
    }

    const labelCell = document.createElement('div');
    labelCell.textContent = labelText;

    // --- Tab Content (column 2) ---
    const contentCell = document.createElement('div');

    // Extract the image
    const img = pane.querySelector('img.cover-image, img');
    if (img) {
      const imgClone = img.cloneNode(true);
      contentCell.appendChild(imgClone);
    }

    // Extract the person's name (strong text in paragraph-xl)
    const nameEl = pane.querySelector('.paragraph-xl strong, .paragraph-xl:first-of-type strong');
    if (nameEl) {
      const nameP = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = nameEl.textContent.trim();
      nameP.appendChild(strong);
      contentCell.appendChild(nameP);
    }

    // Extract the role/subtitle (div after the name div, within the same container)
    const nameContainer = pane.querySelector('.paragraph-xl.utility-margin-bottom-0');
    if (nameContainer) {
      const roleEl = nameContainer.parentElement
        ? nameContainer.parentElement.querySelector(':scope > div:not(.paragraph-xl)')
        : null;
      if (roleEl && roleEl.textContent.trim()) {
        const roleP = document.createElement('p');
        roleP.textContent = roleEl.textContent.trim();
        contentCell.appendChild(roleP);
      }
    }

    // Extract the testimonial quote
    const quoteEl = pane.querySelector('p.paragraph-xl');
    if (quoteEl) {
      const quoteP = document.createElement('p');
      quoteP.textContent = quoteEl.textContent.trim();
      contentCell.appendChild(quoteP);
    }

    cells.push([labelCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-testimonial', cells });
  element.replaceWith(block);
}
