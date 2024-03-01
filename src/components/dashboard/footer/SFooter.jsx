import React, { useContext, } from 'react';
import './DFooter.css';
import { AuthContext } from '../../context/AuthContext';
import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';
import homeIcon from '../../../assets/bottomAppBar/homeIcon.png';
import { Avatar } from '@mui/material';
import { ThemeContext } from '../../context/ThemeProvider';
import { useStore } from "react-admin";

const activeLink = ({ isActive }) => (isActive ? `${"active"}` : "");

const SFooter = () => {
  const { currentUser } = useContext(AuthContext);
  const { theme} = useContext(ThemeContext);
  

  const resolved = useResolvedPath('/downloads');
  const match = useMatch({ path: resolved.pathname, end: true });

  const fillColor = match ? (theme === 'light' ? '#333' : '#fff') : '#808080';

  // console.log(currentUser.user_metadata.avatar_url);

  const saved = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="18" viewBox="0 0 24 18" fill={fillColor}>
      <path d="M8.86662 7.31308L7.60355 6.05001C7.51491 5.96137 7.41889 5.8949 7.31548 5.85058C7.21207 5.80626 7.10482 5.7841 6.99373 5.7841C6.88323 5.7841 6.77273 5.80626 6.66223 5.85058C6.55173 5.8949 6.45187 5.96137 6.36264 6.05001C6.20014 6.21251 6.11889 6.41933 6.11889 6.67046C6.11889 6.9216 6.20014 7.12842 6.36264 7.29092L8.24616 9.1966C8.42343 9.37387 8.63025 9.46251 8.86662 9.46251C9.10298 9.46251 9.3098 9.37387 9.48707 9.1966L13.6087 5.42956C13.6087 5.19319 13.5939 4.96421 13.5643 4.74262C13.5348 4.52103 13.4388 4.32899 13.2763 4.16649C13.099 3.98921 12.8883 3.90058 12.6443 3.90058C12.4003 3.90058 12.1899 3.98921 12.0132 4.16649L8.86662 7.31308ZM0.069458 15.9773V14.2046H18.6831C18.9342 14.2046 19.1449 14.2896 19.3151 14.4598C19.4853 14.63 19.57 14.8404 19.5695 15.0909C19.5695 15.3421 19.4844 15.5527 19.3142 15.7229C19.144 15.8931 18.9336 15.9779 18.6831 15.9773H0.069458ZM2.72855 13.3182C2.24105 13.3182 1.82357 13.1445 1.47612 12.797C1.12866 12.4496 0.955231 12.0324 0.955822 11.5455V1.79546C0.955822 1.30796 1.12955 0.890487 1.477 0.543032C1.82446 0.195578 2.24164 0.0221462 2.72855 0.0227371H16.9104C17.3979 0.0227371 17.8153 0.196464 18.1628 0.543919C18.5103 0.891373 18.6837 1.30856 18.6831 1.79546V11.5455C18.6831 12.033 18.5094 12.4504 18.1619 12.7979C17.8145 13.1453 17.3973 13.3188 16.9104 13.3182H2.72855ZM2.72855 11.5455H16.9104V1.79546H2.72855V11.5455Z" fill={fillColor} />
    </svg>
  );

  return (
    <>
      <div className='Mfooter mb-[-7px]' >
        <ul className='footer__nav' style={{backgroundColor: theme === "light" ? "#fff" : "#111"}}>
          {/* dashboard */}
          <li className='Appbar__icon' style={{filter: theme === "light" ? "invert(0)" : "invert(1)"}}>
            <NavLink to="/skill-center" className={activeLink}>
              <img src={homeIcon} alt='home' />
            </NavLink>
          </li>
         


          {/* Chat */}
          <li className='h-[21.35px] w-[22px] flex-shrink-0 ' >
            <NavLink to='/downloads'>
             {saved}
            </NavLink>
          </li>

          {/* User profile */}
          <li>
            <NavLink to={`/users/${currentUser?.uid}/show`} className={activeLink}>
              <div className='footerImg'>
                <Avatar sx={{ width: '25px', height: "25px" }}
                  src={currentUser?.photoURL}
                />
              </div>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SFooter