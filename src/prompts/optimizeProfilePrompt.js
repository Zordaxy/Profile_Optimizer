import { generateBasePrompt } from "./basePrompt.js";
import { generateExtendedPrompt } from "./extendedPrompt.js";

/**
 * Prompt template for profile optimization
 * @param {string} userProfile - User profile
 * @param {string} targetRole - Target role/industry
 * @param {string} keySkills - Key skills to highlight
 * @param {string} additionalRequest - Additional user request for refinement
 * @param {string} previousResult - Previous optimization result (for refinement)
 */
export const optimizeProfilePrompt = (
  userProfile,
  targetRole,
  keySkills,
  additionalRequest = "",
  previousResult = ""
) => {
  const basePrompt = generateBasePrompt(userProfile, targetRole, keySkills);

  if (!additionalRequest) {
    return basePrompt;
  }

  return generateExtendedPrompt(basePrompt, additionalRequest, previousResult);
};
