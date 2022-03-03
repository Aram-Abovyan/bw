import React from 'react'
import { Routes, Route } from 'react-router-dom'
import {
  HomePage,
  LoginPage,
  RegisterPage
} from './pages'

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  )
}

export default App
