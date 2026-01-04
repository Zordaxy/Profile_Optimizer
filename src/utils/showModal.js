import { DIALOG_TYPE } from "../content-script/dialogContext.jsx";

/**
 * Show a modal dialog
 * @param {string} title - Dialog title
 * @param {string} contentText - Dialog content text
 * @param {Function} callback - Callback function when dialog is submitted
 * @param {string} type - Dialog type (SETUP, RESULT)
 * @param {Object} data - Additional data to pass to the dialog
 */
function showModal(title, contentText, callback, type = DIALOG_TYPE.SETUP, data = null) {
  window.openDialog?.(type, title, contentText, data);
  
  if (callback) {
    window.onDialogSubmit = callback;
  }
}

export default showModal;

