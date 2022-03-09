import * as React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { selectedUserAdded, dataReseted } from '../../redux/features/search/searchSlice'
import { addMembers } from '../../redux/features/workspase/workspaseSlice'

import { useParams } from 'react-router'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import SearchField from '../search_field/SearchField'
import DeletableChips from '../chip/DeletableChips'

const MemberFormDialog = () => {
  const dispatch = useDispatch()
  const params = useParams()

  const selectedValue = useSelector(({ search: { selectedValue } }) => selectedValue)
  const users = useSelector(({ search: { users } }) => users)
  const selectedUsers = useSelector(({ search: { selectedUsers } }) => selectedUsers)

  const [ open, setOpen ] = React.useState(false)
  // const [ name, setName ] = React.useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    dispatch(dataReseted())

    setOpen(false)
  }

  const handleAdd = () => {
    const userData = users.find(({ email }) => selectedValue.includes(email))
    dispatch(selectedUserAdded(userData))
  }

  const handleConfirm = () => {
    dispatch(addMembers({workspaceId: params.id, members: selectedUsers}))
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
        <DialogTitle>Add member</DialogTitle>
        <DialogContent>
          <SearchField />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAdd} >Add</Button>
        </DialogActions>
        

        <DialogContent>
          <DeletableChips />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default MemberFormDialog