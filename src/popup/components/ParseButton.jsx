import React from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import PsychologyIcon from "@mui/icons-material/Psychology";

const iconMap = {
  profile: PersonIcon,
  role: WorkIcon,
  skills: PsychologyIcon,
};

export default function ParseButton({ type, isParsed, loading, onClick }) {
  const Icon = iconMap[type];
  const label = isParsed ? `Re-parse ${type}` : `Parse ${type}`;

  return (
    <Button
      variant={isParsed ? "outlined" : "contained"}
      color={isParsed ? "secondary" : "primary"}
      startIcon={loading ? null : <Icon />}
      onClick={onClick}
      disabled={loading}
      fullWidth
      sx={{
        textTransform: "capitalize",
        fontWeight: 500,
        opacity: isParsed ? 0.75 : 1,
        py: 1,
        fontSize: "0.85rem",
      }}
    >
      {loading ? <CircularProgress size={20} color="inherit" /> : label}
    </Button>
  );
}
