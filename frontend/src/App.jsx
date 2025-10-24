import { ChartBar } from 'lucide-react'
import React from 'react'
import { Button } from './components/ui/button'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'



const router = createBrowserRouter([
  {
    path: '/',
    element: <><Navbar/> <Home/> </>
  },
  {
    path: '/signup',
    element: <><SignUp/></>
  },
  {
    path: '/login',
    element: <><Login/></>
  },

])

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App