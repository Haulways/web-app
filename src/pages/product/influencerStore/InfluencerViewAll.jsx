import * as React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import backIcon from '../../../assets/hauls/backIcon.png';
import { ThemeContext } from '../../../components/context/ThemeProvider';
import { CardMedia, Grid, IconButton, Skeleton } from '@mui/material';
import { WithListContext } from 'react-admin';
import { DFooter } from '../../../components';

const InfluencerViewAll = () => {
    const location = useLocation();
    const { theme } = React.useContext(ThemeContext);
    const data = location.state
    const [isReady, setIsReady] = React.useState(false);
    const handleCanPlay = () => {
        setIsReady(true);
    };
    console.log(data)
    const navigate = useNavigate();
    const goToStore = () => {
        navigate('/influencerStore');
    };
    return (
        <div>
            <div className="relative  feed--page">
                <IconButton
                    onClick={goToStore}
                    aria-label="close"
                    className='absolute top-0 left-0'
                    sx={{
                        position: 'absolute',
   
                    }}
                >
                    <img className='w-[11.63px] h-[17.34px] invert' style={{ filter: theme === "light" ? "invert(1)" : "invert(0)" }} src={backIcon} alt='back' />
                </IconButton>
        
                <div className="pb-[30px] px-[8px] pt-[3.5rem]">
                    {/* Hauls Heading */}
                    <div className=' '>
                        <h2 className={`'font-[500] text-[14px] leading-[20px]' ${data[0].URL === 'diy' || data[0].URL === 'grwm' ? 'uppercase' : 'capitalize'}`}>{data[0].URL}</h2>
                        <p className='font-[400] text-[12px] '>Raine Goldie</p>
                    </div>
                </div>
            </div>

         
            {data && !data.length && <span>No Products</span>}
            {data && data.length > 0 && (
                <>
                                   
                    <Grid container className='pb-[1.5rem]  feed--page' spacing='5px'>
                        {data && data.map((product) => {
                            const mediaUrl = product.media[0]; // Get the URL of the single media file
                            const isImage = mediaUrl.includes('.jpg') || mediaUrl.includes('.jpeg') || mediaUrl.includes('.png');
  
                            return (
                                <Grid item xs={4} key={product.id} className="min-w-[100px]  flex-shrink-0 " >
                                    <div className="min-w-[100px] h-[100px] laptop:w-[100%] laptop:h-[250px] rounded-[5.374px] overflow-hidden relative">
             
                                        {isImage ? (
  
                                            <img src={mediaUrl} alt='user-post' className="object-cover w-full h-full" />
                                        ) : (
                                            <>
                                                {!isReady && <Skeleton variant="rectangular" width="100%" height='100%' />}
                                                <CardMedia
                                                    component="video"
                                                    src={mediaUrl}
                                                    playsInline={true}
                                                    className="object-cover h-full w-full"
                                                    loop
                                                    autoPlay
                                                    muted={true}
                                                    controls={false}
                                                    poster={product.posterUrl ? product.posterUrl : null}
                                                    onCanPlay={handleCanPlay}
                                                    style={{ display: isReady ? 'block' : 'none' }}
                                                />
                          
                                            </>
                                        )}
                                        <div className='absolute top-[5.6px] right-[6.23px] w-[4px] h-[15px]' style={{ filter: "invert(1)" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="4" height="15" viewBox="0 0 4 15" fill="none">
                                                <path d="M2 11C2.53043 11 3.03914 11.1844 3.41421 11.5126C3.78929 11.8408 4 12.2859 4 12.75C4 13.2141 3.78929 13.6592 3.41421 13.9874C3.03914 14.3156 2.53043 14.5 2 14.5C1.46957 14.5 0.96086 14.3156 0.585787 13.9874C0.210714 13.6592 0 13.2141 0 12.75C0 12.2859 0.210714 11.8408 0.585787 11.5126C0.96086 11.1844 1.46957 11 2 11ZM2 5.75C2.53043 5.75 3.03914 5.93437 3.41421 6.26256C3.78929 6.59075 4 7.03587 4 7.5C4 7.96413 3.78929 8.40925 3.41421 8.73744C3.03914 9.06563 2.53043 9.25 2 9.25C1.46957 9.25 0.96086 9.06563 0.585787 8.73744C0.210714 8.40925 0 7.96413 0 7.5C0 7.03587 0.210714 6.59075 0.585787 6.26256C0.96086 5.93437 1.46957 5.75 2 5.75ZM2 0.5C2.53043 0.5 3.03914 0.684374 3.41421 1.01256C3.78929 1.34075 4 1.78587 4 2.25C4 2.71413 3.78929 3.15925 3.41421 3.48744C3.03914 3.81563 2.53043 4 2 4C1.46957 4 0.96086 3.81563 0.585787 3.48744C0.210714 3.15925 0 2.71413 0 2.25C0 1.78587 0.210714 1.34075 0.585787 1.01256C0.96086 0.684374 1.46957 0.5 2 0.5Z" fill="black" />
                                            </svg>
                                        </div>
                                        <div className='absolute bottom-[6.34px] left-[5.93px] text-[6.374px] text-white'>
                                            20k views
                                        </div>
                                    </div>
                                    <div className='mt-[5.6px] text-[8.6px]'>
                                        <p>Single style video</p>
                                        <p>$10.00</p>
                                    </div>
                                               
                            
                                             
                                </Grid>
   
                            )
                        })
                        }
                    </Grid>
                                    
                </>
            )}
                  
                  <DFooter />
          
        </div>
    )
};

export default InfluencerViewAll