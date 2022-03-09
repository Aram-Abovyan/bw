import MuiButton from '@mui/material/Button'

const Button = ({ label, onClick, color = 'primary' }) => {
  return (
    <MuiButton
      onClick={onClick}
      variant="contained"
      color={color}
    >
      {label}
    </MuiButton>
  )
}

export default Button