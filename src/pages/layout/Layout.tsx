import Header from "@/components/header/Header"
import { Outlet } from "@tanstack/react-router"

const Layout = () => {
  return (
    <div  className="min-h-screen flex flex-col">
      <Header/>
      <Outlet/>
    </div>
  )
}

export default Layout
