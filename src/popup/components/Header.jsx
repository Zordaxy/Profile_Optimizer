import React from "react";
import styled from "styled-components";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  color: #1976d2;
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <AutoFixHighIcon color="primary" />
      <Title>Profile Optimizer</Title>
    </HeaderWrapper>
  );
}

