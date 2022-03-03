import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import workspaceReducer from '../features/workspase/workspaseSlice'

export const store = configureStore({
  reducer: {
    userData: userReducer,
    workspace: workspaceReducer
  }
})
