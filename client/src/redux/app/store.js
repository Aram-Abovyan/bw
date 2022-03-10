import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import workspaceReducer from '../features/workspase/workspaseSlice'
import searchReduser from '../features/search/searchSlice'


export const store = configureStore({
  reducer: {
    userData: userReducer,
    workspace: workspaceReducer,
    search: searchReduser
  }
})
