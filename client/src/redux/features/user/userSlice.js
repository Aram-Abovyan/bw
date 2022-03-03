import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const authUser = (email, password) => async () => {
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

  return data.success ? data.data.user : data.error
})

const initialState = {
  status: 'loading',
  user: {}
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
        state.user = action.payload
        state.status = 'idle'
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'error'
      })
  }
})


export default userSlice.reducer