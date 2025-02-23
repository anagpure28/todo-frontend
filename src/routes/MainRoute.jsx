import React from 'react'
import Navbar from '../components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import CreateTask from '../pages/CreateTask'
import { AuthenticatedUser, ProtectedRoute } from '../components/ProtectedRoutes'
import TaskManager from '../pages/TaskManager'

const MainRoute = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <CreateTask />
          </ProtectedRoute>
        }
      />
      <Route
        path="/task"
        element={
          <ProtectedRoute>
            <TaskManager />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser>
        }
      />
        <Route path="/signup" element={<Signup />}/>
      </Routes>
    </div>
  )
}

export default MainRoute
