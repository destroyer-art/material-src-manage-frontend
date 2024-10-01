import React from "react";
import { HeaderBarView } from "../components/Views";
import { Box, Container, CssBaseline } from "@mui/material";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
      <HeaderBarView />
      <Container
        maxWidth="xl"
        sx={{
          width: "100%",
          height: "calc(100vh - 112px)",
          paddingY: 2,
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export const withMainLayout = (Page: React.FC) => () => {
  return (
    <>
      <CssBaseline />
      <MainLayout>
        <Page />
      </MainLayout>
    </>
  );
};
