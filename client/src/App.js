import React from 'react'
import { Routes, Route } from 'react-router-dom'
import {
  HomePage,
  LoginPage,
  RegisterPage,
  WorkspacePage,
} from './pages'

import ComponentTest from './pages/component_test/ComponentTest'

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/workspace/:id" element={<WorkspacePage />} />
        <Route path="/component-test" element={<ComponentTest />} />
      </Routes>
    </div>
  )
}

export default App
