import * as React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { selectedUserDeleted } from '../../redux/features/search/searchSlice'

import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

const DeletableChips = () => {
  const dispatch = useDispatch()
  const selectedUsers = useSelector(({ search: { selectedUsers } }) => selectedUsers)

  const handleDelete = (id) => () => {
    dispatch(selectedUserDeleted(id))
  }

  return (
    <Stack direction="row" spacing={1}>
      {selectedUsers.map(({ username, _id: id }) => (
        <Chip key={id} label={username} variant="outlined" onDelete={handleDelete(id)} />
      ))}
    </Stack>
  )
}

export default DeletableChips