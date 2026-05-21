import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-article-card-image';
      else div.className = 'cards-article-card-body';
    });

    // Split meta paragraph "Category | Date" into badge + date
    const body = li.querySelector('.cards-article-card-body');
    if (body) {
      const paragraphs = [...body.querySelectorAll('p')];
      // The meta paragraph is typically the one containing "|"
      const metaP = paragraphs.find((p) => !p.querySelector('a') && !p.querySelector('strong') && p.textContent.includes('|'));
      if (metaP) {
        const [category, dateText] = metaP.textContent.split('|').map((s) => s.trim());
        const metaDiv = document.createElement('div');
        metaDiv.className = 'cards-article-card-meta';
        if (category) {
          const badge = document.createElement('span');
          badge.className = 'cards-article-card-tag';
          badge.textContent = category;
          metaDiv.append(badge);
        }
        if (dateText) {
          const date = document.createElement('span');
          date.className = 'cards-article-card-date';
          date.textContent = dateText;
          metaDiv.append(date);
        }
        metaP.replaceWith(metaDiv);
      }
    }

    // Make the entire card a clickable link if a link exists in the body
    const link = li.querySelector('.cards-article-card-body a');
    if (link) {
      const a = document.createElement('a');
      a.href = link.href;
      a.className = 'cards-article-card-link';
      a.setAttribute('aria-label', li.querySelector('strong')?.textContent || link.textContent);
      // Remove the link paragraph before wrapping
      const linkP = link.closest('p');
      if (linkP) linkP.remove();
      while (li.firstChild) a.append(li.firstChild);
      li.append(a);
    }

    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);
}
