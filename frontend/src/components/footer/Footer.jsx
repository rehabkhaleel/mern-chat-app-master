import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        backgroundColor: "#fbfbfb",
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        py: 2, // Padding on the y-axis
        textAlign: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="textPrimary">
          © 2024 SMIT. All Rights Reserved. Powered By: Code Companions
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
