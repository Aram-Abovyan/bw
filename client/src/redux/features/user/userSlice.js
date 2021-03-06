import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { request } from '../../../api/request'

export const authUser = (email, password) => () => {
  request.login(email, password)
  .then(data => localStorage.setItem('authToken', data.token))
}

export const registerUser = (username, email, password, confirmPassword) => {
  request.register(username, email, password, confirmPassword)
  .then(data => localStorage.setItem('authToken', data.token))
}

export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => {
  const data = await request.userData()

  return data.userData
})

export const addWorkspace = createAsyncThunk('user/addWorkspace', async ({ name }) => {
  const workspace = await request.createWorkspace(name)

  return workspace
})

const initialState = {
  status: 'loading',
  personalData: {},
  workspaces: []
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        const { personalData, workspaces } = action.payload
        state.personalData = personalData
        state.workspaces = workspaces
        state.status = 'idle'
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'error'
      })

      .addCase(addWorkspace.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addWorkspace.fulfilled, (state, action) => {
        const workspace = action.payload
        state.workspaces.push(workspace)
        state.status = 'idle'
      })
      .addCase(addWorkspace.rejected, (state, action) => {
        state.status = 'error'
      })
  }
})


export default userSlice.reducer