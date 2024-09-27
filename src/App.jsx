import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage'
import HomePage from './pages/HomePage';
import AdminHomePage from './Admin/AdminHomepage';
import Payment from './pages/PaymentForm';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      < Route exact path="/" element={<LoginPage/>}/>
      <Route path="/RegistrationPage" element={<RegistrationPage/>}/>
      <Route path="/HomePage" element={<HomePage/>}/>
      <Route path="/PaymentPage" element={<PaymentPage/>} />
      <Route path="/AdminHomePage" element={<AdminHomePage/>}/>
      <Route path="/PaymentForm" element={<Payment/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
