import Header from '../../components/header/Header'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserData } from '../../redux/features/user/userSlice'
import { useNavigate, Navigate } from 'react-router-dom'
import Button from '../../components/buttons/Button'
import WorkspaceButton from '../../components/buttons/WorkspaceButton'
import CircularProgress from '@mui/material/CircularProgress'

const HomePage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const status = useSelector(({ userData: { status } }) => status)
  const user = useSelector(({ userData: { user } }) => user)

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    navigate('/login')
  }

  useEffect(() => {
    dispatch( fetchUserData() )
  }, [])

  return (
    <div className="home-page">
      {status === 'error' ? <Navigate to="/login" /> : null}

      <Header
        label={status === 'idle' ? user?.username : <CircularProgress />}
        buttons={[
          <WorkspaceButton />,
          <Button
            label="Logout"
            onClick={handleLogout}
          />
        ]}
      />
    </div>
  )
}

export default HomePage