import NavMenu  from '../navmenu/NavMenu';
import { ModeToggle } from '../mode-toggle/ModeToggle';
import { useTheme } from '../../context/themeContext/ThemeProvider';
import { Link } from '@tanstack/react-router';
import { Profile } from '../profile-dropdown/Profile';
import { CartDropdown } from '../cart-dropdown/cartDropdown';
import { headerContainer, iconsDiv, logoDiv, navDiv } from '@/styles/headerStyles';


const Header = () => {
    const {theme} = useTheme()
    const isDark = theme === 'dark'

  return (
 <>
  <div className={headerContainer}>
  {/* Logo */}
  <div className={logoDiv}>
    <Link to="/">
    <img
      src={isDark ? "/darklogo.png" : "/logo.png"}
      className="h-12 w-auto h-25 w-25"
      alt="Stylowears"
    /></Link>
  </div>

  {/* Navbar*/}
  <div className={navDiv}>
    <NavMenu />
  </div>

  {/* Icons */}
  <div className={iconsDiv}>
    <Profile/>
    <CartDropdown/>
    <ModeToggle />
  </div>
</div>
<div>
</div>

 </>

  )
}

export default Header