import { useState } from 'react'

import { request } from '../../api/request'

import { useNavigate } from 'react-router'

import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '../buttons/Button'
import Link from '@mui/material/Link'

const RegisterForm = () => {
  const [ username, setUsername ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ confirmPassword, setconfirmPassword ] = useState('')

  const navigate = useNavigate()

  const handleRegister = async () => {
    const data = await request.register({username, email, password, confirmPassword})
    localStorage.setItem('authToken', data.token)
    navigate('/')
  }

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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          required
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          required
          label="Password"
          type="password"
          autoComplete="current-password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextField
          required
          label="Confirm password"
          type="password"
          autoComplete="current-password"
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setconfirmPassword(e.target.value)}
        />
        
        <Button
          label="Register"
          onClick={handleRegister}
        />

        <Link sx={{mt: 2}} href="/login" underline="hover">
          Login
        </Link>
      </Box>
    </Paper>
  )
}

export default RegisterForm