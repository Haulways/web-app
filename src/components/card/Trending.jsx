import React, { useContext} from 'react';
import { Card, CardActionArea, CardContent, Typography, IconButton, CardHeader, Skeleton  } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './card.css';
import { TrendingVideoBox } from '../videoPlayer/VideoPlayer';
import zigzagArr from "../../assets/zigzagArr.png";
import trendingImg from "../../assets/trendingImg.png";
import { ThemeContext } from '../context/ThemeProvider';
import { useGetList, useRedirect } from 'react-admin';


export const TrendingCard = ({ data }) => {
    const { theme } = useContext(ThemeContext);
    const redirect = useRedirect();

    const OpenAsce = (post) => {
        redirect(`/posts/${post.id}/show`, `posts`, post.id, {}, { open: true });
     }
    return (
        <>
            <div className="tablet:max-w-3xl w-full tablet:mx-auto laptop:max-w-6xl laptop:mx-auto " >
                <div className=' mb-[20px] '>
                    <div className="flex gap-x-3 items-center">
                        <h2 style={{ fontWeight: 600, fontSize: '18px' }}>
                            Trending Now
                        </h2>
                        <img className="h-[25px] w-[25px]" src={zigzagArr} style={{filter : theme === "light" ? "invert(0)" : "invert(1)"}} alt="trend" />
                    </div>
            
                    <img
                        style={{ width: 97, height: 8, margin: '-.2rem 0 0 1.5rem' }}
                        height="250"
                        src={trendingImg}
                        alt="splash"
                    />
                </div>
                <Card className='mobile:max-w-[92vw] tablet:max-w-[600px] laptop:max-w-[1000px] overflow-x-scroll store__card' sx={{ boxShadow: 'none', backgroundColor: theme === "light" ? "#fff" : "#222", marginTop: '20px', color: theme === "light" ? "#222" : "#fff", }}>
                    <div className='flex overflow-x-scroll gap-x-3  store__card'>
                        {data && data.map((post) => {
                       
                            const mediaUrl = post.media[0]; // Get the URL of the single media file
                            const isImage = mediaUrl.includes('.jpg') || mediaUrl.includes('.jpeg') || mediaUrl.includes('.png');
                            return (
                                <TrendingVideos post={post} isImage={isImage} mediaUrl={mediaUrl} OpenAsce={OpenAsce} />
                            )
                        })}
                    </div>
                </Card>
            </div>
        </>
    );
};

const TrendingVideos = ({ isImage, mediaUrl, post, OpenAsce }) => {
    const { data: views, total: totalViews, isLoading, error } = useGetList(
        'viewers', {filter: { video_id: post?.id }}
    );
    
    const formatFollowers = (count) => {
        if (count >= 1000) {
            return (count / 1000).toFixed(1) + 'K+';
        } else if (count >= 100 && count <= 999) {
            return (count / 100).toFixed(1) + 'H';
        } else {
            return count;
        }
    };

    const { theme } = React.useContext(ThemeContext);
    return (
        <div key={post.id} className='w-[140px]'>
    
            <Card className="card-with-background" sx={{ height: 210, borderRadius: '10px', boxShadow: 'none', width: '140px', backgroundColor: theme === "light" ? "#fff" : "rgba(68, 68, 68, 0.2)" }}>

                <CardHeader sx={{ position: 'absolute', zIndex: 999, padding: '0px', right: '.3rem', top: '.5rem' }}
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon sx={{ color: '#fff' }} />
                        </IconButton>
                    }
                />
                <CardActionArea sx={{ height: '100%', width: '100%' }} onClick={() => OpenAsce(post)}>
                    {/* <Link to={`/posts/${post.id}/show`}> */}
                    <CardContent className="card-content-wrapper" sx={{ position: 'relative', zIndex: 50, padding: '8rem 6px 0px ' }}>
                        <Typography variant='h2' sx={{ color: '#fff', fontSize: '11px', fontWeight: 500 }}>
                            {post.body}
                        </Typography>
                        <Typography sx={{ color: '#fff', fontSize: '11px', paddingTop: '10px' }}>
                            {formatFollowers(totalViews)} views
                        </Typography>
                    </CardContent>

                    <div className='background-image'>
                        {isImage ? (
                            <img
                                className='background-image'
                                src={mediaUrl}
                                alt="Image"
                                loading="lazy"
                            />
                        ) : (
                           
                            <TrendingVideoBox
                                posterUrl={post.posterUrl}
                                url={mediaUrl} className='background-image'
                            />
                            
                        )}
                    </div>
                                            
                    {/* </Link> */}
                                        
                                           
                                    
                </CardActionArea>
                                    
            </Card>
                        
        </div>
    );
};