import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        backgroundColor: "lightgray", 
        padding: "20px", 
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "15px", 
      }}
    >
      <Box>All right reserved &copy; Aakash Sharma</Box>
      <Box>
        <Button sx={{ color: "red" }}>
          About
        </Button>
        |
        <Button sx={{ color: "red" }}>
          Contact
        </Button>
        |
        <Button sx={{ color: "red" }}>
          Privacy Policy
        </Button>
      </Box>
    </Box>
  );
};

export default Footer;
