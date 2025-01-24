import {StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/home'
import Profile_List from './components/Profile_List';
import Profile from './components/Profile'
import Test from './components/test'
import Regist from './components/regist'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Profile_List/>,
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
    element: <Regist/>,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)