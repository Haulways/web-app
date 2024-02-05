import logoImg from '../../assets/logo192.png';
import { Link, NavLink } from 'react-router-dom';
import './header.css'




const logo = (
  <div className='logo'>
    <Link to='/'>
      <img src={logoImg} alt='logo' />
      </Link>
  </div>
)
const Header = () => {


  return (
    <>
      {/* header  */}
      <header className='home'>
        <div className='header__nav'>
          
          {logo}
          
          {/* signUp links */}
            <div className='header__right'>
            <ul>
             
              <li className='signin'><NavLink to="/login">Login</NavLink></li>
              <li className='signup'><NavLink to="/signup">Sign up</NavLink></li>

                </ul>
          </div>
          
          </div>
          
        </header>
    </>
  )
}

export default Header