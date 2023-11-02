import React from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import ApiIcon from '@mui/icons-material/Api';

export default function Header() {
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
                {/* <Stack direction='row' spacing={2}>
                    <Button color='primary' sx={{ background: 'white' }}>login</Button>
                </Stack> */}
            </Toolbar>
        </AppBar>
    </div>
  )
}
