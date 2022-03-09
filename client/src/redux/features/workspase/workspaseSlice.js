import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { request } from '../../../api/request'

export const fetchWorkspace = createAsyncThunk('workspace/fetchWorkspace', async ({ id }) => {
  const data = await request.workspaceData(id)

  return data
})

export const addMembers = createAsyncThunk('workspace/addMembers', async ({ workspaceId, members }) => {
  const workspace = await request.addMembers(workspaceId, members)
  return workspace
})

export const removeMember = createAsyncThunk('workspace/removeMember', async ({ workspaceId, memberId }) => {
  const members = await request.removeMember(workspaceId, memberId)

  return members
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

      .addCase(addMembers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addMembers.fulfilled, (state, action) => {
        state.members = action.payload
        state.status = 'idle'
      })
      .addCase(addMembers.rejected, (state, action) => {
        console.log(action);
      })

      .addCase(removeMember.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(removeMember.fulfilled, (state, action) => {
        state.members = action.payload
        state.status = 'idle'
      })
  }
})

export const { workspaceSelected } = workspaceSlice.actions

export default workspaceSlice.reducer