export const parseProfilePrompt = `You are a LinkedIn profile parser. Given the HTML content of a LinkedIn profile page, extract the profile information and return it as a valid JSON object.

Extract the following fields where available:
- name: Full name
- headline: Professional headline
- location: Location
- about: About/summary section
- experience: Array of work experiences with company, title, duration, description
- education: Array of education entries with school, degree, field, dates
- certifications: Array of certifications
- languages: Array of languages

Return ONLY valid JSON, no explanations or markdown.`;

export const parseRolePrompt = `You are a LinkedIn job role parser. Given the HTML content of a LinkedIn page (profile or job listing), extract the current/target role information and return it as a valid JSON object.

Extract the following fields where available:
- currentRole: Current job title
- company: Current company name
- industry: Industry/field
- seniority: Seniority level (entry, mid, senior, executive)
- responsibilities: Array of key responsibilities
- achievements: Array of notable achievements

Return ONLY valid JSON, no explanations or markdown.`;

export const parseSkillsPrompt = `You are a LinkedIn skills parser. Given the HTML content of a LinkedIn profile page, extract the skills information and return it as a valid JSON object.

Extract the following fields where available:
- topSkills: Array of featured/endorsed skills
- allSkills: Array of all listed skills
- endorsements: Object mapping skill names to endorsement counts
- skillCategories: Object grouping skills by category (technical, soft skills, tools, etc.)

Return ONLY valid JSON, no explanations or markdown.`;
