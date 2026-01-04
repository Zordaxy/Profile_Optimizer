import React, { useState } from "react";
import {
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import styled from "styled-components";
import { useDialog } from "../content-script/dialogContext.jsx";
import { saveInitialData } from "../utils/saveData.js";
import InitialQuestions from "../data/InitialQuestions.js";

const CustomTextField = styled(TextField)`
  & input {
    box-shadow: none !important;
    outline-width: 0 !important;
  }
  & textarea {
    box-shadow: none !important;
    outline-width: 0 !important;
  }
`;

export default function InitialSetup() {
  const { closeDialog } = useDialog();
  const [formData, setFormData] = useState(() => {
    // Load existing values from localStorage
    const data = {};
    InitialQuestions.questions.forEach((q) => {
      data[q.id] = localStorage.getItem(q.id) || "";
    });
    return data;
  });

  const handleChange = (id) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [id]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveInitialData(formData);

    if (window.onDialogSubmit) {
      window.onDialogSubmit(formData);
      window.onDialogSubmit = null;
    }

    closeDialog();
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Set up your profile optimizer. Enter your OpenAI API key and the profile
          information you want to optimize.
        </DialogContentText>

        {InitialQuestions.questions.map((question) => (
          <CustomTextField
            key={question.id}
            required={question.required}
            id={question.id}
            name={question.id}
            label={question.text}
            variant="standard"
            fullWidth
            multiline={question.multiline}
            rows={question.multiline ? 4 : 1}
            value={formData[question.id]}
            onChange={handleChange(question.id)}
            type={question.type || "text"}
            sx={{ mb: 2 }}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button type="submit" variant="contained">
          Save & Continue
        </Button>
      </DialogActions>
    </form>
  );
}

