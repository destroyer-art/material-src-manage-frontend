import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export const HeaderBarView: React.FC = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        zIndex: 20,
        minHeight: "4rem",
        background: "linear-gradient(90deg, #4c4e63, #090721)", // Refined gradient for luxury feel
        boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.4)", // Soft, elegant shadow
        borderBottom: "1px solid rgba(255, 255, 255, 0.2)", // Subtle bottom border
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingY: { xs: "0.5rem", md: "1rem" }, // Responsive padding
            paddingX: { xs: 2, md: 4 }, // Increased padding for larger screens
          }}
        >
          {/* Optional menu button for mobile view */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "block", md: "none" } }} // Only show on smaller screens
          >
            <MenuIcon />
          </IconButton>
          {/* Title with luxury style */}
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              paddingX: { xs: 1, md: 3 }, // Responsive padding
              fontFamily: "'Playfair Display', serif", // Use a luxury font
              fontWeight: 600,
              color: "#ffffff", // Pure white for text
              textAlign: { xs: "center", md: "left" }, // Center title on mobile
            }}
          >
            Inventory Management
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
