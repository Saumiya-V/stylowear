import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/context/authContext/AuthContext"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  useNavigate } from "@tanstack/react-router"

export const CartDropdown = ()=>{
     const navigate = useNavigate()
      const {user} = useAuth()


    return (
        <div>
            {
                !user?(
                      <DropdownMenu>
                         <DropdownMenuTrigger asChild>
                             <Button variant="outline" size="icon">
                                <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
                              </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={()=>navigate({to:"/login"})}>
                         Login to access your cart
                        </DropdownMenuItem> 
                        </DropdownMenuContent>
                      </DropdownMenu>
                ):(
                      <Button variant="outline" size="icon" onClick={()=>navigate({to:"/cart"})}>
                                <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
                              </Button>
                )
            }
        </div>
         
    )
}
