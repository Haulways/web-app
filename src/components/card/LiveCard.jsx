import { Avatar, Card } from '@mui/material';
import './card.css';
import * as React from 'react';
import { Link } from 'react-router-dom';
import liveIcon from "../../assets/liveIcon.png";
import { AuthContext } from '../context/AuthContext';
import { JoinForm } from '../LiveComponents/joinForm/JoinForm';


export const LiveCard = ({ data, isConnected, open, handleClose, broadcasterImg }) => {
    const { currentUser } = React.useContext(AuthContext)
    const [openLive, setOpenLive] = React.useState(false);
    const [selectedLive, setSelectedLive] = React.useState(null);



    const handleOpenLive = (user) => {
        setOpenLive(true);
        setSelectedLive(user)
    };

    const handleCloseLive = () => {
        setOpenLive(false);
    };



    return (
        <>
            <Card className='mobile:max-w-[90vw] tablet:max-w-[600px]  laptop:max-w-[80vw] laptop:px-[1rem] overflow-x-scroll live--card feed--page' sx={{ boxShadow: 'none', }}>
                <div>
                    <img className='w-[50px] h-[22.48px] laptop:h-[30px] laptop:w-[60px]' src={liveIcon} alt='live-card' />
                </div>

                <div className='flex laptop:px-[1rem] gap-x-[15px] overflow-x-scroll live--card '>
                    {data && data.map((user) => (
                        <React.Fragment key={user.id}>
                            <div className='flex flex-col items-center mb-[20px]'>
                                <span className='live--avatar' onClick={() => handleOpenLive(user)}>
                                    {/* <Link to={`/${url}/${user.id}/show`}> */}
                                    <Avatar sx={{ width: '80px', height: "80px" }}
                                        src={user.created_by_photoURL}
                                    />
                                    {/* </Link> */}
                                </span>
                                <p className='text-[9px] leading-[1.2] font-[500] text-center laptop:text-[16px]'>
                                    {user.created_by_name}
                                </p>
                            </div>




                            <JoinForm openLive={openLive} handleCloseLive={handleCloseLive} currentUser={currentUser} broadcasterImg={broadcasterImg} coHost={selectedLive?.cohost_code} viewer={selectedLive?.viewer_code} host={selectedLive} open={open} handleClose={handleClose} room_id={selectedLive?.room_id} isConnected={isConnected} />


                        </React.Fragment>
                    ))}

                </div>

            </Card>
        </>
    );
};



export const VendorsCard = ({ data, url, theme }) => {



    return (
        <>
            <Card className=' mobile:max-w-[90vw] tablet:max-w-[600px]  laptop:max-w-[80vw] laptop:px-[1rem] overflow-x-scroll live--card feed--page' sx={{ boxShadow: 'none', }}>

                <div className='text-[8.4px] w-fit p-[4.2px] px-[11px] font-[600]  h-fit rounded-[4.2px]  mb-[5px] drop-shadow-md shadow ml-2 laptop:text-[18px] tablet:text-[16px]' style={{ backgroundColor: theme === "light" ? "#222" : "#fff", color: theme === "light" ? "#fff" : "#222", }}>
                    <p>Top Vendors</p>
                </div>

                <div className='flex laptop:px-[1rem] gap-x-[15px] overflow-x-scroll live--card '>
                    {data && data.map((user) => {
                        // console.log(user.store_id !== null ? (`/store/${user.store_id}/show`) : (`/${url}/${user.id}/show`))
                        return (
                            <React.Fragment key={user.id}>
                                <div className='flex flex-col items-center'>
                                    <span className='live--avatar w-[60px] h-[60px] laptop:w-[80px] laptop:h-[80px] tablet:w-[70px] tablet:h-[70px] border-none'>
                                        <Link to={user.store_id !== null ? (`/store/${user.store_id}/show`) : (`/${url}/${user.id}/show`)}>
                                            <Avatar
                                                sx={{
                                                    width: 60,
                                                    height: 60,
                                                    '@media (min-width:1024px)': {
                                                        width: 80,
                                                        height: 80,
                                                    },
                                                    '@media (min-width:641px) and (max-width:1023px)': {
                                                        width: 70,
                                                        height: 70,
                                                    },
                                                }}
                                                src={user.photoURL}
                                            />

                                        </Link>
                                    </span>
                                    <p className='text-[9px] laptop:text-[16px] leading-[1.2] font-[500]  text-center tablet:text-[14px]'>
                                        {user.displayName}
                                    </p>
                                </div>
                            </React.Fragment>)
                    })}

                </div>

            </Card>
        </>
    );
};