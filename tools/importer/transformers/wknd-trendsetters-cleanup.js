/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: wknd-trendsetters cleanup.
 * Removes non-authorable site chrome (navbar, footer, skip link).
 * Selectors validated against migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove skip-link that could interfere with parsing
    // Found in DOM: <a href="#main-content" class="skip-link">
    WebImporter.DOMUtils.remove(element, ['.skip-link']);
  }
  if (hookName === TransformHook.afterTransform) {
    // Remove non-authorable site chrome
    // Found in DOM: <div class="navbar"> (site navigation)
    // Found in DOM: <footer class="footer inverse-footer"> (site footer)
    WebImporter.DOMUtils.remove(element, ['.navbar', 'footer.footer']);
  }
}
