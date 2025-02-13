import { useState } from 'react';
import "./App.css"
import { BrowserRouter, RouterProvider, createBrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage'
import HomePage from './pages/HomePage';
import AdminHomePage from './Admin/AdminHomepage';
import PaymentPage from './PaymenyGateway/PaymentPage';
import { AuthContext } from './utils/Auth';
import { Protected } from './pages/Protected';
import SuccessPage from './PaymenyGateway/successPage';

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
      path: '/successPage',
      element: <SuccessPage />,
    },
    {
      path: '/AdminHomePage',
      element: <Protected><AdminHomePage /></Protected>,
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
