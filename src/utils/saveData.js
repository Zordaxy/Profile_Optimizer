import InitialQuestions from "../data/InitialQuestions.js";

/**
 * Save initial setup data to localStorage
 * @param {Object} formData - Form data object with question IDs as keys
 */
export function saveInitialData(formData) {
  InitialQuestions.questions.forEach((question) => {
    if (formData[question.id] !== undefined) {
      localStorage.setItem(question.id, formData[question.id]);
    }
  });
}

/**
 * Get all stored data
 * @returns {Object} - Object with all stored values
 */
export function getStoredData() {
  const data = {};
  InitialQuestions.questions.forEach((question) => {
    data[question.id] = localStorage.getItem(question.id) || "";
  });
  return data;
}

/**
 * Clear all stored data
 */
export function clearStoredData() {
  InitialQuestions.questions.forEach((question) => {
    localStorage.removeItem(question.id);
  });
}

