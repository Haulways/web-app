import * as React from 'react';
import {  useEffect } from 'react';
import { AppBar,  } from 'react-admin';
import {  Stack, Typography } from '@mui/material';
import { ThemeContext } from '../context/ThemeProvider';
import haulRec from "../../assets/hauls/haulsRect.png";
import grwmRec from "../../assets/grwm/grwmRec.png";
import lookRec from "../../assets/lookbook/LookRec.png";
import diyRec from "../../assets/diy/diyRec.png";
import { useLocation } from 'react-router-dom';




export const MyAppBar = (props) => {
    const { theme } = React.useContext(ThemeContext);
    const location = useLocation();
    const { title } = props;
    const [tog, setTog] = React.useState(false);
    const titleRef = React.useRef()
    
    console.log(location.pathname.split('/')[1]);
    
    useEffect(() => {
        // setTog(false);
        if (titleRef.current.children.length > 0) {
            setTog(true)
        }
        else {
            setTog(false)
        }
    })
    return <AppBar
        sx={{
            backgroundColor: theme === "light" ? "#fff" : "#222",
            color: theme === "light" ? "#222" : "#fff",
            boxShadow: 'none',
            "& .RaAppBar-title": {
                flex: 1,
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
            },
        }}
        {...props}
        
    >
        <Stack direction='column' width='100%' spacing={0} alignItems='center' justifyContent='center'>
            {/* {
                !tog ?
                (
                    <>
                    <img src={Logo} alt="Logo" height={40} />
                    </>
                ) : (
                    <>
                    <img src={Icon} alt="Icon" height={40} />
                    </>
                )
            } */}
            <Typography
                variant="h6"
                color="inherit"
                // className={classes.title
                id="react-admin-title"
                ref={titleRef}
                sx={{
                    // flex: 1,
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                }}
            />
            {location.pathname.split('/')[3] === "show" || location.pathname.split('/')[1] === 'dashboard' || location.pathname.split('/')[1] === 'orders' || location.pathname.split('/')[1] === 'cart' || location.pathname.split('/')[1] === 'catalogue' || location.pathname.split('/')[1] === 'skill' || location.pathname.split('/')[1] === 'makeup' || location.pathname.split('/')[1] === 'craft' || location.pathname.split('/')[1] === 'fashion' || location.pathname.split('/')[1] === 'cosmetics'  || location.pathname.split('/')[1] === 'history' || location.pathname.split('/')[1] === 'courses' || location.pathname.split('/')[1] === 'influencerStore' || location.pathname.split('/')[1] === 'store' || location.pathname.split('/')[1] === 'contract' ? (
                null
            ) : (
                <>{(() => {
                    switch (location.pathname.split('/')[1]) {
                        case 'hauls':
                            return <img className='w-[106px] h-[11px] mt-[-.5rem]' src={haulRec} style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} alt='hauls' />
                        case 'grwm':
                            return <img className='w-[106px] h-[11px] mt-[-.5rem]' src={grwmRec} style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} alt='hauls' />
                        case 'lookbook':
                            return <img className='w-[106px] h-[11px] mt-[-.5rem]' src={lookRec} style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} alt='hauls' />
                        case 'diy':
                            return <img className='w-[106px] h-[11px] mt-[-.5rem]' src={diyRec} style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} alt='hauls' />
                        default:
                            return <img className='w-[106px] h-[11px] mt-[-.5rem]' src={haulRec} style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} alt='hauls' />
                    }
                
                })()}</>
            )}

            
        </Stack>
        {/* <span className={classes.spacer} /> */}
    </AppBar>
};


// export const BottomAppBar = () => {
//     const bottomAppBarStyle = {
//         top: 'auto',
//         bottom: 0,
//         position: 'fixed',
//         width: '100%',
//         zIndex: 999,
//     };

//     return (
//         <>
//             <BottomNavigation style={bottomAppBarStyle}>
//                 <BottomNavigationAction label="Dashboard" icon={<Dashboard />} />
//                 <BottomNavigationAction label="List" icon={<ListAlt />} />
//                 <BottomNavigationAction label="Profile" icon={<Person />} />
//                 {/* Add more actions as needed */}
//             </BottomNavigation>
//         </>
//     );
// }