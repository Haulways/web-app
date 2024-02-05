import { CreateButton, TopToolbar } from "react-admin";
import React, { useContext, } from 'react';
import '../../components/dashboard/footer/DFooter.css';
import { NavLink} from 'react-router-dom';
import { AuthContext } from "../../components/context/AuthContext";
import { ThemeContext } from "../../components/context/ThemeProvider";
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import WebStoriesIcon from '@mui/icons-material/WebStories';

export const AdActions = () => (
    <TopToolbar>
        <CreateButton />
    </TopToolbar>
);




const AdFooter = () => {
    const { currentUser } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
  
    const getLinkTextColor = (isActive) => {
        if (isActive) return theme === 'light' ? 'text-[#222]' : 'text-[#fff]';
        return 'text-[#808080]'; // Inactive link color
    };
  
   
  
    return (
        <>
            <div className='Mfooter' >
                <ul className='footer__nav' style={{ backgroundColor: theme === "light" ? "#fff" : "#111" }}>
                    {/* adList */}
                    <li>
                        <NavLink
                            to="/ads"
                            className={({ isActive }) => getLinkTextColor(isActive)}
                        >
                            <WebStoriesIcon />
                        </NavLink>
                    </li>

  
                    {/* Ad analytics */}
                    <li>
                        <NavLink
                            to='/ad-stat'
                            className={({ isActive }) => getLinkTextColor(isActive)}
                        >
                            <AutoGraphIcon />
                        </NavLink>
                    </li>
  
                    {/* Ad settings */}
                    <li>
                        <NavLink
                            to={`/ad-setting`}
                            className={({ isActive }) => getLinkTextColor(isActive)}
                        >
                            <ManageAccountsIcon />
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    );
};
  
  export default AdFooter