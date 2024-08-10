import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, CircularProgress, Alert,Avatar } from '@mui/material';
import useLogin from '../../hooks/useLogin';
import Logo from '../../../../frontend/public/smit.png'; // Ensure you have a logo or use a placeholder

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    setError(""); // Clear any previous errors
    try {
      await login(email, password);
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
          backgroundColor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
      <Avatar
          src={Logo}
          alt="Logo"
          sx={{ width: 120, height: 110, mb: 2 ,borderRadius:0 ,display:'flex'}}
        />
        <Typography variant="h4" gutterBottom align="center">
          Login <span style={{ color: '#3b71ca' }}>ChatApp</span>
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Link
            to="/signup"
            style={{ display: 'block', marginTop: 8, textAlign: 'center', color: '#3b71ca', textDecoration: 'none' }}
          >
            Don't have an account?
          </Link>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
