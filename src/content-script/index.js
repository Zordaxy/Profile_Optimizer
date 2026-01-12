import initContent from "./initContent.jsx";
import { gatherInitialInfo } from "./gatherInitialInfo.jsx";
import { optimizeProfile } from "./handleOptimization.js";
// import { readProfile } from "./readProfile.js";

/**
 * Listens for messages from the popup
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "START_OPTIMIZATION") {
    (async () => {
      // Initialize React dialog system
      initContent();

      await gatherInitialInfo();

      await optimizeProfile();
    })();
  }

  if (request.type === "READ_STORAGE") {
    const value = localStorage.getItem(request.data);
    sendResponse({ value });
  }

  if (request.type === "UPDATE_STORAGE") {
    Object.entries(request.data).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
    sendResponse({ success: true });
  }

  if (request.type === "READ_DOCUMENT") {
    const html = slimDomForAI();
    sendResponse({ html });
  }

  return true;
});

function slimDomForAI() {
  const main = document.body;
  const clone = main.cloneNode(true);

  clone
    .querySelectorAll("script,style,link,svg,noscript,iframe,canvas")
    .forEach((n) => n.remove());

  clone.querySelectorAll("*").forEach((el) => {
    el.removeAttribute("class");
    el.removeAttribute("style");
    el.removeAttribute("componentkey");
    el.removeAttribute("data-view-name");
    el.removeAttribute("data-view-tracking-scope");
  });

  let html = clone.innerHTML
    .replace(/<!--[\s\S]*?-->/g, "") // comments
    .replace(/\s+/g, " ") // whitespace
    .trim();

  return `<article>${html}</article>`;
}

// Initialize React on page load
initContent();
