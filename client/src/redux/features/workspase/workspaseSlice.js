import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { createSelector } from '@reduxjs/toolkit'

export const selectWorkspaces = createSelector(({workspace}) => workspace, ({workspaces}) => workspaces)

export const fetchWorkspaces = createAsyncThunk('workspace/fetchWorkspaces', async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    }
  }

  const { data } = await axios.get('/api/workspace', config)

  return data
})

const initialState = {
  status: 'loading',
  selectedWorkspaceId: null,
  workspaces: {}
}

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    workspaceSelected(state, action) {
      state.selectedWorkspaceId = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchWorkspaces.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchWorkspaces.fulfilled, (state, action) => {
        const workspaces = {}

        action.payload.forEach(workspace => {
          workspaces[workspace._id] = workspace
        })

        state.selectedWorkspaceId = action.payload[0]._id
        state.workspaces = workspaces
        state.status = 'idle'

      })
      .addCase(fetchWorkspaces.rejected, (state, action) => {
        state.status = 'error'
      })
  }
})

export const { workspaceSelected } = workspaceSlice.actions

export default workspaceSlice.reducer