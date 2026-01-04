import React, { createContext, useState, useContext, useEffect } from "react";

const DialogContext = createContext();

export const DIALOG_TYPE = {
  SETUP: "SETUP",
  RESULT: "RESULT",
};

export const DialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogContent, setDialogContent] = useState("");
  const [dialogType, setDialogType] = useState(DIALOG_TYPE.SETUP);
  const [resultData, setResultData] = useState(null);

  const openDialog = (type = DIALOG_TYPE.SETUP, title, content, data = null) => {
    if (window.isDialogOpened) {
      console.error("Attempting to open modal dialog, but it is already opened");
      return;
    }
    setDialogTitle(title);
    setDialogContent(content);
    setDialogType(type);
    setResultData(data);
    setOpen(true);
    window.isDialogOpened = true;
  };

  const closeDialog = () => {
    setOpen(false);
    setDialogTitle("");
    setDialogContent("");
    setResultData(null);
    window.isDialogOpened = false;
  };

  const updateResultData = (data) => {
    setResultData(data);
  };

  useEffect(() => {
    window.openDialog = openDialog;
    window.closeDialog = closeDialog;
    window.updateResultData = updateResultData;
  }, []);

  return (
    <DialogContext.Provider
      value={{
        open,
        dialogTitle,
        dialogContent,
        dialogType,
        resultData,
        openDialog,
        closeDialog,
        updateResultData,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => useContext(DialogContext);

