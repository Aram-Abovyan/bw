import Header from '../../components/header/Header'
import Box from '@mui/material/Box'
import RegisterForm from '../../components/forms/RegisterForm'

const RegisterPage = () => {
  return (
    <div className="register-page">
      <Header
        label="Register"
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 6
        }}
      >
        <RegisterForm />
      </Box>
    </div>
  )
}

export default RegisterPage