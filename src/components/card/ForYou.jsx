import { Card } from "@mui/material";
import './card.css';
import { NavLink } from "react-router-dom";
import forU from '../../assets/forU.png'
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";



export const ForYouCard = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <Card className='mobile:max-w-[90vw] tablet:max-w-[600px] laptop:max-w-[1000px]' sx={{ boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)', backgroundColor: theme === "light" ? "#fff" : "#222", marginTop: '20px', color: theme === "light" ? "#222" : "#fff", }}>
                
                <div className=" mb-[20px]">
                    <h2 className=" text-[18px] ml-[.5rem] font-[600]">For You</h2>
                    <img className="w-[86px] mt-[-.4rem] h-[11px]" src={forU} alt="For-u" />
                </div>

                <div className="forU__cards">
                    <NavLink>
                    <div className="bg-[#D17D41] text-white">Dinner</div>
                    </NavLink>

                    <NavLink>
                    <div className="bg-[#074942] text-white">Office</div>
                    </NavLink>

                    <NavLink>
                    <div className="bg-[#3D1556] text-white">Sport</div>
                    </NavLink>

                    <NavLink>
                    <div className="bg-[#20591B] text-white">Pyjamas</div>
                    </NavLink>

                    <NavLink to='/hauls'>
                    <div className="bg-[#1E2E56] text-white">Hauls</div>
                    </NavLink>

                    <NavLink to='/lookbook'>
                    <div className="bg-[#7E117A] text-white">Lookbook</div>
                    </NavLink>
                </div>

            </Card>
        </>
    );
};