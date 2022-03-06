import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { request } from '../../../api/request'

export const fetchWorkspace = createAsyncThunk('workspace/fetchWorkspace', async ({ id }) => {
  const data = await request.workspaceData(id)

  return data
})

const initialState = {
  status: 'loading'
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