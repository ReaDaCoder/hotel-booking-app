import { useState } from 'react'
import './App.css'
import { BrowserRouter, RouterProvider, createBrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage'
import HomePage from './pages/HomePage';
import AdminHomePage from './Admin/AdminHomepage';
import Payment from './pages/PaymentForm';
import PaymentPage from './pages/PaymentPage';
import { AuthContext } from './utils/Auth';
import { Protected } from './pages/Protected';

function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '/RegistrationPage',
      element: <RegistrationPage />,
    },
    {
      path: '/HomePage',
      element: <Protected><HomePage /></Protected>,
    },
    {
      path: '/PaymentPage',
      element: <PaymentPage />,
    },
    {
      path: '/AdminHomePage',
      element: <Protected><AdminHomePage /></Protected>,
    },
    {
      path: '/PaymentForm',
      element: <Payment />,
    },
  ]);

  return (
    <>
    <AuthContext>
    <RouterProvider router={router} />
    </AuthContext>
    </>
  )
}

export default App
