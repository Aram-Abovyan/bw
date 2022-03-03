import Header from '../../components/header/Header'
import LoginForm from '../../components/forms/LoginForm'
import Box from '@mui/material/Box'

const LoginPage = () => {
  return (
    <div className="login-page">
      <Header
        label="Login"
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 6
        }}
      >
        <LoginForm />
      </Box>
    </div>
  )
}

export default LoginPage