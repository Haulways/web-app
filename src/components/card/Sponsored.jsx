import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Avatar, CardHeader } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './card.css';
import '@splidejs/splide/dist/css/splide.min.css';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { VideoPlay } from '../videoPlayer/VideoPlayer';
import SAImg from "../../assets/SAdsImg.png";
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeProvider';

const randomColor = () => {
    // Generate a random RGB color
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 51) + 50;
    const lightness = Math.floor(Math.random() * 1) + 20;
    const hslColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    return hslColor;
};

export const SponsoredCard = ({ data }) => {
    const [isMuted, setIsMuted] = useState(true);
    const { theme } = useContext(ThemeContext);
    
   

    
    return (
        <>
            <Card className='mobile:w-[90vw]  tablet:max-w-[600px] laptop:max-w-[1000px] laptop:px-[1rem] ' sx={{ boxShadow: 'none', backgroundColor: theme === "light" ? "#fff" : "#222", marginTop: '20px', color: theme === "light" ? "#222" : "#fff", }}>

                <div>
                    <h2 className='text-[18px] font-[600]'>Sponsored Ads</h2>
                    <img className='w-[110px] h-[11px] mt-[-.2rem] ml-[.5rem]' src={SAImg} alt='sponsored' />
                </div>

                <div className='sponsored--slider mt-[10px]'>
                    {data && data.map((post) => {
                        
                    
                        const mediaUrl = post.media[0]; // Get the URL of the single media file
                        const isImage = mediaUrl.includes('.jpg') || mediaUrl.includes('.jpeg') || mediaUrl.includes('.png');
                        return (
                            <React.Fragment key={post.id}>
                       
                                <Card sx={{ minWidth: 310, boxShadow: 'none', backgroundColor: theme === "light" ? "#fff" : "rgba(68, 68, 68, 0.2)", color: theme === "light" ? "#222" : "#fff", }}>
                                    <CardHeader sx={{ padding: '15px 0px 5px 5px' }} className="Sponsored--header"
                                        avatar={
                                            <Avatar
                                                style={{ backgroundColor: randomColor(), height: 50, width: 50, fontSize: '20px', fontWeight: '700' }}
                                            >
                                                {post && post.name.split(' ').map(word => word[0]).join('')}
                                            </Avatar>
                                        }
                                        action={
                                            <IconButton aria-label="settings">
                                                <MoreVertIcon sx={{color: theme === "light" ? "#222" : "#fff",}} />
                                            </IconButton>
                                        }
                                        title={
                                            <Typography variant="h6" sx={{  fontWeight: '600', lineHeight: '1', fontSize: '15px' }}>
                                                {post.name}
                                            </Typography>
                                        }
                                        subheader={
                                            <Typography variant="subtitle2" sx={{  fontSize: '14px' }}>
                                                Store
                                            </Typography>
                                        }
                                    />
                                
                                        <div className='w-full h-[180px]  youtube--container overflow-hidden rounded-t-[10px] relative'>
                                   
                                            {isImage ? (
                                                <img
                                                    className={isImage ? ' object-cover h-full w-full' : ''}
                                                    height="140"
                                                    src={mediaUrl}
                                                    alt="media"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <VideoPlay post={post} url={mediaUrl} isMuted={isMuted} posterUrl={post.posterUrl} />
                                            )}
                                    
                                        </div>
                                    <CardContent sx={{  height: 50, backgroundColor: theme === "light" ? "#222" : "rgba(68, 68, 68, 0.2)", color: theme === "light" ? "#fff" : "#fff",  }} className='flex items-center w-full justify-between pt-2'>
                                        <Typography variant="body2" className='post--content  font-[500] '>
                                            Shop Now
                                        </Typography>

                                        <IconButton>
                                            <ChevronRightIcon sx={{ color: theme === "light" ? "#fff" : "#fff", }} />
                                        </IconButton>

                                    </CardContent>
                                </Card>
                            </React.Fragment>
                        )
                    })}
                </div>
            </Card>

        </>
    )
};