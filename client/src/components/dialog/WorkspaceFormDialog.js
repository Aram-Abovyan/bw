import * as React from 'react'

import { useDispatch } from 'react-redux'
import { addWorkspace } from '../../redux/features/user/userSlice'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'

const WorkspaceFormDialog = () => {
  const dispatch = useDispatch()
  const [ open, setOpen ] = React.useState(false)
  const [ name, setName ] = React.useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCreate = () => {
    dispatch(addWorkspace({name}))
    handleClose()
  }

  return (
    <div>
      <Fab
        onClick={handleClickOpen}
        size="small"
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create workspace</DialogTitle>
        <DialogContent>
          <TextField
            onChange={(e) => {setName(e.target.value)}}
            value={name}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default WorkspaceFormDialog