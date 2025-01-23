import {StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/home'
import Profile from './components/profile';
import Register from './components/regist';
import Profile_List from './components/Profile_List';

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
    path: "/Register",
    element: <Register/>,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)