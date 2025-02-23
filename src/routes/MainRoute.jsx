import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import CreateTask from '../pages/CreateTask'
import { AuthenticatedUser, ProtectedRoute } from '../components/ProtectedRoutes'
import TaskManager from '../pages/TaskManager'

const MainRoute = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("todo-token"));

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(!!localStorage.getItem("todo-token"));
    };

    window.addEventListener("login", checkLoginStatus); // Custom event for login
    window.addEventListener("logout", checkLoginStatus); // Custom event for logout

    return () => {
      window.removeEventListener("login", checkLoginStatus);
      window.removeEventListener("logout", checkLoginStatus);
    };
  }, []);

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
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
        path="/tasks"
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
              <Login setIsLoggedIn={setIsLoggedIn} />
            </AuthenticatedUser>
          }
        />
        <Route path="/signup" element={<Signup />}/>
      </Routes>
    </div>
  )
}

export default MainRoute
