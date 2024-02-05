import {  CardMedia, CircularProgress, IconButton, Skeleton } from "@mui/material";
import { Create, EditGuesser, WithListContext,} from "react-admin";
import { ThemeContext } from "../../../../components/context/ThemeProvider";
import { useContext, useState } from "react";
import backIcon from "../../../../assets/hauls/backIcon.png";
import { CreatePost, SFooter } from "../../../../components";
import { Link, useNavigate } from "react-router-dom";
import SkillCenterShow from "../../SkillCenterShow";





export const CraftListContent = () => {
    const { theme } = useContext(ThemeContext);
    const [isReady, setIsReady] = useState(false);
    const navigate = useNavigate();
    const goToStore = () => {
        navigate('/skill-center', { state: { open: false } });
    };

    const handleCanPlay = () => {
      setIsReady(true);
    };

    return (
        <>
            <div className="relative  feed--page">
                <IconButton
                    onClick={goToStore}
                    aria-label="close"
                    className='absolute top-[0rem] left-0'
                    sx={{
                        position: 'absolute',
   
                    }}
                >
                    <img className='w-[11.63px] h-[17.34px] invert' style={{ filter: theme === "light" ? "invert(1)" : "invert(0)" }} src={backIcon} alt='back' />
                </IconButton>
        
                <div className="pb-[30px] px-[8px] pt-[3.5rem]">
                    {/* Hauls Heading */}
                    <div className=' '>
                        <h2 className='font-[500] text-[14px] leading-[20px]'>Craft</h2>
                        <p className='font-[400] text-[12px] '>Skill center</p>
                    </div>
                </div>
            </div>
        <WithListContext render={({ isLoading, data }) => (
            
            !isLoading ? (
                <div className=" feed--page ">
                        <div className='pb-[2rem] grid flex-wrap grid-cols-3 gap-y-[20px] gap-x-[10px] place-self-center  mx-auto'  >
      
                        {data?.sort((a, b) => b.timestamp - a.timestamp).filter(post => post.categories.includes('craft')).map((post) => {
                            const mediaUrl = post.media[0]; // Get the URL of the single media file
                            const isImage = mediaUrl.includes('.jpg') || mediaUrl.includes('.jpeg') || mediaUrl.includes('.png');
                            return (
      
                                <div key={post.id} className='w-[100%] relative pt-[10px]' >
                                     <div className="absolute w-[93%] h-[52px] laptop:h-[250px] tablet:h-[150px] left-[3px] right-0 top-[5px] bg-[#D9D9D9] rounded-[10px]"></div>
                                    <div className="min-w-[100%] h-[70px] laptop:h-[250px] tablet:h-[150px] rounded-[6px] overflow-hidden relative">
                                        <Link to={`/courses/${post.id}/show`}>
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
                                                    poster={post.posterUrl ? post.posterUrl : null}
                                                    onCanPlay={handleCanPlay}
                                                    style={{ display: isReady ? 'block' : 'none' }}
                                                />
                                                <div className='absolute bg-[#222] p-[2px] right-[7px]  bottom-[7px] rounded-[2px] flex items-center gap-x-[2px] text-[5px] text-white'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="6" viewBox="0 0 8 6" fill="none">
                                                        <path d="M3.59462 3.30078H1H3.59462ZM3.59462 4.59809H1H3.59462Z" fill="white" />
                                                        <path d="M3.59462 3.30078H1M3.59462 4.59809H1" stroke="white" stroke-width="0.5" stroke-linecap="round" />
                                                        <path d="M6.1487 3.34009C6.68514 3.64982 6.95304 3.80485 6.99261 4.02799C7.00246 4.08388 7.00246 4.14107 6.99261 4.19696C6.95336 4.42075 6.68514 4.57546 6.1487 4.88486C5.61227 5.1946 5.34437 5.34963 5.13096 5.27211C5.07764 5.25265 5.02813 5.224 4.98469 5.18746C4.81085 5.04151 4.81085 4.73211 4.81085 4.11264C4.81085 3.49317 4.81085 3.18344 4.98469 3.03782C5.02816 3.0014 5.07766 2.97286 5.13096 2.95349C5.34405 2.87565 5.61227 3.03068 6.1487 3.34009Z" fill="white" stroke="white" stroke-width="0.5" />
                                                        <path d="M1 0.707031H4.40544H1ZM6.51358 0.707031H5.78384H6.51358ZM6.51358 2.00434H3.10813H6.51358ZM1 2.00434H1.72974H1Z" fill="white" />
                                                        <path d="M1 0.707031H4.40544M6.51358 0.707031H5.78384M6.51358 2.00434H3.10813M1 2.00434H1.72974" stroke="white" stroke-width="0.5" stroke-linecap="round" />
                                                    </svg>
                                                    <p>10</p>
                                                </div>
                                            </>
                                        )}
                                        </Link>
                                    </div>
                  
                                    <div className='flex justify-between mt-[10px]'>
                                        <div>
                                            <p className='text-[10px] laptop:text-[15px] body'>{post.body}</p>
                                            <p className='text-[8px] laptop:text-[13px] text-[#636363]'>{post.name} - <span className={` ${post.URL === 'diy' || post.URL === 'grwm' ? 'uppercase' : 'capitalize'}`}>{post.URL}</span></p>
                                        </div>
                                        <div style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="4" height="15" viewBox="0 0 4 15" fill="none">
                                                <path d="M2 11C2.53043 11 3.03914 11.1844 3.41421 11.5126C3.78929 11.8408 4 12.2859 4 12.75C4 13.2141 3.78929 13.6592 3.41421 13.9874C3.03914 14.3156 2.53043 14.5 2 14.5C1.46957 14.5 0.96086 14.3156 0.585787 13.9874C0.210714 13.6592 0 13.2141 0 12.75C0 12.2859 0.210714 11.8408 0.585787 11.5126C0.96086 11.1844 1.46957 11 2 11ZM2 5.75C2.53043 5.75 3.03914 5.93437 3.41421 6.26256C3.78929 6.59075 4 7.03587 4 7.5C4 7.96413 3.78929 8.40925 3.41421 8.73744C3.03914 9.06563 2.53043 9.25 2 9.25C1.46957 9.25 0.96086 9.06563 0.585787 8.73744C0.210714 8.40925 0 7.96413 0 7.5C0 7.03587 0.210714 6.59075 0.585787 6.26256C0.96086 5.93437 1.46957 5.75 2 5.75ZM2 0.5C2.53043 0.5 3.03914 0.684374 3.41421 1.01256C3.78929 1.34075 4 1.78587 4 2.25C4 2.71413 3.78929 3.15925 3.41421 3.48744C3.03914 3.81563 2.53043 4 2 4C1.46957 4 0.96086 3.81563 0.585787 3.48744C0.210714 3.15925 0 2.71413 0 2.25C0 1.78587 0.210714 1.34075 0.585787 1.01256C0.96086 0.684374 1.46957 0.5 2 0.5Z" fill="black" />
                                            </svg>
                                        </div>
                                    </div>
            
                                </div>
                            )
                        })}
                    </div>
                    
                </div>
            ) : (
                <div className='spinner absolute top-0 bottom-0 left-0 right-0 my-0 mx-0'>
                    <CircularProgress sx={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                </div>
            ))}
            />
            <SFooter />
            
       </>
       
    );
};


export const CraftCreateContent = () => ( 
    <Create>
        <CreatePost title='Course' collectionName="courses"/>
    </Create>
);

export const CraftEditContent = () => (
    <EditGuesser />
);


export const CraftShowContent = () => {
    return (
        
        <SkillCenterShow/>

    )
};
