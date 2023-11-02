import React from 'react'
import { AppBar, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material'
import ApiIcon from '@mui/icons-material/Api';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    isLoggedIn: boolean;
    onLoginToggle: () => void;
  }

export default function Header({ isLoggedIn, onLoginToggle }: HeaderProps) {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLoginToggle(); 
        navigate('/'); 
      };

      const handleButtonClick = () => {
        if (isLoggedIn) {
          handleLogout(); 
        } 
      };
  return (
    <div>
        <AppBar position='static' sx={{ background: 'white', color: 'black' }}>
            <Toolbar>
                <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
                    <ApiIcon />
                </IconButton>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1}}>
                    Tekton
                </Typography>
                <Stack direction='row' spacing={2}>
                    <Button color='primary' onClick={handleButtonClick} sx={{ background: 'white' }}>
                    {isLoggedIn ? 'Logout' : 'Login'}
                    </Button>
                </Stack>
            </Toolbar>
        </AppBar>
    </div>
  )
}
