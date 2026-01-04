import showModal from "../utils/showModal.js";
import { DIALOG_TYPE } from "./dialogContext.jsx";

export function gatherInitialInfo() {
  const promise = new Promise((resolve) => {
    const title = "Welcome to Profile Optimizer";
    showModal(title, null, resolve, DIALOG_TYPE.SETUP);
  });

  return promise;
}

