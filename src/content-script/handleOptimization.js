import { apiRequest } from "../utils/apiRequest.js";
import { optimizeProfilePrompt } from "../prompts/optimizeProfilePrompt.js";
import showModal from "../utils/showModal.js";
import { DIALOG_TYPE } from "./dialogContext.jsx";

/**
 * Main optimization function
 * Sends profile data to OpenAI and shows result in modal
 */
export async function optimizeProfile(additionalRequest = "") {
  try {
    const targetRole = localStorage.getItem("targetRole") || "";
    const keySkills = localStorage.getItem("keySkills") || "";
    const userProfile = localStorage.getItem("userProfile") || "";

    const prompt = optimizeProfilePrompt(
      userProfile,
      targetRole,
      keySkills,
      additionalRequest,
      userProfile
    );

    // Show loading state
    window.updateResultData?.({ loading: true, content: "" });

    const response = await apiRequest(prompt);

    // Show result in modal
    const title = "Profile Optimization Result";
    showModal(title, null, null, DIALOG_TYPE.RESULT, {
      loading: false,
      content: response,
      originalRequest: { userProfile, targetRole, keySkills },
    });

    return response;
  } catch (error) {
    console.error("Optimization error:", error);

    // Show error in modal
    showModal("Error", null, null, DIALOG_TYPE.RESULT, {
      loading: false,
      content: `Error: ${error.message}`,
      isError: true,
    });

    throw error;
  }
}

/**
 * Refine the recommendation with additional request
 */
export async function refineRecommendation(additionalRequest, previousResult) {
  try {
    const { originalRequest } = previousResult;
    const { userProfile, targetRole, keySkills } = originalRequest;

    // Update loading state
    window.updateResultData?.({
      ...previousResult,
      loading: true,
    });

    const prompt = optimizeProfilePrompt(
      userProfile,
      targetRole,
      keySkills,
      additionalRequest,
      previousResult.content
    );

    const response = await apiRequest(prompt);

    // Update result
    window.updateResultData?.({
      loading: false,
      content: response,
      originalRequest,
    });

    return response;
  } catch (error) {
    console.error("Refinement error:", error);
    window.updateResultData?.({
      ...previousResult,
      loading: false,
      content: `Error: ${error.message}`,
      isError: true,
    });
    throw error;
  }
}
