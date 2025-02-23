import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

// export const ProtectedRoute = ({children}) => {
// //   const {isAuthenticated} = useSelector(store=>store.auth)
//   const token = JSON.parse(localStorage.getItem('todo-token'))

//   if(!token){
//     return <Navigate to="/login" />
//   }

//   if(token){
//     return <Navigate to="/signup" />
//   }

//   return children
// }
export const ProtectedRoute = ({children}) => {
    const token = JSON.parse(localStorage.getItem('todo-token'));
  
    if (!token) {
      return <Navigate to="/login" />;
    }
  
    return children;
  };
 
  export const AuthenticatedUser = ({ children }) => {
    const token = JSON.parse(localStorage.getItem("todo-token"));
  
    if (token) {
      return <Navigate to="/" />; // Redirect authenticated users to home
    }
  
    return children; // Allow unauthenticated users to access login/signup
  };

// export const AuthenticatedUser = ({children}) => {
//   const {isAuthenticated} = useSelector(store=>store.auth)

//   if(isAuthenticated){
//     return <Navigate to="/" />
//   }

//   return children
// }