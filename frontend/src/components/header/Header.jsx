import React from 'react';
import { AppBar, Toolbar, IconButton, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../../../public/smit.png';

function Header() {
  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        background: "#fbfbfb",
        height: '70px',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          paddingLeft: '0px !important',
          paddingRight: '0px !important',
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: '48px',
            height: '48px',
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', // Aligns items to the start and end
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="logo"
            sx={{ padding: 0 }}
          >
            <img src={Logo} alt="Logo" style={{ maxHeight: '100px' }} />
          </IconButton>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: 'block', md: 'none' }, padding: 0 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
