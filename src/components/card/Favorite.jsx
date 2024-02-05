import React from 'react';
import { Card } from '@mui/material';
import './card.css';
import favoriteImg from "../../assets/favoriteImg.png";
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeProvider';


const randomColor = () => {
    // Generate a random RGB color
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 51) + 50;
    const lightness = Math.floor(Math.random() * 1) + 20;
    const hslColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    return hslColor;
};

export const FavoriteCard = ({users}) => {
    const { theme } = useContext(ThemeContext);

    
   
    
    return (
        <>
            {users && (

                <Card className='mobile:max-w-[90vw] tablet:max-w-[600px] laptop:max-w-[1000px] laptop:px-[1rem] overflow-x-scroll store__card' sx={{ boxShadow: 'none', backgroundColor: theme === "light" ? "#fff" : "#222", color: theme === "light" ? "#222" : "#fff",}}>
                    <div>
                        <h2 className='text-[18px] font-[600]'>Favorite Stores</h2>
                        <img className='w-[110px] h-[11px] mt-[-.2rem] ml-[.5rem]' src={favoriteImg} alt='favorite-stores' />
                    </div>
                    <div className='flex laptop:px-[1rem] gap-x-[30px] store__card overflow-x-scroll px-[5px] pb-[5px]' >
                        {users?.map((user) => (
                            <React.Fragment key={user.id}>
                                <div className='flex flex-col items-center'>
                                
                                    <span className='favorite__avatar'
                                        style={{ backgroundColor: randomColor() }}
                                    >
                                        {user?.displayName && user.displayName.split(' ').map(word => word[0]).join('')}
                                    </span>
                                    <p className='text-[15px] leading-[1.2] font-[600] text-center'>
                                        {user.displayName}
                                    </p>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
           
                </Card>
            )}

        </>
    );
};