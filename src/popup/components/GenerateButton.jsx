import React from "react";
import Button from "@mui/material/Button";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

export default function GenerateButton({ onClick }) {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<AutoAwesomeIcon />}
      onClick={onClick}
      sx={{
        textTransform: "none",
        fontWeight: 500,
      }}
    >
      Generate Recommendation
    </Button>
  );
}

