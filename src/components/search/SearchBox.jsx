import './search.css';

import search from "../../assets/searchIcon.png";
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeProvider';

export const SearchBox = ({ placeholder }) => {
    const { theme } = useContext(ThemeContext);
    
    return (
        <>
            {/* Search box */}
            <div className='general search--box' style={{filter : theme === "light" ? "invert(0)" : "invert(1)"}}>
                    <input className='search--input' type='search' placeholder={placeholder}  />
                    <img width='20' height='20' src={search} alt='search' />
                </div>
        </>
    )
};


