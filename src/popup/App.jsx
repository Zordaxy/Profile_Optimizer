import React, { useState } from "react";
import { sendMessageToContentScript } from "../utils/chromeHelper";
import { Divider, CircularProgress } from "@mui/material";
import styled from "styled-components";
import Header from "./components/Header";
import GenerateButton from "./components/GenerateButton";

/**
 * Popup component
 * Shows "Generate Recommendation" button and triggers the optimization flow.
 * All the main logic happens in content script.
 */
function App() {
  const [loading, setLoading] = useState(false);

  /**
   * Triggers the optimization flow
   */
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

  return (
    <Popup>
      <Header />
      <Divider />
      <ButtonWrapper>
        {loading ? (
          <CircularProgress size={32} />
        ) : (
          <GenerateButton onClick={handleGenerate} />
        )}
      </ButtonWrapper>
    </Popup>
  );
}

export default App;
