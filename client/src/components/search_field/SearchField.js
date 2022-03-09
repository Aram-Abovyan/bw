import * as React from 'react'
import { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers, usersReseted, selectedValueAdded } from '../../redux/features/search/searchSlice'

import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Autocomplete from '@mui/material/Autocomplete'

import { request } from '../../api/request'


const SearchField = () => {
  const dispatch = useDispatch()
  const users = useSelector(({ search: { users } }) => users)

  const [ inputValue, setInputValue ] = useState('')
  const [ selectedValu, setSelectedValue ] = useState('')
  const [ timeoutId, setTimeoutId ] = useState('')

  useEffect(() => {
    dispatch(usersReseted())

    if (inputValue.length >= 3) {
      clearTimeout(timeoutId)

      setTimeoutId(setTimeout(async () => {
        dispatch(fetchUsers({ subStr: inputValue }))
      }, 2000))
    }

  }, [inputValue])

  return (
    <Stack spacing={2} sx={{ mt:2, width: 300 }}>
      <Autocomplete
        onChange={(e) => dispatch(selectedValueAdded(e.target.textContent))}
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={users.map(({ username, email }) => `${username}: ${email}`)}
        renderInput={(params) => {
          return (
            <TextField
              onChange={(e) => setInputValue(e.target.value)}
              {...params}
              label="Search input"
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
            />
          )
        }}
      />
    </Stack>
  )
}

export default SearchField