import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter, Route,  createRoutesFromElements} from 'react-router-dom'
import Home from '../src/components/Home.jsx'

const router = createBrowserRouter(createRoutesFromElements(
    // <Route path="/" element={<Layout />}>
  <Route>
      <Route path="/" element={<Home/>} />
  </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>
)
