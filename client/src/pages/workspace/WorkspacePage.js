import { useEffect } from 'react'

import { useNavigate, useParams } from 'react-router'

import { useSelector, useDispatch } from 'react-redux'
import { fetchWorkspace } from '../../redux/features/workspase/workspaseSlice'

import Header from '../../components/header/Header'
import Button from '../../components/buttons/Button'
import CircularProgress from '@mui/material/CircularProgress'
import MemberList from '../../components/lists/MemberList'

import './workspace-page.css'

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
    <div id="workspace-page">
      <Header
        label={status === 'loading' ? <CircularProgress /> : workspaceName}
        buttons={[
          <Button
            label="Logout"
            onClick={handleLogout}
          />
        ]}
      />

      <div className="member-list">
        <MemberList />
      </div>
    </div>
  )
}

export default WorkspacePage