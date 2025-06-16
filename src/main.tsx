// main.tsx
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from './context/authContext/AuthContext'
import { RouterProvider } from './routes/RouterProvider'
import { ErrorBoundary } from './components/errorboundary/ErrorBoundary'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
 <ErrorBoundary>
   <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider />
      <ToastContainer />
    </QueryClientProvider>
  </AuthProvider>
 </ErrorBoundary>
)
