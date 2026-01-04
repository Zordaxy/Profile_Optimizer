import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { DIALOG_TYPE, useDialog } from "../content-script/dialogContext.jsx";
import InitialSetup from "./InitialSetup.jsx";
import ResultDialog from "./ResultDialog.jsx";

export default function CustomDialog() {
  const { open, dialogTitle, closeDialog, dialogType } = useDialog();

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      {dialogType === DIALOG_TYPE.SETUP && <InitialSetup />}
      {dialogType === DIALOG_TYPE.RESULT && <ResultDialog />}
    </Dialog>
  );
}

