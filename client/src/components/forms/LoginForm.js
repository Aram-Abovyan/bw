import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '../buttons/Button'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { authUser } from '../../redux/features/user/userSlice'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loginHandler = async () => {
    await dispatch(authUser(email, password))
    navigate('/')
  }

  return (
    <Paper elevation={6}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
          pt: 4, pr: 2, pb: 4, pl: 2
        }}
      >
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          label="Email"
          margin="normal"
        />

        <TextField
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          label="Password"
          type="password"
          autoComplete="current-password"
          margin="normal"
        />
        
        <Button
          label="Login"
          onClick={loginHandler}
        />
      </Box>
    </Paper>
  )
}

export default LoginForm