import { navList } from "@/styles/headerStyles"
import { Link } from "@tanstack/react-router"


const NavMenu = () => {
  return (
     <div >
      <ul className={navList}>
        <li>
         <Link to="/men">MEN</Link>
        </li>
        <li>
         <Link to="/women">WOMEN</Link>
        </li>
        <li>
         <Link to="/kids">KIDS</Link>
        </li>
        <li>
         <Link to="/inventory">INVENTORY</Link>
        </li>
      </ul>
     </div>
  )
}

export default NavMenu