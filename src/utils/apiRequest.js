export async function apiRequest(prompt, options = {}) {
  const apiKey = options.apiKey || localStorage.getItem("openAiKey");
  const temperature = options.temperature ?? 0.7;

  if (!apiKey) {
    throw new Error("OpenAI API key not available");
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1",
        temperature,
        input: prompt,
      }),
    });

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }

    return data.output?.[0]?.content?.[0]?.text?.trim();
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw error;
  }
}
