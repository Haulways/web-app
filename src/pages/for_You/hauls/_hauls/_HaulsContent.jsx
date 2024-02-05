import {  Dialog, Grid } from "@mui/material";
import {  EditGuesser, WithListContext} from "react-admin";
import React from "react";

import { Link } from "react-router-dom";
import '../hauls.css';
import { Signlepost } from "../../..";
import diyRec from "../../../../assets/hauls/Hauls.png";
import diyBg from "../../../../assets/hauls/hauls-bg.webp";
import backIcon from "../../../../assets/hauls/backIcon.png";
import slideIcon from "../../../../assets/hauls/slideIcon.png";


export const HaulsDialog = ({open, handleClickOpen}) => {
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
                        <button button className='back--icon'>
                            <Link to='/dashboard'>
                                <img className='w-[12.63px] h-[19.34px]' src={backIcon} alt='back' />
                            </Link>
                        </button>

                        {/* header  */}
                        <div className='hauls--header'>
                            <img className='w-[73px] h-[20px]' src={diyRec} alt='hauls' />
                        </div>


                        <div className='hauls--bg--img'>
                            {/* hauls big image */}
                            <img loading='lazy' className='min-w-[330px] max-w-[340px] laptop:max-w-lg laptop:mt-[2rem] mx-auto' src={diyBg} alt='hauls--img' />

                            {/* slide icon  */}
                            <button  onDrag={handleClickOpen} onTouchMove={handleClickOpen}>
                                <img loading='lazy' className='w-[45px] h-[45px] slider--icon' src={slideIcon} alt='slide'
                                    style={{
                                        transform: `translateX(${buttonPosition}px)`,
                                        transition: 'transform 0.3s ease-out',
                                    }}
                                />
                            </button>
                        </div>
            

                        
                   
        </Dialog>

    )
                    
};


export const HaulsCreateContent = () => ( 
    <>
        
    </>
);

export const HaulsEditContent = () => (
    <EditGuesser />
);


export const HaulsShowContent = () => (
    <Signlepost />

);