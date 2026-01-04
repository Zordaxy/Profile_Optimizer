import React, { useState } from "react";
import {
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
  IconButton,
  Snackbar,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import RefreshIcon from "@mui/icons-material/Refresh";
import styled from "styled-components";
import { useDialog } from "../content-script/dialogContext.jsx";
import { refineRecommendation } from "../content-script/handleOptimization.js";

const ResultBox = styled(Box)`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  white-space: pre-wrap;
  max-height: 400px;
  overflow-y: auto;
`;

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

export default function ResultDialog() {
  const { closeDialog, resultData } = useDialog();
  const [additionalRequest, setAdditionalRequest] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const isLoading = resultData?.loading;
  const content = resultData?.content || "";
  const isError = resultData?.isError;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleRefine = async () => {
    if (!additionalRequest.trim()) return;

    try {
      await refineRecommendation(additionalRequest, resultData);
      setAdditionalRequest("");
    } catch (error) {
      console.error("Refinement error:", error);
    }
  };

  return (
    <>
      <DialogContent>
        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight={200}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="subtitle2" color="textSecondary">
                Recommendation
              </Typography>
              <IconButton onClick={handleCopy} size="small" title="Copy to clipboard">
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Box>

            <ResultBox>
              <Typography
                variant="body1"
                component="pre"
                sx={{
                  fontFamily: "inherit",
                  margin: 0,
                  color: isError ? "error.main" : "text.primary",
                }}
              >
                {content}
              </Typography>
            </ResultBox>

            <CustomTextField
              fullWidth
              multiline
              rows={3}
              label="Additional request or refinement"
              placeholder="e.g., Make it more concise, add more technical details..."
              value={additionalRequest}
              onChange={(e) => setAdditionalRequest(e.target.value)}
              variant="outlined"
              sx={{ mb: 2 }}
            />
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={closeDialog}>Close</Button>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={handleRefine}
          disabled={isLoading || !additionalRequest.trim()}
        >
          Update Recommendation
        </Button>
      </DialogActions>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Copied to clipboard"
      />
    </>
  );
}

