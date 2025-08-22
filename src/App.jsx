import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './Pages/Home'
import About from './Pages/About'
import Country from './Pages/Country'
import Contact from './Pages/Contact'
import AppLayout from './Components/Layout/AppLayout'
import ErrorPage from './Pages/ErrorPage'
import CountryDetails from './Components/Layout/CountryDetails'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/country',
        element: <Country />
      },
      {
        path: '/country/:id',
        element: <CountryDetails />
      },
      {
        path: '/contact',
        element: <Contact />
      },
    ]
  }
])

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <RouterProvider router={router} />
    </div>
  )
}

export default App