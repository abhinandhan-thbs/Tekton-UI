import React from 'react'
import { Box, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#333',
        color: '#fff',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" gutterBottom>
        &copy; THBS 2023
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <IconButton color="primary" href="https://www.facebook.com/your-facebook-page">
          <FacebookIcon />
        </IconButton>
        <IconButton color="primary" href="https://instagram.com/your-instagram-account">
          <InstagramIcon />
        </IconButton>
        <IconButton color="primary" href="https://www.linkedin.com/in/your-linkedin-profile">
          <LinkedInIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default Footer
