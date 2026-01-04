/**
 * Prompt template for profile optimization
 * @param {string} profileData - Current profile text/bio
 * @param {string} targetRole - Target role/industry
 * @param {string} keySkills - Key skills to highlight
 * @param {string} additionalRequest - Additional user request for refinement
 * @param {string} previousResult - Previous optimization result (for refinement)
 */
export const optimizeProfilePrompt = (
  profileData,
  targetRole,
  keySkills,
  additionalRequest = "",
  previousResult = ""
) => {
  const basePrompt = `You are an expert profile optimizer and career coach. Your task is to help optimize professional profiles to be more compelling, clear, and effective.

Your goals:
1. Make the profile more engaging and professional
2. Highlight key achievements and skills
3. Use action-oriented language
4. Ensure the profile is tailored for the target role/industry
5. Maintain authenticity while enhancing presentation

Guidelines:
- Be concise but impactful
- Use industry-appropriate terminology
- Focus on measurable achievements where possible
- Ensure proper grammar and punctuation
- Make the profile memorable and distinctive

Target Role/Industry: ${targetRole || "General professional profile"}

Key Skills to Highlight: ${keySkills || "Not specified"}
`;

  if (previousResult && additionalRequest) {
    return `${basePrompt}

Previous optimization result:
${previousResult}

User's refinement request:
${additionalRequest}

Please update the profile optimization based on the user's feedback. Provide the refined version.`;
  }

  if (additionalRequest) {
    return `${basePrompt}

Additional requirements from user:
${additionalRequest}

Please optimize the provided profile text according to the guidelines and additional requirements.`;
  }

  return `${basePrompt}

Please optimize the provided profile text according to the guidelines above. Provide a polished, professional version that maintains the person's authentic voice while enhancing its impact.`;
};

