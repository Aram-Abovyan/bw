import { useEffect } from 'react'

import { useNavigate, useParams } from 'react-router'

import { useSelector, useDispatch } from 'react-redux'
import { fetchWorkspace } from '../../redux/features/workspase/workspaseSlice'

import Header from '../../components/header/Header'
import Button from '../../components/buttons/Button'
import CircularProgress from '@mui/material/CircularProgress'
import MemberList from '../../components/lists/MemberList'

const WorkspacePage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
  const status = useSelector(({ workspace: { status } }) => status)
  const workspaceName = useSelector(({ workspace: { name } }) => name)

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    navigate('/login')
  }

  useEffect(() => {
    dispatch(fetchWorkspace({id: params.id}))
  }, [])

  return (
    <div>
      <Header
        label={status === 'loading' ? <CircularProgress /> : workspaceName}
        buttons={[
          <Button
            label="Logout"
            onClick={handleLogout}
          />
        ]}
      />

      <MemberList />
    </div>
  )
}

export default WorkspacePage