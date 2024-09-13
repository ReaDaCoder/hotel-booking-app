import { useState } from 'react'
import './App.css'
import LoginPage from './pages/LoginPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegistrationPage from './pages/RegistrationPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      < Route exact path="/" element={<LoginPage/>}/>
      <Route element={<RegistrationPage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
