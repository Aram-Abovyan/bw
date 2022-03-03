import MuiButton from '@mui/material/Button'

const Button = ({ label, onClick }) => {
  return (
    <MuiButton
      onClick={onClick}
      variant="contained"
    >
      {label}
    </MuiButton>
  )
}

export default Button