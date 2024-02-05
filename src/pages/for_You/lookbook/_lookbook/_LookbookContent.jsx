import { Link } from 'react-router-dom';
import { Dialog } from '@mui/material';
import * as React from "react";
import '../lookbook.css';
import { Signlepost } from '../../..';
import diyBg from "../../../../assets/lookbook/lookbook--bg.webp";
import diyBg1 from "../../../../assets/lookbook/lookbook.webp";
import backIcon from "../../../../assets/hauls/backIcon.png";
import slideIcon from "../../../../assets/hauls/slideIcon.png";


export const LookBookDialog = ({open, handleClickOpen}) => {
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
                        <button className='back--icon--look'>
                            <Link to='/dashboard'>
                                <img className='w-[12.63px] h-[19.34px]' src={backIcon} alt='back' />
                            </Link>
                        </button>

                        <div className='lookbook--bg'>
                            {/* lookbook big image */}
                            <div className='lookbook--bg--img'>
                                <img loading='lazy' className='w-[128px] h-[400px] ' src={diyBg1} alt='lookbook' />
                                <img loading='lazy' className='w-[200px] laptop:max-w-lg laptop:mt-[2rem]' src={diyBg} alt='hauls--img' />
                            </div>

                            {/* slide icon  */}
                            <button onDrag={handleClickOpen} onTouchMove={handleClickOpen}>
                                <img loading='lazy' className='w-[45px] h-[45px] slider--icon--lookbook' src={slideIcon} alt='slide' style={{
                                    transform: `translateX(${buttonPosition}px)`,
                                    transition: 'transform 0.3s ease-out',
                                }} />
                            </button>
                        </div>

                        
                   
        </Dialog>
    )
};



export const LookCreateContent = () => ( 
    <>
    </>
);

export const LookEditContent = () => (
    <>
    </>
);


export const LookShowContent = () => (
    <Signlepost />
);