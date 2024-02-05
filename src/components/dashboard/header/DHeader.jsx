import logoImg from '../../../assets/logo192.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { MdKeyboardArrowDown } from "react-icons/md";
import { signOut} from "firebase/auth";
import { toast } from 'react-toastify';
import { useContext,  useState } from 'react';
import { auth } from '../../../firebase/config';
import './DHeader.css'
import { chatIcon, searchIcon } from '../../../assets';
import { BsPlusCircleFill } from "react-icons/bs";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { AuthContext } from '../../context/AuthContext';
import userIcon from "../../../assets/defaultProfile.png";
import search from "../../../assets/profileIcons/userSearch.png";
import Action from "../../../assets/profileIcons/Actions.png";
import help from "../../../assets/profileIcons/help.png";


const activeLink = ({ isActive }) => (isActive ? `${"active"}` : "");

const logo = (
  <div className='logo'>
    <Link to='/dashboard'>
      <img src={logoImg} alt='logo' />
      </Link>
  </div>
)
const DHeader = () => {
  // use state function 
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const userImage = currentUser.photoURL ? currentUser.photoURL : userIcon;
 
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // toggle drop down menu 
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

 
  
  // logout user function 
  const logoutUser = () => {
    signOut(auth).then(() => {
      toast.success("Signed out")
      navigate("/");

    }).catch((error) => {
      toast.error(error.message);
    });

  }

  
  // Add account function 
  const addAccount = () => {
    signOut(auth).then(() => {
      toast.success("Signed out")
      navigate("/signup");

    }).catch((error) => {
      toast.error(error.message);
    });

  }



  return (
    <>
      {/* header  */}
      <header className="Dheader">
        <div className='header__nav'>


          <div className='nav__menu'>
            {logo}
            {/* home button  */}
            <div className='homebtn'>
              <NavLink to="/dashboard" className={activeLink}>
                Home
              </NavLink>
            </div>
              {/* search input  */}
            <div className='search__input'><input type='search'  name='searchInput' placeholder='Search' /> <img src={searchIcon} alt='search icon' /></div>
            {/* post icon  */}
              <div className='postIcon'>
            <NavLink to='/create'>
                <BsPlusCircleFill size={46}/>
            </NavLink>
              </div> 
            
                     {/* Chat icon  */}
            <div className="chatIcon"><img src={chatIcon} alt="chat" /></div>
            
            <div style={{display: 'flex'}}>
              {/* logged in user  */}
            <div className='user__name'>
              <NavLink to={`/profile/${currentUser && currentUser.displayName ? currentUser.displayName.replace(/\s+/g, "").toLowerCase() : ''}`} className={activeLink}>
                <img src={userImage} alt='user' />
                </NavLink>
              </div>
              
              {/* User Dropdown menu  */}
            <div className={`user__details ${isDropdownOpen ? 'open' : ''}`} >
              <button className='user__name'>
                <MdKeyboardArrowDown className='arrDown' size={44} onClick={toggleDropdown} />
                </button>
                
                      {/* Dropdown section  */}
              <div className={`dropdown ${isDropdownOpen ? 'open' : ''}`}>
                  <ul className='user__dropdown'>
                    {/* settings */}
                    <li className='settings'>
                      <div><MdArrowBackIos className='cursor-pointer' size={30} onClick={toggleDropdown}/></div>
                      <div className='text-center mx-auto'>Settings</div>
                    </li>

                    {/* account center */}
                    <li className='text-[24px]'>
                      <img src={search} className='mr-[1rem]' alt='icon' />
                      Account Center 
                    </li>
                      {/* Profile  */}
                    <li className='profile justify-between'>
                      <div><Link  to={`/profile/${currentUser && currentUser.displayName ? currentUser.displayName.replace(/\s+/g, "").toLowerCase() : ''}`}>Profile</Link></div>
                      <div><Link  to={`/profile/${currentUser && currentUser.displayName ? currentUser.displayName.replace(/\s+/g, "").toLowerCase() : ''}`}><MdArrowForwardIos size={30} /></Link></div>
                    </li>
                    {/* Personal information */}
                    <li className='profile justify-between'>
                      <div><Link  to={`/profile/${currentUser && currentUser.displayName ? currentUser.displayName.replace(/\s+/g, "").toLowerCase() : ''}/info`}>Personal Information</Link></div>
                      <div><Link  to={`/profile/${currentUser && currentUser.displayName ? currentUser.displayName.replace(/\s+/g, "").toLowerCase() : ''}/info`}><MdArrowForwardIos size={30} /></Link></div>
                    </li>
                    {/* Security and logins */}
                    <li className='profile justify-between'>
                      <div><Link  to={`/profile/${currentUser && currentUser.displayName ? currentUser.displayName.replace(/\s+/g, "").toLowerCase() : ''}`}>Security and logins</Link></div>
                      <div><Link  to={`/profile/${currentUser && currentUser.displayName ? currentUser.displayName.replace(/\s+/g, "").toLowerCase() : ''}`}><MdArrowForwardIos size={30} /></Link></div>
                    </li>

                    {/* actions*/}
                    <li className='text-[24px]'>
                      <img src={Action} className='mr-[1rem]' alt='icon' />
                      Actions 
                    </li>
                       {/* Signout link  */}
                    <li className='signout justify-between'>
                      <div><NavLink to="/" onClick={logoutUser}>Logout</NavLink></div>
                      <div><NavLink to="/" onClick={logoutUser}><MdArrowForwardIos size={30} /></NavLink></div>
                    </li>
                    {/* Add Account  */}
                    <li className='signout justify-between'>
                      <div><NavLink to="/signup" onClick={addAccount}>Add Account</NavLink></div>
                      <div><NavLink to="/signup" onClick={addAccount}><MdArrowForwardIos size={30} /></NavLink></div>
                    </li>

                    {/* help & policy*/}
                    <li className='text-[24px]'>
                      <img src={help} className='mr-[1rem]' alt='icon' />
                      Help and support 
                    </li>
                    {/* Help */}
                    <li className='profile justify-between'>
                      <div><Link  to=''>Help</Link></div>
                      <div><Link  to=''><MdArrowForwardIos size={30} /></Link></div>
                    </li>
                    {/* privacy policy */}
                    <li className='profile justify-between'>
                      <div><Link  to=''>Privacy Policy</Link></div>
                      <div><Link  to=''><MdArrowForwardIos size={30} /></Link></div>
                    </li>
                    
                  </ul>
                  
                </div>
                
              </div>

            </div>
            
          </div>


          
        </div>
          
        </header>
    </>
  )
}

export default DHeader