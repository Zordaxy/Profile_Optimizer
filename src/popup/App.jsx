import { useState, useEffect } from "react";
import { sendMessageToContentScript } from "../utils/chromeHelper";
import { apiRequest } from "../utils/apiRequest";
import { Divider, CircularProgress, Alert, Snackbar } from "@mui/material";
import styled from "styled-components";
import Header from "./components/Header";
import GenerateButton from "./components/GenerateButton";
import ParseButton from "./components/ParseButton";
import {
  parseProfilePrompt,
  parseRolePrompt,
  parseSkillsPrompt,
} from "../prompts/parsePrompts";

const STORAGE_KEYS = {
  profile: "userProfile",
  role: "targetRole",
  skills: "keySkills",
};

const PROMPTS = {
  profile: parseProfilePrompt,
  role: parseRolePrompt,
  skills: parseSkillsPrompt,
};

/**
 * Popup component
 * Shows parse buttons and triggers the optimization flow.
 */
function App() {
  const [loading, setLoading] = useState(false);
  const [parseLoading, setParseLoading] = useState({
    profile: false,
    role: false,
    skills: false,
  });
  const [parsedStatus, setParsedStatus] = useState({
    profile: false,
    role: false,
    skills: false,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Check localStorage on mount to see what's already parsed
  useEffect(() => {
    checkParsedStatus();
  }, []);

  async function checkParsedStatus() {
    try {
      const results = await Promise.all(
        Object.entries(STORAGE_KEYS).map(async ([type, key]) => {
          const response = await sendMessageToContentScript(
            "READ_STORAGE",
            key
          );
          return [type, !!response?.value];
        })
      );
      setParsedStatus(Object.fromEntries(results));
    } catch (error) {
      console.error("Error checking parsed status:", error);
    }
  }

  async function handleParse(type) {
    setParseLoading((prev) => ({ ...prev, [type]: true }));

    try {
      // Read the document HTML from the content script
      const htmlElement = await sendMessageToContentScript("READ_DOCUMENT");

      if (!htmlElement) {
        throw new Error("Could not read page content");
      }
      const html = htmlElement.html;

      // Get API key from storage
      const keyResponse = await sendMessageToContentScript(
        "READ_STORAGE",
        "openAiKey"
      );
      const apiKey = keyResponse?.value;

      if (!apiKey) {
        throw new Error(
          "OpenAI API key not set. Please run the optimization first to set up your API key."
        );
      }

      // Send API request
      const prompt = PROMPTS[type];
      const completePrompt = `${prompt}\n\nBelow is the LinkedIn page HTML:\n\n${html}`;
      console.log("Complete prompt:", completePrompt);

      const parsedContent = await apiRequest(completePrompt, {
        apiKey,
        temperature: 0.3,
      });

      console.log("Parsed response:", JSON.parse(parsedContent));

      // Store the parsed result in localStorage via content script
      await sendMessageToContentScript("UPDATE_STORAGE", {
        [STORAGE_KEYS[type]]: parsedContent,
      });

      // Update status
      setParsedStatus((prev) => ({ ...prev, [type]: true }));
      setSnackbar({
        open: true,
        message: `${type.charAt(0).toUpperCase() +
          type.slice(1)} parsed successfully!`,
        severity: "success",
      });
    } catch (error) {
      console.error(`Error parsing ${type}:`, error);
      setSnackbar({
        open: true,
        message: error.message || `Failed to parse ${type}`,
        severity: "error",
      });
    } finally {
      setParseLoading((prev) => ({ ...prev, [type]: false }));
    }
  }

  async function handleGenerate() {
    setLoading(true);

    try {
      await sendMessageToContentScript("START_OPTIMIZATION");
    } catch (error) {
      console.error("Error starting optimization:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const Popup = styled.div`
    width: 220px;
    padding: 16px;
    min-height: 120px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    border-radius: 5px;
    font-family: "Roboto", sans-serif;
  `;

  const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 0;
  `;

  const ParseSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `;

  const SectionLabel = styled.span`
    font-size: 0.75rem;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  `;

  return (
    <Popup>
      <Header />
      <Divider />

      <ParseSection>
        <SectionLabel>Parse LinkedIn Data</SectionLabel>
        {["profile", "role", "skills"].map((type) => (
          <ParseButton
            key={type}
            type={type}
            isParsed={parsedStatus[type]}
            loading={parseLoading[type]}
            onClick={() => handleParse(type)}
          />
        ))}
      </ParseSection>

      <Divider />

      <ButtonWrapper>
        {loading ? (
          <CircularProgress size={32} />
        ) : (
          <GenerateButton onClick={handleGenerate} />
        )}
      </ButtonWrapper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Popup>
  );
}

export default App;
