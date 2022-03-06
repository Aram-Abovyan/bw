import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '../buttons/Button'
import Link from '@mui/material/Link'

const LoginForm = () => {
  return (
    <Paper elevation={6}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
          pt: 4, pr: 2, pb: 2, pl: 2
        }}
      >
        <TextField
          required
          label="Username"
          margin="normal"
        />

        <TextField
          required
          label="Email"
          margin="normal"
        />

        <TextField
          required
          label="Password"
          type="password"
          autoComplete="current-password"
          margin="normal"
        />

        <TextField
          required
          label="Confirm password"
          type="password"
          autoComplete="current-password"
          margin="normal"
        />
        
        <Button
          label="Register"
          onClick={() => alert()}
        />

        <Link sx={{mt: 2}} href="/login" underline="hover">
          Login
        </Link>
      </Box>
    </Paper>
  )
}

export default LoginForm