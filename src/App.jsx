import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'

import { Route, Routes } from 'react-router-dom'
import MainRoute from './routes/MainRoute'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <h1>nj</h1> */}

        {/* <Navbar/> */}
        <MainRoute/>

    </>
  )
}

export default App
