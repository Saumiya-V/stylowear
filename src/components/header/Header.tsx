import NavMenu  from '../navmenu/NavMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ModeToggle } from '../mode-toggle/ModeToggle';
import { useTheme } from '../../context/themeContext/ThemeProvider';
import { Link } from '@tanstack/react-router';


const Header = () => {
    const {theme} = useTheme()
    const isDark = theme === 'dark'

  return (
 <>
  <div className="flex items-center justify-between px-6 py-4 h-20 border-b shadow-md w-full bg-white dark:bg-black relative z-50">
  {/* Logo */}
  <div className="flex-shrink-0">
    <Link to="/"><img
      src={isDark ? "/darklogo.png" : "/logo.png"}
      className="h-12 w-auto h-25 w-25"
      alt="Stylowears"
    /></Link>
  </div>

  {/* Nav + Search */}
  <div className="flex items-center gap-20 flex-grow justify-center">
    <NavMenu />
  </div>

  {/* Icons */}
  <div className="flex items-center gap-10">
    <Link to="/login"><FontAwesomeIcon icon={faUser} className="text-xl" /></Link>
    <Link to="/cart"><FontAwesomeIcon icon={faCartShopping} className="text-xl" /></Link>
    <ModeToggle />
  </div>
</div>
<div>
</div>

 </>

  )
}

export default Header