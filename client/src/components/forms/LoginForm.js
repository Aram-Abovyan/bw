import { useState, useMemo } from 'react'

import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { authUser } from '../../redux/features/user/userSlice'

import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '../buttons/Button'
import Link from '@mui/material/Link'

// import { useYupValidationResolver } from '../../validation/validation'
// import { useForm } from 'react-hook-form'
// import * as yup from 'yup'


const LoginForm = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loginHandler = async () => {
    await dispatch(authUser(email, password))
    navigate('/')
  }

  // const validationSchema = useMemo(
  //   () =>
  //     yup.object({
  //       // username: yup.string().required('Required'),
  //       email: yup.string().required('Required')
  //     }),
  //   []
  // )

  // const resolver = useYupValidationResolver(validationSchema)
  // const { handleSubmit, errors, register } = useForm({ resolver })
  // console.log('errors', errors)

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
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          label="Email"
          margin="normal"
          // {...register('email')}
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

        <Link sx={{mt: 2}} href="/register" underline="hover">
          Register
        </Link>
      </Box>
    </Paper>
  )
}

export default LoginForm