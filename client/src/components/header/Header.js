import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { v4 as uuidv4 } from 'uuid'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    }
  }
})

const Header = ({ label, buttons = [] }) => {
  return (
    <Stack spacing={2} sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              {label}
            </Typography>

            {buttons.map(button => (
              <Typography variant="h6" noWrap component="div" sx={{p:2}} key={uuidv4()} >
                {button}
              </Typography>
            ))}

          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Stack>
  )
}

export default Header