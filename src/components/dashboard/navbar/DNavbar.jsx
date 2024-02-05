import React from 'react'
import { NavLink } from 'react-router-dom'
import './DNavbar.css'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";


const activeLink = ({ isActive }) => (isActive ? `${"active"}` : "");

const DNavbar = () => {
  return (
    <>
      <div className='Dnavbar__container'>
        <ul className='Dnavbar__links'>
          <li><NavLink to='' className={activeLink}>All</NavLink></li>
          <li><NavLink to='dinner' className={activeLink}>Dinner</NavLink></li>
          <li><NavLink to='office' className={activeLink}>Office</NavLink></li>
          <li><NavLink to='wedding' className={activeLink}>Wedding</NavLink></li>
          <li><NavLink to='pajamas' className={activeLink}>Pajamas</NavLink></li>
          <li><NavLink to='beach' className={activeLink}>Beach</NavLink></li>
          <li><NavLink to='casual' className={activeLink}>Casual</NavLink></li>
          <li><NavLink to='sport' className={activeLink}>Sport</NavLink></li>
        </ul>
        <MdOutlineKeyboardArrowRight className='right__arrow'/>
      </div>
    </>
  )
}

export default DNavbar