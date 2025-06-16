import { RouterProvider as TanStackRouterProvider } from '@tanstack/react-router'
import { router } from './routes'
import { useAuth } from '@/context/authContext/AuthContext'

export function RouterProvider() {
  const auth = useAuth()

  router.update({
    context: {
      auth,
    },
  })

  return <TanStackRouterProvider router={router} />
}


