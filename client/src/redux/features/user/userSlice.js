import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { fetchWorkspaces, workspaceSelected } from '../workspase/workspaseSlice'

export const authUser = (email, password) => async (args, a) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const { data } = await axios.post('/api/auth/login', {email, password}, config)

  localStorage.setItem('authToken', data.token)
}

export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    }
  }

  const { data } = await axios.get('/api/home', config)

  return data.userData
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
  }
})


export default userSlice.reducer