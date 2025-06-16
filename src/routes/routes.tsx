// routes/routes.tsx
import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from '@tanstack/react-router'
import KidsWear from '@/pages/products/KidsWear'
import MensWear from '@/pages/products/MensWear'
import WomensWear from '@/pages/products/WomensWear'
import Layout from '@/pages/layout/Layout'
import Login from '@/pages/login/Login'
import Home from '@/pages/home/Home'
import Cart from '@/pages/cart/Cart'
import { Inventory } from '@/pages/admin/Inventory'
import Form from '@/components/form/Form'
import Unauthorized from '@/pages/unauthorized/Unauthorized'
import { ThemeProvider } from '@/context/themeContext/ThemeProvider'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { EditStateProvider } from '@/context/editContext/EditContext'
import { ProtectedRoute } from './ProtectedRoute'

const rootRoute = createRootRoute({
  component: () => (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <EditStateProvider>
        <Provider store={store}>
        <Layout />
      </Provider>
      </EditStateProvider>
    </ThemeProvider>
  ),
  errorComponent: ({ error }) => (
    <div className="p-4 text-red-500">
      <h2>Something went wrong 💥</h2>
      <pre>{error.message}</pre>
    </div>
  ),
})

const requireRole = (allowedRoles: Array<'user' | 'admin'>) => {
  return ({ context }: any) => {
    const { user } = context.auth
    if (!user) {
      throw redirect({ to: '/login' })
    }
    if (!allowedRoles.includes(user.role)) {
      throw redirect({ to: '/unauthorized' })
    }
  }
}


const HomeRoute = createRoute({
  path: '/',
  getParentRoute: () => rootRoute,
  component: Home,
})

const LoginRoute = createRoute({
  path: '/login',
  getParentRoute: () => rootRoute,
  component: Login,
})

const MenRoute = createRoute({
  path: '/men',
  getParentRoute: () => rootRoute,
  component: MensWear,
})

const WomenRoute = createRoute({
  path: '/women',
  getParentRoute: () => rootRoute,
  component: WomensWear,
})

const KidsRoute = createRoute({
  path: '/kids',
  getParentRoute: () => rootRoute,
  component: KidsWear,
})

const CartRoute = createRoute({
  path: '/cart',
  getParentRoute: () => rootRoute,
  component: Cart,
  beforeLoad: requireRole(['user']),
})

const InventoryRoute = createRoute({
  path: '/inventory',
  getParentRoute: () => rootRoute,
  component: ()=>(<ProtectedRoute>
    <Inventory/>
  </ProtectedRoute>),
  beforeLoad: requireRole(['admin']),
})

const FormRoute = createRoute({
  path: '/form',
  getParentRoute: () => rootRoute,
  component: Form,
  beforeLoad: requireRole(['admin']),
})



const UnauthorizedRoute = createRoute({
  path: '/unauthorized',
  getParentRoute: () => rootRoute,
  component: Unauthorized,
})


const routeTree = rootRoute.addChildren([
  HomeRoute,
  LoginRoute,
  MenRoute,
  WomenRoute,
  KidsRoute,
  CartRoute,
  InventoryRoute,
  FormRoute,
  UnauthorizedRoute,
])

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!, 
  },
})

export { router }
