import * as React from 'react'
import diyRec from "../../assets/diy/diy--rectangle.png";
import backIcon from "../../assets/hauls/backIcon.png";
import skillbg from "../../assets/skill/Exclude.webp";
import slideIcon from "../../assets/hauls/slideIcon.png";
import { Dialog } from '@mui/material';
import { Link } from 'react-router-dom';

const SkillDialog = ({open, handleClickOpen}) => {
    
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
                        <button className='back--icon--grwm'>
                            <Link to='/dashboard'>
                                <img className='w-[12.63px] h-[19.34px]' src={backIcon} alt='back' />
                            </Link>
                        </button>

                        {/* header  */}
                        <div className='grwm--header'>
                            <p>SKILL CENTER</p>
                            <img className='w-[100px] h-[11px]' src={diyRec} alt='diy' />
                        </div>


                        <div className='hauls--bg--img top-[40%]'>
                            {/* hauls big image */}
                            <img loading='lazy' className='min-w-[236px] scale-150 max-w-[236px] h-[284px] mx-auto  laptop:mt-[2rem]' src={skillbg} alt='hauls--img' />

                            {/* slide icon  */}
                            <button onDrag={handleClickOpen} onTouchMove={handleClickOpen}>
                                <img loading='lazy' className='w-[45px] h-[45px] slider--icon--grwm' src={slideIcon} alt='slide' style={{
                                    transform: `translateX(${buttonPosition}px)`,
                                    transition: 'transform 0.3s ease-out',
                                }} />
                            </button>
                        </div>

        </Dialog>
    )
}

export default SkillDialog