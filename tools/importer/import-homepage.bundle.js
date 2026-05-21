/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-split.js
  function parse(element, { document }) {
    const heading = element.querySelector("h1.h1-heading, h1, h2");
    const subheading = element.querySelector("p.subheading, p");
    const buttonGroup = element.querySelector(".button-group");
    const ctaLinks = buttonGroup ? Array.from(buttonGroup.querySelectorAll("a.button, a")) : Array.from(element.querySelectorAll("a.button, a.secondary-button"));
    const images = Array.from(element.querySelectorAll("img.cover-image, img"));
    const cells = [];
    if (images.length > 0) {
      cells.push([images]);
    }
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (subheading) contentCell.push(subheading);
    if (ctaLinks.length > 0) contentCell.push(...ctaLinks);
    cells.push([contentCell]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-split", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-article.js
  function parse2(element, { document }) {
    const coverImage = element.querySelector("img.cover-image, img.utility-aspect-3x2, .grid-layout > div:first-child img");
    const breadcrumbs = element.querySelector(".breadcrumbs");
    const heading = element.querySelector("h2.h2-heading, h2, h1");
    const authorContainer = element.querySelector(".flex-horizontal.flex-gap-xxs");
    const dateContainer = element.querySelector(".utility-margin-top-0-5rem, .flex-horizontal.flex-gap-xxs + .flex-horizontal");
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
    const cells = [];
    const imageCell = [];
    if (coverImage) {
      imageCell.push(coverImage);
    }
    cells.push([imageCell, contentCell]);
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-gallery.js
  function parse3(element, { document }) {
    const imageContainers = element.querySelectorAll(".utility-aspect-1x1");
    const cells = [];
    imageContainers.forEach((container) => {
      const img = container.querySelector("img.cover-image, img");
      if (img) {
        const imageCell = img;
        const textCell = [];
        if (img.alt) {
          const description = document.createElement("p");
          description.textContent = img.alt;
          textCell.push(description);
        }
        cells.push([imageCell, textCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-gallery", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-testimonial.js
  function parse4(element, { document }) {
    const tabPanes = element.querySelectorAll(".tab-pane");
    const tabButtons = element.querySelectorAll(".tab-menu-link, .tab-menu button");
    const cells = [];
    tabPanes.forEach((pane, index) => {
      let labelText = "";
      const correspondingButton = tabButtons[index];
      if (correspondingButton) {
        const nameEl2 = correspondingButton.querySelector("strong");
        labelText = nameEl2 ? nameEl2.textContent.trim() : correspondingButton.textContent.trim();
      } else {
        const paneName = pane.querySelector(".paragraph-xl strong, strong");
        labelText = paneName ? paneName.textContent.trim() : `Tab ${index + 1}`;
      }
      const labelCell = document.createElement("div");
      labelCell.textContent = labelText;
      const contentCell = document.createElement("div");
      const img = pane.querySelector("img.cover-image, img");
      if (img) {
        const imgClone = img.cloneNode(true);
        contentCell.appendChild(imgClone);
      }
      const nameEl = pane.querySelector(".paragraph-xl strong, .paragraph-xl:first-of-type strong");
      if (nameEl) {
        const nameP = document.createElement("p");
        const strong = document.createElement("strong");
        strong.textContent = nameEl.textContent.trim();
        nameP.appendChild(strong);
        contentCell.appendChild(nameP);
      }
      const nameContainer = pane.querySelector(".paragraph-xl.utility-margin-bottom-0");
      if (nameContainer) {
        const roleEl = nameContainer.parentElement ? nameContainer.parentElement.querySelector(":scope > div:not(.paragraph-xl)") : null;
        if (roleEl && roleEl.textContent.trim()) {
          const roleP = document.createElement("p");
          roleP.textContent = roleEl.textContent.trim();
          contentCell.appendChild(roleP);
        }
      }
      const quoteEl = pane.querySelector("p.paragraph-xl");
      if (quoteEl) {
        const quoteP = document.createElement("p");
        quoteP.textContent = quoteEl.textContent.trim();
        contentCell.appendChild(quoteP);
      }
      cells.push([labelCell, contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs-testimonial", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-article.js
  function parse5(element, { document }) {
    const articleCards = element.querySelectorAll("a.article-card, .article-card");
    const cells = [];
    articleCards.forEach((card) => {
      const image = card.querySelector(".article-card-image img, img.cover-image, img");
      const contentCell = [];
      const heading = card.querySelector('h3, h2, h4, .h4-heading, [class*="heading"]');
      if (heading) {
        const h = document.createElement("p");
        const strong = document.createElement("strong");
        strong.textContent = heading.textContent.trim();
        h.appendChild(strong);
        contentCell.push(h);
      }
      const tag = card.querySelector(".tag, .article-card-meta span:first-child");
      const date = card.querySelector(".paragraph-sm, .utility-text-secondary, .article-card-meta span:last-child");
      if (tag || date) {
        const metaText = [];
        if (tag) metaText.push(tag.textContent.trim());
        if (date) metaText.push(date.textContent.trim());
        const metaParagraph = document.createElement("p");
        metaParagraph.textContent = metaText.join(" | ");
        contentCell.push(metaParagraph);
      }
      const linkHref = card.tagName === "A" ? card.getAttribute("href") : null;
      if (linkHref) {
        const ctaLink = document.createElement("a");
        ctaLink.setAttribute("href", linkHref);
        ctaLink.textContent = "Read more";
        const ctaParagraph = document.createElement("p");
        ctaParagraph.appendChild(ctaLink);
        contentCell.push(ctaParagraph);
      }
      if (image || contentCell.length > 0) {
        const imageCell = image ? [image] : [""];
        cells.push([imageCell, contentCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-faq.js
  function parse6(element, { document }) {
    const faqItems = element.querySelectorAll("details.faq-item, details");
    const cells = [];
    faqItems.forEach((item) => {
      const summary = item.querySelector("summary.faq-question, summary");
      const questionSpan = summary ? summary.querySelector("span") : null;
      const answerDiv = item.querySelector("div.faq-answer, .faq-answer");
      const titleCell = [];
      if (questionSpan) {
        titleCell.push(questionSpan);
      } else if (summary) {
        titleCell.push(summary);
      }
      const contentCell = [];
      if (answerDiv) {
        const answerContent = answerDiv.querySelectorAll("p, ul, ol, div, h1, h2, h3, h4, h5, h6, a, img");
        if (answerContent.length > 0) {
          answerContent.forEach((el) => contentCell.push(el));
        } else {
          contentCell.push(answerDiv);
        }
      }
      if (titleCell.length > 0 && contentCell.length > 0) {
        cells.push([titleCell, contentCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "accordion-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-banner.js
  function parse7(element, { document }) {
    const bgImage = element.querySelector('img.cover-image, img[class*="cover"], img[class*="background"], img[class*="overlay"]');
    const heading = element.querySelector('h2.h1-heading, h1, h2[class*="heading"], h2');
    const description = element.querySelector('p.subheading, p[class*="subheading"], .card-body > p, .utility-text-on-overlay > p');
    const ctaLinks = Array.from(element.querySelectorAll(".button-group a.button, .button-group a, a.button.inverse-button, a.inverse-button"));
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
    const contentContainer = document.createElement("div");
    if (heading) contentContainer.appendChild(heading);
    if (description) contentContainer.appendChild(description);
    if (ctaLinks.length > 0) {
      ctaLinks.forEach((link) => contentContainer.appendChild(link));
    }
    cells.push([contentContainer]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/wknd-trendsetters-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [".skip-link"]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [".navbar", "footer.footer"]);
    }
  }

  // tools/importer/transformers/wknd-trendsetters-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { document } = payload;
      const sections = payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const reversedSections = [...sections].reverse();
      reversedSections.forEach((section) => {
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) return;
        if (section.style) {
          const sectionMetadataBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.append(sectionMetadataBlock);
        }
        const isFirst = sections.indexOf(section) === 0;
        if (!isFirst) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      });
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-split": parse,
    "columns-article": parse2,
    "cards-gallery": parse3,
    "tabs-testimonial": parse4,
    "cards-article": parse5,
    "accordion-faq": parse6,
    "hero-banner": parse7
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Homepage template with hero, featured content, and promotional sections",
    urls: ["https://wknd-trendsetters.site"],
    blocks: [
      {
        name: "hero-split",
        instances: ["header.secondary-section"]
      },
      {
        name: "columns-article",
        instances: ["section:has(.breadcrumbs)"]
      },
      {
        name: "cards-gallery",
        instances: [".grid-layout.grid-gap-sm:has(.utility-aspect-1x1)"]
      },
      {
        name: "tabs-testimonial",
        instances: [".tabs-wrapper"]
      },
      {
        name: "cards-article",
        instances: [".grid-layout.grid-gap-md:has(.article-card)"]
      },
      {
        name: "accordion-faq",
        instances: [".faq-list"]
      },
      {
        name: "hero-banner",
        instances: ["section.inverse-section"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: "header.section.secondary-section",
        style: null,
        blocks: ["hero-split"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Featured Article",
        selector: "section:has(.breadcrumbs)",
        style: null,
        blocks: ["columns-article"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Photo Gallery",
        selector: "section.secondary-section:has(.utility-aspect-1x1)",
        style: "grey",
        blocks: ["cards-gallery"],
        defaultContent: ["section.secondary-section:has(.utility-aspect-1x1) .utility-text-align-center .h2-heading", "section.secondary-section:has(.utility-aspect-1x1) .utility-text-align-center .paragraph-lg"]
      },
      {
        id: "section-4",
        name: "Testimonials",
        selector: "section:has(.tabs-wrapper)",
        style: null,
        blocks: ["tabs-testimonial"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Latest Articles",
        selector: "section.secondary-section:has(.article-card)",
        style: "grey",
        blocks: ["cards-article"],
        defaultContent: ["section.secondary-section:has(.article-card) .utility-text-align-center .h2-heading", "section.secondary-section:has(.article-card) .utility-text-align-center .paragraph-lg"]
      },
      {
        id: "section-6",
        name: "FAQ",
        selector: "section:has(.faq-list)",
        style: null,
        blocks: ["accordion-faq"],
        defaultContent: ["section:has(.faq-list) .h2-heading", "section:has(.faq-list) .subheading"]
      },
      {
        id: "section-7",
        name: "CTA Banner",
        selector: "section.inverse-section",
        style: null,
        blocks: ["hero-banner"],
        defaultContent: []
      }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
