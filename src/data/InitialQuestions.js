export default {
  questions: [
    {
      id: "openAiKey",
      text: "OpenAI API Key",
      required: true,
      type: "password",
      multiline: false,
    },
    {
      id: "targetRole",
      text: "Target Role / Industry",
      required: false,
      multiline: false,
    },
    {
      id: "keySkills",
      text: "Key Skills to Highlight",
      required: false,
      multiline: true,
    },
  ],
};
