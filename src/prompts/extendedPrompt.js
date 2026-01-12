/**
 * Generates extended prompt with additional request and optional previous result
 * @param {string} basePrompt - The base prompt
 * @param {string} additionalRequest - Additional user request
 * @param {string} previousResult - Previous optimization result (optional)
 * @returns {string} The extended prompt string
 */
export const generateExtendedPrompt = (
  basePrompt,
  additionalRequest,
  previousResult = ""
) => {
  if (!previousResult) {
    return `${basePrompt}

Additional requirements from user:
${additionalRequest}

Please optimize the provided profile text according to the guidelines and additional requirements.`;
  }

  return `${basePrompt}

Previous optimization result:
${previousResult}

User's refinement request:
${additionalRequest}

Please update the profile optimization based on the user's feedback. Provide the refined version.`;
};
