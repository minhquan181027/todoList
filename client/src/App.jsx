import { useState } from 'react'
import User from './getUser/User';          // Nếu trên máy là getUser (hoặc GetUser thì sửa theo máy)
import AddUser from './addUser/AddUser';    // Nếu trên máy là addUser (hoặc AddUser)
import UpdateUser from './Update/UpdateUser'; // Chú ý: Lỗi báo là 'Update' viết hoa chữ U
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
