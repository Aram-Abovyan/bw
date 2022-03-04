import { useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { fetchUserData } from '../../redux/features/user/userSlice'

import Button from '../../components/buttons/Button'
import Header from '../../components/header/Header'
import CircularProgress from '@mui/material/CircularProgress'
import WorkspaceList from '../../components/lists/WorkspaceList'

const HomePage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const status = useSelector(({ userData: { status } }) => status)
  const personalData = useSelector(({ userData: { personalData } }) => personalData)

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
        label={status === 'idle' ? personalData?.username : <CircularProgress />}
        buttons={[
          <Button
            label="Logout"
            onClick={handleLogout}
          />
        ]}
      />

      <WorkspaceList />
    </div>
  )
}

export default HomePage