import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchWorkspace = createAsyncThunk('workspace/fetchWorkspace', async ({ id }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    }
  }

  const { data } = await axios.get(`/api/workspace/${id}`, config)

  return data
})

const initialState = {
  status: 'loading',
  data: {}
}

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchWorkspace.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchWorkspace.fulfilled, (state, action) => {
        const { name, creator, members, _id, currentUserId } = action.payload.workspaceData
        state.name = name
        state.creator = creator
        state.members = members
        state.id = _id
        state.currentUserId = currentUserId
        state.status = 'idle'
        state.currentUserId = action.payload.currentUserId
      })
      .addCase(fetchWorkspace.rejected, (state, action) => {
        state.status = 'error'
      })
  }
})

export const { workspaceSelected } = workspaceSlice.actions

export default workspaceSlice.reducer