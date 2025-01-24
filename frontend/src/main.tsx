import {StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/home'
import Profile_List from './components/Profile_List';
import Profile from './components/Profile'
import Register from './components/Regist'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/profile",
    element: <Profile_List/>,
  },
  {
    path: "/profile/:id",
    element: <Profile/>,
  },
  {
    path: "/Regist",
    element: <Register/>,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)