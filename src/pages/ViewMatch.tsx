import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "../consts";
import { Preference } from "../types";
import { Container } from "@mui/material";
import { MatchPreferView } from "../components/Views";

export const ViewMatchPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.state) {
      navigate(PATH.DASHBOARD);
    }
  }, []);

  return (
    <Container maxWidth="xl">
      <MatchPreferView prefers={location.state} />
    </Container>
  );
};
