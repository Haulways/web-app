import React, { useContext, } from 'react';
import './DFooter.css';
import { AuthContext } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';
import homeIcon from '../../../assets/bottomAppBar/homeIcon.png';
import searchIcon from '../../../assets/bottomAppBar/searchIcon.png';
import addIcon from '../../../assets/bottomAppBar/AddIcon.png';
import chatIcon from '../../../assets/bottomAppBar/chatIcon.png';
import { Avatar } from '@mui/material';
import { ThemeContext } from '../../context/ThemeProvider';
import { useStore } from "react-admin";


const activeLink = ({ isActive }) => (isActive ? `${"active"}` : "");

const DFooter = () => {
  const { currentUser } = useContext(AuthContext);
  const { theme} = useContext(ThemeContext);
  const [g_user, setG_User] = useStore("user");


  // console.log(currentUser.user_metadata.avatar_url);


  return (
    <>
      <div className='Mfooter' >
        <ul className='footer__nav' style={{backgroundColor: theme === "light" ? "#fff" : "#111"}}>
          {/* dashboard */}
          <li className='Appbar__icon' style={{filter: theme === "light" ? "invert(0)" : "invert(1)"}}>
            <NavLink to="/dashboard" className={activeLink}>
              <img src={homeIcon} alt='home' />
            </NavLink>
          </li>
          {/* search */}
          <li className='Appbar__icon' style={{filter: theme === "light" ? "invert(0)" : "invert(1)"}}>
            <NavLink to='/search'>
              <img src={searchIcon} alt='search' />
            </NavLink>
          </li>

          {/* Create Post */}
          <li className='Appbar__icon add__icon' style={{filter: theme === "light" ? "invert(0)" : "invert(1)"}}>
            <NavLink to='/posts/create'>
              <img src={addIcon} alt='add' />
            </NavLink>
          </li>

          {/* Chat */}
          <li className='Appbar__icon' style={{filter: theme === "light" ? "invert(0)" : "invert(1)"}}>
            <NavLink to='/chats'>
              <img src={chatIcon} alt='chat' />
            </NavLink>
          </li>

          {/* User profile */}
          <li>
            <NavLink to={`/users/${g_user?.id}/show`} className={activeLink}>
              <div className='footerImg'>
                <Avatar sx={{ width: '25px', height: "25px" }}
                  src={g_user?.photoURL}
                />
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default DFooter