import initContent from "./initContent.jsx";
import { gatherInitialInfo } from "./gatherInitialInfo.jsx";
import { optimizeProfile } from "./handleOptimization.js";
import { readProfile } from "./readProfile.js";

/**
 * Listens for messages from the popup
 */
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.type === "START_OPTIMIZATION") {
    // Initialize React dialog system
    initContent();

    // Gather initial info (API key, profile data)
    await gatherInitialInfo();

    const selector = document.querySelector(
      '[data-view-name="identity-self-profile"]'
    );
    if (selector) {
      window.location.href = selector.href;
      return;
    }

    // Read and store profile data
    readProfile();

    // Start optimization
    await optimizeProfile();
  }

  if (request.type === "READ_STORAGE") {
    const value = localStorage.getItem(request.data);
    sendResponse({ value });
  }

  if (request.type === "UPDATE_STORAGE") {
    Object.entries(request.data).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
  }

  return true;
});

// Initialize React on page load
initContent();
