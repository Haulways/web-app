import { Avatar, CircularProgress, Fab, Grid, IconButton } from '@mui/material';
import React from 'react'
import { DFooter } from '../../components';
import { Link } from 'react-router-dom';
import { VendorsCard } from '../../components/card/LiveCard';
import { InfiniteList, WithListContext } from 'react-admin';
import { SearchBox } from '../../components/search/SearchBox';
import { ThemeContext } from '../../components/context/ThemeProvider';
import { Add } from '@mui/icons-material';

const Influencers = () => {
    const randomColor = () => {
        // Generate a random RGB color
        const hue = Math.floor(Math.random() * 360);
        const saturation = Math.floor(Math.random() * 51) + 50;
        const lightness = Math.floor(Math.random() * 1) + 20;
        const hslColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        return hslColor;
    };

    const { theme } = React.useContext(ThemeContext);

    return (
        <>
            <InfiniteList title='Influencers' resource='users' actions={false}
                sx={{
                    backgroundColor: theme === "light" ? "#fff !important" : "#222 !important",
                    color: theme === "light" ? "#222 !important" : "#fff !important",
                }}
            >
                <div className="feed--page">
                    <div className="relative pt-[0rem]">
               
        
                        <div className="pb-[10px] px-[14px] ">

                  
                    
                            {/* SearchBox  */}
                            <div className='py-[1.5rem] mx-auto laptop:max-w-sm tablet:max-w-sm'>
                                <SearchBox placeholder="Search for Influencers" />
                            </div>
                        </div>
                    </div>
                    <WithListContext render={({ isLoading, data }) => {
                        const influencers = data && data.filter(user => user.role === 'influencer');
                        if (!isLoading) {
                   
    
                            return (
                                <>
                                    <div className="">
                                        <VendorsCard data={influencers} theme={theme} url="users" />
                                    </div>
    
                                    <div className="flex justify-between items-center my-[20px] max-w-[335px] laptop:max-w-[1200px] mx-auto tablet:max-w-[800px] laptop:mt-[40px]">
                                        <p className="font-[600] text-[14px]  laptop:text-[18px] tablet:text-[16px]">
                                            All
                                        </p>
    
                                        <button className="rounded-full text-[10px] font-[600]   px-[4px] py-[2px] laptop:text-[15px] tablet:text-[14px]" style={{ border: theme === "light" ? "2px solid #222" : "2px solid #fff" }}>
                                            View all
                                        </button>
                                    </div>
    
                                    <Grid container className='pb-[4rem]' rowGap='20px' justifyContent='center'>
                        
                                        {influencers && influencers.map((user) => (
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
            </InfiniteList>
                
        </>
        
    );
};

export default Influencers