import * as React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { workspaceSelected } from '../../redux/features/workspase/workspaseSlice'

import { useNavigate } from 'react-router'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import CircularProgress from '@mui/material/CircularProgress'

const WorkspaceList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const status = useSelector(({ userData: { status } }) => status)
  const workspaces = useSelector(( { userData: { workspaces } }) => workspaces)

  const handleClick = id => () => {
    navigate(`/workspace/${id}`)
  }

  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {
        status === 'loading' ?
        <CircularProgress /> :
        workspaces.map(({ _id: id, name }) => (
            <ListItem
              key={id}
              disablePadding
            >
              <ListItemButton onClick={handleClick(id)} >
                <ListItemAvatar>
                  <Avatar>{name[0].toUpperCase()}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={`${name}`} />
              </ListItemButton>
            </ListItem>
          )
        )
      }
    </List>
  )
}

export default WorkspaceList