import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

const dummyUsers = [
  { username: 'admin', password: 'Admin123' },
  { username: 'user', password: 'User123' },
];
interface LoginProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const Login : React.FC<LoginProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');

    if (!username || !password) {
      setError('Please enter both username and password.');
    } else {
      const user = dummyUsers.find(
        (user) => user.username === username && user.password === password
      );

      if (user) {
        setIsLoggedIn(true);
        navigate("/preliminfo");
      } else {
        setError('Wrong username or password. Please try again.');
      }
    }
  };

  const handleKeyPress = (e: { key: string; }) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        background: 'linear-gradient(60deg, #AC7D55, #525055,#877172,#C2B4AD, #8C5322 )',
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%', paddingRight: 2 }}>
          <Box sx={{ padding: '20px', display: 'flex', alignItems: 'center' }}>
            <RocketLaunchIcon sx={{ fontSize: '5rem', color: '#ffae42' }} />
            <Box sx={{ ml: 2 }}>
              <Typography variant="h4" color="#FFFFFF" gutterBottom>
                Faster
              </Typography>
              <Typography variant="subtitle1" color="#FFFFFF">
                Property files & implementation <br />
                notes are created under 1 minute
              </Typography>
            </Box>
          </Box>
          <Box sx={{ height: '30px' }} /> 
          <Box sx={{ padding: '20px', display: 'flex', alignItems: 'center' }}>
            <PublishedWithChangesIcon sx={{ fontSize: '5rem', color: '#ffae42' }} />
            <Box sx={{ ml: 2 }}>
              <Typography variant="h4" color="#FFFFFF" gutterBottom>
                Simpler
              </Typography>
              <Typography variant="subtitle1" color="#FFFFFF">
                No more syntax errors in Property <br /> files
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{borderLeft: '1px solid white', padding: '2px', height:'80vh' }}/>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%', paddingLeft: 2 }}>
          <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" sx={{ textAlign: 'center' }} gutterBottom>
              Login
            </Typography>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ background: '#585858' }} 
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{ background: '#585858' }}
            />
            {error && <Typography variant="body2" color="error">{error}</Typography>}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2px' }}>
              <Button type='submit' variant="contained" color="primary" onClick={handleLogin} sx={{ width: '100%' }}>
                Let me in
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
