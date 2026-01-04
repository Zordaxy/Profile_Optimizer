import React from "react";
import { createRoot } from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CustomDialog from "../dialogs/CustomDialog.jsx";
import { DialogProvider } from "./dialogContext.jsx";

const theme = createTheme({
  components: {
    MuiDialog: {
      styleOverrides: {
        root: {
          "& .MuiDialog-paper": {
            fontSize: "16px",
          },
          "& .MuiDialogTitle-root": {
            fontSize: "22px",
          },
          "& .MuiDialogContentText-root": {
            fontSize: "17px",
          },
          "& .MuiTextField-root": {
            fontSize: "17px",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "16px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "16px",
        },
      },
    },
  },
  typography: {
    fontSize: 16,
    h2: {
      fontSize: 22,
    },
    p: {
      fontSize: 16,
    },
  },
});

const injectRoot = () => {
  // Check if already injected
  const existing = document.getElementById("profile-optimizer-root");
  if (existing) {
    return existing;
  }

  const root = document.createElement("div");
  root.id = "profile-optimizer-root";
  root.style.cssText = `
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 16px;
    line-height: 1.5;
  `;
  document.body.appendChild(root);
  return root;
};

let initialized = false;

const initContent = () => {
  if (initialized) return;

  const root = injectRoot();
  const reactRoot = createRoot(root);
  reactRoot.render(
    <React.StrictMode>
      <DialogProvider>
        <ThemeProvider theme={theme}>
          <CustomDialog />
        </ThemeProvider>
      </DialogProvider>
    </React.StrictMode>
  );

  initialized = true;
};

export default initContent;

