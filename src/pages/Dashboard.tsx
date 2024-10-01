import React from "react";
import { withMainLayout } from "../layouts";
import { InventoryTable, UploadPrefer } from "../components/Common";
import { Container } from "@mui/material";

export const Dashboard: React.FC = withMainLayout(() => {
  return (
    <Container maxWidth="xl">
      <UploadPrefer />
      <InventoryTable />
    </Container>
  );
});
