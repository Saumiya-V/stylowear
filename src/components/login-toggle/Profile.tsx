import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "@tanstack/react-router"
import { useAuth } from "@/context/authContext/AuthContext"




export const Profile = ()=>{
    const navigate = useNavigate()
    const {logout,user} = useAuth()
    return (
       <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {!user?(<FontAwesomeIcon icon={faUser} className="text-xl" />):(user.role === "admin"?"A":"U")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {
            !user?(
                <DropdownMenuItem onClick={()=>navigate({to:"/login"})}>
         Login
        </DropdownMenuItem>
            ):(
        <DropdownMenuItem onClick={() => logout()}>
          Logout
        </DropdownMenuItem>
            )
        }
        
      </DropdownMenuContent>
    </DropdownMenu>
    )
}