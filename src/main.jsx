import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { ClerkProvider } from '@clerk/clerk-react'
import { Toaster } from './components/ui/sonner'

import Home from './home'
import Contact from './contact'
import Profile from './profile'
import AddListing from './add-listing'
import DraftPage from './draftpage'


const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/contact',
      element: <Contact />,
    },
    {
      path: '/profile',
      element: <Profile />,
    },
    {
      path: '/add-listing',
      element: <AddListing />,
    },
    {
      path: '/draft-page',
      element: <DraftPage />,
    }
  ]
)

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router}/>    
      <Toaster />
    </ClerkProvider>
  </StrictMode>,
)
