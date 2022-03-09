import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { request } from '../../../api/request'

const initialState = {
  status: 'loading',
  selectedValue: '',
  users: [],
  selectedUsers: []
}

export const fetchUsers = createAsyncThunk('search/users', async ({subStr}) => {
  const users = await request.users(subStr)

  return users
})

const searchSlice = createSlice({
  name: 'search',
  initialState,

  reducers: {
    usersReseted(state) {
      state.users = []
    },

    selectedUserDeleted(state, action) {
      const { selectedUsers } = state
      state.selectedUsers = selectedUsers.filter(({ _id: id }) => id !== action.payload)
    },

    selectedUserAdded(state, action) {
      state.selectedUsers.push(action.payload)
    },

    selectedValueAdded(state, action) {
      state.selectedValue = action.payload
    },

    selectedValueDeleted(state) {
      state.selectedValue = ''
    },

    dataReseted(state) {
      state.selectedValue = ''
      state.users = []
      state.selectedUsers = []
    }
  },

  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload
        state.status = 'idle'
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'error'
      })
  }
})

export const {
  usersReseted,
  selectedUserDeleted,
  selectedUserAdded,
  selectedValueAdded,
  selectedValueDeleted,
  dataReseted
} = searchSlice.actions

export default searchSlice.reducer