import * as React from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import AddIcon from '@mui/icons-material/Add'
import Typography from '@mui/material/Typography'
import { blue } from '@mui/material/colors'
import { useSelector, useDispatch } from 'react-redux'
import { workspaceSelected, fetchWorkspaces, selectWorkspaces } from '../../redux/features/workspase/workspaseSlice'
import CircularProgress from '@mui/material/CircularProgress'
import { useEffect } from 'react'

function SimpleDialog({ onClose, selectedWorkspaceId, open, workspaces }) {

  const handleClose = () => {
    onClose(selectedWorkspaceId)
  }

  const handleListItemClick = (workspaceId) => {
    onClose(workspaceId)
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set workspace</DialogTitle>
      <List sx={{ pt: 0 }}>
        {workspaces.map(({ _id: id, name }) => (
          <ListItem button onClick={() => handleListItemClick(id)} key={id}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                {name[0].toUpperCase()}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={name} />
          </ListItem>
        ))}

        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add workspace" />
        </ListItem>
      </List>
    </Dialog>
  )
}

// SimpleDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
//   selectedValue: PropTypes.string.isRequired,
// }

const WorkspaceButton = () => {
  const [open, setOpen] = React.useState(false)
  const dispatch = useDispatch()

  const workspaces = useSelector(selectWorkspaces)
  const selectedWorkspaceId = useSelector(({ workspace: { selectedWorkspaceId } }) => selectedWorkspaceId)
  const status = useSelector(({ workspace: { status } }) => status)

  const selectedWorkspace = workspaces[selectedWorkspaceId]

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (workspaceId) => {
    setOpen(false)
    dispatch(workspaceSelected(workspaceId))
  }
  useEffect(() => {
    dispatch(fetchWorkspaces())
  }, [])

  return (
    <div>
      {
        status === 'loading' ?
        <CircularProgress /> :
        (<>
            <Button onClick={handleClickOpen}>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                {selectedWorkspace.name[0].toUpperCase()}
              </Avatar>
              <Typography component="h6" sx={{color: 'white', ml: 1}} >{selectedWorkspace.name}</Typography>
            </Button>
            <SimpleDialog
              selectedWorkspaceId={selectedWorkspaceId}
              open={open}
              onClose={handleClose}
              workspaces={Object.values(workspaces)}
            />
          </>)
      }
    </div>
  )
}

export default WorkspaceButton
