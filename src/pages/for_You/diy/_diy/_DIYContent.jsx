import {  Grid } from "@mui/material";
import {  WithListContext} from "react-admin";
import * as React from 'react';
import '../diy.css';
import { Link } from 'react-router-dom';
import { Dialog } from '@mui/material';
import { Signlepost } from "../../..";
import diyRec from "../../../../assets/diy/diy--rectangle.png";
import diyBg from "../../../../assets/diy/diy--bg.webp";
import backIcon from "../../../../assets/hauls/backIcon.png";
import slideIcon from "../../../../assets/hauls/slideIcon.png";


export const DIYdialog = ({open, handleClickOpen}) => {
    const [buttonPosition, setButtonPosition] = React.useState(0);



    React.useEffect(() => {
        let animationFrameId;
        let animationStartTime;
   
        const animateButton = (timestamp) => {
            if (!animationStartTime) {
                animationStartTime = timestamp;
            }
   
            const elapsed = timestamp - animationStartTime;
            const newPosition = -Math.abs(10 * Math.sin(elapsed / 500));
   
            setButtonPosition(newPosition);
            animationFrameId = requestAnimationFrame(animateButton);
        };
   
        animationFrameId = requestAnimationFrame(animateButton);
   
        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    

    return (
       
       
        <Dialog
            fullScreen
            open={open}
            PaperProps={{ style: { backgroundColor: '#222222' } }}
        >
            
                        {/* back btn  */}
                        <button className='back--icon--diy'>
                            <Link to='/dashboard'>
                                <img className='w-[12.63px] h-[19.34px]' src={backIcon} alt='back' />
                            </Link>
                        </button>

                        {/* header  */}
                        <div className='diy--header'>
                            <p>DIY</p>
                            <img className='w-[100px] h-[11px]' src={diyRec} alt='diy' />
                        </div>


                        <div className='hauls--bg--img top-[40%]'>
                            {/* hauls big image */}
                            <img loading='lazy' className='min-w-[310px] max-w-[310px] mx-auto' src={diyBg} alt='hauls--img' />

                            {/* slide icon  */}
                            <button onDrag={handleClickOpen} onTouchMove={handleClickOpen}>
                                <img loading='lazy' className='w-[45px] h-[45px] slider--icon' src={slideIcon} alt='slide' style={{
                                    transform: `translateX(${buttonPosition}px)`,
                                    transition: 'transform 0.3s ease-out',
                                }} />
                            </button>
                        </div>

                  
        </Dialog>
    )
};


export const DIYCreateContent = () => ( 
    <>
    </>
);

export const DIYEditContent = () => (
    <>
    </>
);


export const DIYShowContent = () => (
    <Signlepost />
);