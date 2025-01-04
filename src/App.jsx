import React from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from './Components/Home';
import Room from './Components/Room';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/room/:roomId',
    element: <Room />
  },
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
 

