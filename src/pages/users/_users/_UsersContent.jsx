import {EditGuesser, WithListContext, useGetList } from "react-admin";
import { SearchBox } from "../../../components/search/SearchBox";
import { Avatar,  CircularProgress, Grid, IconButton } from "@mui/material";
import * as React from 'react';
import { Profile } from "../..";
import { Link } from "react-router-dom";
import backIcon from '../../../assets/hauls/backIcon.png';
import LookRec from '../../../assets/lookbook/LookRec.png';
import { VendorsCard } from "../../../components/card/LiveCard";
import { DFooter } from "../../../components";
import { ThemeContext } from "../../../components/context/ThemeProvider";


export const UserListContent = () => {
    const { theme} = React.useContext(ThemeContext);

    const randomColor = () => {
        // Generate a random RGB color
        const hue = Math.floor(Math.random() * 360);
        const saturation = Math.floor(Math.random() * 51) + 50;
        const lightness = Math.floor(Math.random() * 1) + 20;
        const hslColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        return hslColor;
    };
    return (
        <>
            <div className="feed--page">
            
            <div className="relative pt-[1rem]">
                {/* <IconButton
                    aria-label="close"
                    className='absolute top-0 left-0'
                    button="true"
                    sx={{
                        position: 'absolute',
   
                    }}
                >
                    <img className='w-[11.63px] h-[17.34px] invert' style={{filter : theme === "light" ? "invert(1)" : "invert(0)"}} src={backIcon} alt='back' />
                </IconButton> */}
        
                <div className="pb-[10px] px-[14px] ">

                    {/* Hauls Heading */}
                    {/* <div className='flex flex-col w-[106px]   mx-auto'>
                        <h2 className='font-[600] text-[20px] text-center leading-[20px] '>Vendors</h2>
                        <img className='w-[106px] h-[11px]' style={{filter : theme === "light" ? "invert(0)" : "invert(1)"}} src={LookRec} alt='hauls' />
                    </div> */}
                    
                    {/* SearchBox  */}
                    <div className='my-[1.5rem]  laptop:max-w-sm tablet:max-w-sm'>
                        <SearchBox placeholder="Search for Vendors" />
                    </div>
                </div>
            </div>

            <WithListContext render={({ isLoading, data }) => {
                const vendors = data && data.filter(user => user.role === 'vendor');
                if (!isLoading) {
                   
    
                    return (
                        <>
                            <div className="">
                                <VendorsCard data={vendors} theme={theme} url="users" />
                            </div>
    
                            <div className="flex justify-between items-center my-[20px] max-w-[335px] laptop:max-w-[1200px] mx-auto tablet:max-w-[800px] laptop:mt-[40px]">
                                <p className="font-[600] text-[14px]  laptop:text-[18px] tablet:text-[16px]">
                                    Recent
                                </p>
    
                                <button className="rounded-full text-[10px] font-[600]   px-[4px] py-[2px] laptop:text-[15px] tablet:text-[14px]" style={{border : theme === "light" ? "2px solid #222" : "2px solid #fff"}}>
                                    View all
                                </button>
                            </div>
    
                            <Grid container className='pb-[4rem]' rowGap='20px' justifyContent='center'>
                        
                                {vendors && vendors.map((user) => (
                                    <Grid item xs={4} sm={4} md={4} lg={3} key={user.id}>
                                        <Link to={`/users/${user.id}/show`}>
                                            <div className='flex flex-col items-center gap-y-[5px]'>
                                
                                                <div className='w-[70px] h-[70px] rounded-full overflow-hidden laptop:w-[200px] laptop:h-[200px] tablet:w-[150px] tablet:h-[150px]'
                                                    style={{ backgroundColor: randomColor() }}
                                                >
                                                    <Avatar sx={{
                                                        width: 70,
                                                        height: 70,
                                                        '@media (min-width:1024px)': {
                                                            width: 200,
                                                            height: 200,
                                                        },
                                                        '@media (min-width:641px) and (max-width:1023px)': {
                                                            width: 150,
                                                            height: 150,
                                                        },
                                                    }}
                                                        src={user.photoURL}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-y-[1px] items-center justify-center">
                                                    <p className='text-[10px] leading-[1.2] font-[600]  text-center laptop:text-[18px] tablet:text-[16px]'>
                                                        {user.displayName}
                                                    </p>
                                                    <p className="text-[#7A7A7A] font-[500] text-[8px] laptop:text-[13px] tablet:text-[12px]">
                                                        {user.displayName} store
                                                    </p>
                                                    <p className="text-[#7A7A7A] font-[500] text-[8px] laptop:text-[13px] tablet:text-[12px]">
                                                        1.2k followers
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    );
                } else {
                    <div className='flex justify-center items-center mt-[40px]'>

                    <CircularProgress />
                </div>
                }
            }} />
                <DFooter />
                </div>
        </>
        
    );
};
 

export const UserCreateContent = () => ( 
    <>
    </>
);

export const UserEditContent = () => (
    <EditGuesser />
);


export const UserShowContent = () => {
    return (
        <>
            <Profile />
        </>
    )
};
