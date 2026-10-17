import { useState } from 'react'
import User from './getUser/User';
import AddUser from './addUser/AddUser';
import UpdateUser from './Update/UpdateUser';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <User />,
    },
    {
      path: "/add",
      element: <AddUser />,
    },
    {
      path: "/update/:id",
      element: <UpdateUser />,
    },
  ])

  return (
    <div className='App'>

      <RouterProvider router={route} />
    </div>

  )
}

export default App
