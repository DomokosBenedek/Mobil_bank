import {StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/home'
import Profile_List from './components/Profile_List'
import Profile from './components/Profile'
import Regist from './components/Regist'
import Test from './components/test'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Test/>,
  },
  {
    path: "/profile",
    element: <Profile_List/>,
  },
  {
<<<<<<< HEAD
    path: "/profile/:id",
    element: <Profile id={''}/>,
=======
    path: "/profile/:",
    element: <Profile id={'1'}/>,
>>>>>>> 1f4a24cb1d226b0766ab314728c2e6cd26f37075
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