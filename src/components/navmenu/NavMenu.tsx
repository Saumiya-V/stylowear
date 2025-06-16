import { Link } from "@tanstack/react-router"


const NavMenu = () => {
  return (
     <div >
      <ul className="flex gap-10 font-semibold">
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