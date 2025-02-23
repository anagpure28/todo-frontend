// import React from 'react';

// const Signup = () => {
//   return (
//     <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//         <img 
//           className="mx-auto h-10 w-auto" 
//           src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" 
//           alt="Your Company"
//         />
//         <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
//           Sign in to your account
//         </h2>
//       </div>

//       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//         <form className="space-y-6" action="#" method="POST">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-900">
//               Email address
//             </label>
//             <div className="mt-2">
//               <input 
//                 type="email" 
//                 name="email" 
//                 id="email" 
//                 autoComplete="email" 
//                 required 
//                 className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
//               />
//             </div>
//           </div>

//           <div>
//             <div className="flex items-center justify-between">
//               <label htmlFor="password" className="block text-sm font-medium text-gray-900">
//                 Password
//               </label>
//               <div className="text-sm">
//                 <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
//                   Forgot password?
//                 </a>
//               </div>
//             </div>
//             <div className="mt-2">
//               <input 
//                 type="password" 
//                 name="password" 
//                 id="password" 
//                 autoComplete="current-password" 
//                 required 
//                 className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
//               />
//             </div>
//           </div>

//           <div>
//             <button 
//               type="submit" 
//               className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//             >
//               Sign in
//             </button>
//           </div>
//         </form>

//         <p className="mt-10 text-center text-sm text-gray-500">
//           Not a member?{' '}
//           <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
//             Start a 14-day free trial
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRegisterUserMutation } from "../features/api/authApi";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();

  


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputData = formData;
    await registerUser(inputData);
    console.log("Signup Data:", formData);
    setFormData({
        name: "",
        email: "",
        password: "",
      })
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      alert(registerData.message || "Signup Successfull.");
    }
    if(registerError){
      alert(registerError.data.message ||"Signup Failed")
    }
  }, [
    registerIsLoading,
    registerData,
    registerError
  ]);
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
