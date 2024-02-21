import React, { useContext, useRef, useState } from 'react'
import './mPost.css';
import {  AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import './post.css';
import Comments from '../../components/comments/Comments';
import { DFooter } from '../../components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/context/AuthContext';
import { Avatar, IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { FullScreenDialog } from '../../components/dialog/DialogBox';
import {  ShowPageCarousels_1 } from '../../components/card/ShowCard';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { ShowVideoBox } from '../../components/videoPlayer/VideoPlayer';
import cartImg from "../../assets/cart.png";
import backIcon from "../../assets/postImg-Icons/back.png";
import saveIcon from "../../assets/postImg-Icons/save.png";
import fb from "../../assets/socials/fb.png";
import IG from "../../assets/socials/ig.png";
import commentIcon from "../../assets/chatlike.png";
import chat from "../../assets/commentIcon.png";
import { InfiniteList, WithListContext, useRedirect } from 'react-admin';
import { ThemeContext } from '../../components/context/ThemeProvider';
import { useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";
import { supabase } from '../../supabase/SupabaseConfig';


const MPost = ({ post, id, comments, formatFollowers, following, followers, unfollow, follow, toggleLike, liked, likes, savePost, cart }) => {
    const [showComment, setShowComment] = useState(false);
    const { currentUser } = useContext(AuthContext)
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const redirect = useRedirect();
    const navigate = useNavigate();
    const { theme } = useContext(ThemeContext);
    const location = useLocation();
    const [open, setOpen] = useState(location.state?.open || false);
    const [activeIndex, setActiveIndex] = useState(0);
    const splideRef = React.useRef(); // Create the ref
    const uuid = uuidv4();

    const addUniqueView = async (userId, videoId) => {
        const { data, error } = await supabase
          .from('viewers')
          .upsert(
            { user_id: userId, video_id: videoId, id: uuid, viewed_at: new Date(), object_viewed: post?.URL},
            { onConflict: ['user_id', 'video_id'] }
          );
    
        if (error) {
          console.error('Error adding/updating viewer:', error);
        } else {
          console.log('Viewer added/updated:', data);
        }
        };
      // Effect to handle adding a view when the component mounts
     useEffect(() => {
        if (currentUser && currentUser.id && post && post.id) {
          addUniqueView(currentUser.id, post.id);
          // fetchTotalViews(record.id);
        }
      }, [currentUser, post]);

    const options = {
        perPage: 1,
        type: 'slide',
        pauseOnHover: false,
        pagination: false,
        arrows: false,
        gap: '10px',
    };

    // Attach an event listener after the Splide instance is mounted
    React.useEffect(() => {
        if (splideRef.current) {
            // Access the Splide instance via the ref
            const splide = splideRef.current.splide;

            // Listen for the 'moved' event and update activeIndex
            splide.on('moved', (newIndex) => {
                setActiveIndex(newIndex);
            });

            // Cleanup the event listener when the component unmounts
            return () => {
                splide.off('moved');
            };
        }
    }, [setActiveIndex]);



    const shareIcon = (
        <svg width="20" height="18" style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} viewBox="0 0 34 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.3065 10.668H8.63985V7.33464H25.3065V10.668ZM26.9732 0.667969H25.3065C22.5882 0.667969 20.1982 1.98797 18.6782 4.0013H26.9732C28.8115 4.0013 30.3065 5.4963 30.3065 7.33464V10.668C30.3065 12.5063 28.8115 14.0013 26.9732 14.0013H18.6782C20.1999 16.0146 22.5899 17.3346 25.3065 17.3346H26.9732C28.7413 17.3346 30.437 16.6323 31.6872 15.382C32.9375 14.1318 33.6399 12.4361 33.6399 10.668V7.33464C33.6399 5.56653 32.9375 3.87083 31.6872 2.62059C30.437 1.37035 28.7413 0.667969 26.9732 0.667969ZM0.306519 7.33464V10.668C0.306519 12.4361 1.0089 14.1318 2.25914 15.382C3.50938 16.6323 5.20508 17.3346 6.97319 17.3346H8.63985C11.3565 17.3346 13.7482 16.0146 15.2682 14.0013H6.97319C5.13485 14.0013 3.63985 12.5063 3.63985 10.668V7.33464C3.63985 5.4963 5.13485 4.0013 6.97319 4.0013H15.2682C13.7482 1.98797 11.3582 0.667969 8.63985 0.667969H6.97319C5.20508 0.667969 3.50938 1.37035 2.25914 2.62059C1.0089 3.87083 0.306519 5.56653 0.306519 7.33464Z" fill="black" />
        </svg>

    );


    const toggleMute = () => {
        setIsMuted(!isMuted);
    };
    
    const handleClickOpen = () => {
        setOpen(true);
        setIsMuted(true);
    };
  
    const handleClose = (props) => {
        const { postId, resource, page } = props;
        console.log(page, resource, postId);
            
        setOpen(false);
        if (postId && resource && page) {
            redirect(page, resource, postId)
        }
    };


    const revealComment = () => {
        setShowComment((prev) => !prev);
    };

    const slideComment = showComment ? 'slide-in' : 'slide-out';
    
    const goToChat = () => {
        navigate('/chats', { state: { url: `http://haulway-demo-project.web.app${location.pathname}` } });
    };


    const mPostCarousel = {
        type: 'slide',
        pauseOnHover: false,
        pagination: true,
        arrows: false,
    };

    const posterUrl = post.posterUrl;
    

    return (
        <>
            <div className='Mobile__sPost' style={{ backgroundColor: theme === "light" ? "#fff" : "#222", color: theme === "light" ? "#222" : "#fff", }}>
                <div className='sPost__container'>
                    {/* top content starts here  */}
                    <div className='top__content'>
                        <div className='name-followers'>
                            <ul>
                                <li>
                                    <Link to={`/users/${post.uid}/show`}>
                                        <div className='initials'>
                                          
                                            <Avatar sx={{ width: '50px', height: "50px" }}
                                                src={post.photoURL}
                                            />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/users/${post.uid}/show`}>
                                        <span className='userName'>
                                            {post.name}
                                        </span>
                                    </Link>
                                    <span className='follower'>{formatFollowers(followers.length || 0)} Followers</span>
                                </li>
                            </ul>
                        </div>

                        <div className='follow-cart'>
                            <span>
                                <button className='follow' style={{ backgroundColor: theme === "light" ? "#222" : "#444", color: theme === "light" ? "#fff" : "#fff", }} onClick={following ? unfollow : follow}>{following ? 'Followed' : 'Follow'}</button>

                                <button className='cart relative'>
                                    <Link to="/cart">
                                        <img src={cartImg} alt='cart' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                                        <span className='absolute rounded-full top-[-.7rem] left-0 right-[-.7rem] flex justify-center items-center text-[8px] w-[15px] h-[15px]' style={{ backgroundColor: theme === "light" ? "#222" : "#444", color: theme === "light" ? "#fff" : "#fff", }}>
                                            {cart && cart.items ? cart.items.length : '0'}
                                        </span>
                                    </Link>
                                </button>
                            </span>
                        </div>
                    </div>
                    {/* top content ends here  */}
                    {/* post file container  */}
                    <div className='sPost__img ' >
                        {/* back icon  */}
                        <span>
                            <Link to={post.URL === 'posts' ? '/dashboard' : `/${post.URL}`}>
                                <img className='backIcon' src={backIcon} alt='save' />
                            </Link>
                        </span>

                        {/* save icon  */}
                        <span className='cursor-pointer' onClick={savePost}>
                            <img className='saveIcon' src={saveIcon} alt='save' />
                        </span>
                      
                        {/* post file  */}
                        <Splide options={mPostCarousel} className='mobile--post-splide'>
                            {Array.isArray(post.media) && post.media.map((mediaUrl, index) => {
                                const isImage = mediaUrl.includes('.jpg') || mediaUrl.includes('.jpeg') || mediaUrl.includes('.png');
                                return (
                                    <SplideSlide key={index}>
                                        
                                        {isImage ? (
                                            <img src={mediaUrl} alt={`Image ${index}`} onClick={handleClickOpen} />
                                        ) : (
                                            <div onClick={handleClickOpen}>

                                                <ShowVideoBox url={mediaUrl} posterUrl={index === 0 ? post.posterUrl : null} isMuted={isMuted} post={post} isPlaying={isPlaying} />
                                            </div>
                                        )}
                                       
                                        {!isImage && (
                                            <>
                                                <button className="mute-btn-show bottom-[2rem] right-[1.5rem]" onClick={toggleMute}>
                                                    {isMuted ?
                                                        <VolumeOffIcon />
                                                        :
                                                        <VolumeUpIcon />
                                                    }
                                                </button>
                            
                                
                                            </>
                                        )}

                                        
                                    </SplideSlide>
                                );
                            })}
                        </Splide>
                
                        
                    </div>

                    <div className='sPost__contents'>
                        {/* middle content starts here  */}
                        <div className='middle__content'>
                            <ul>
                                <li className='userName'>{post.name}</li>
                                <li className='socials__icons'>
                                    <ul>
                                        <li className='min-w-[25px] cursor-pointer' onClick={goToChat}>
                                            {shareIcon}
                                        </li>
                                        <li>
                                            <img src={fb} alt='share' />
                                        </li>
                                        <li>
                                            <img src={IG} alt='share' />
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                            {post.body && (
                                <p className="post__body">{post.body}</p>
                            )}
                            <div className='post__likes'>
                                <ul className='comment__likes'>
                                    <li>
                                        <ul className='comment__left1'>
                                            <IconButton sx={{ paddingLeft: '0px !important', paddingRight: '0px !important' }} onClick={toggleLike} aria-label="Like" className='likeBtn p-0'>
                                                <img src={commentIcon} alt='' className='likeImg' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                                                {liked ? (
                                                    <AiFillHeart color={theme === "light" ? "#222" : "#fff"} className='like' />
                                                ) : (
                                                    <AiOutlineHeart color={theme === "light" ? "#222" : "#fff"} className='like' />
                                                )}
                                            </IconButton>
                                            
                                            <div className="flex items-center gap-x-1">
                                                <span>
                                                    {likes.length || 0}
                                                </span>
                                                
                                                {likes.length < 2 ? (
                                                    <span>like</span>
                                                ) : (
                                                    <span>likes</span>
                                                )}
                                            </div>
                                        </ul>
                                    </li>
                                    <li>
                                        <ul className='comment__left2'>
                                            <IconButton onClick={revealComment} aria-label="Comment">
                                                <img src={chat} className='comment__icons' alt='commentIcon' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                                            </IconButton>
                                            <div>{comments.length || 0}</div>
                                        </ul>
                                    </li>
                                </ul>

                                {/* Add to Cart */}
                               
                            </div>
                        </div>
                        {/* middle content ends here  */}
                  
                    </div>
                </div>

                {/* Post carousel container */}
                {post.taggedProducts && post.taggedProducts.length > 0 && (
                    <h2 className='mt-[20px] font-[500]  text-[14px] px-[16px]'>Featured products</h2>
                )}
                <div className='showCard--post max-w-[92vw]'>
                    <Splide ref={splideRef} options={options} className='w-full' >
                        {Array.isArray(post.taggedProducts) && post.taggedProducts.map((mediaUrl, index) => (
                            <SplideSlide key={index} className='p-[3px]'>
                                <ShowPageCarousels_1
                                    index={index}
                                    activeIndex={activeIndex}
                                    post={post}
                                    mediaUrl={mediaUrl}
                                />
                            </SplideSlide>
                        ))}
                    </Splide>
                          
                </div>

                <InfiniteList resource='likes' actions={false} title=' '
                    sx={{
                        '& .MuiToolbar-root': {
                            minHeight: '0px !important',
                            backgroundColor: 'transparent !important',
                            color: '#fff'
                        },
                        '& .RaList-content': {
                            backgroundColor: 'transparent !important',
                            color: '#fff'
                                                                    
                        },
                        backgroundColor: 'transparent !important',
                        color: '#fff'
                    
                    }}
             
                >
                    <WithListContext render={({ isLoading, data }) => (
                        !isLoading && (
                            <>
                                <FullScreenDialog liked={liked} post={post} open={open} handleClose={handleClose} postId={id} currentUser={currentUser} savePost={savePost} toggleLike={toggleLike} likes2={data} />
                            </>
                        ))} />
                </InfiniteList>
                


                {/* last content/comment section starts here  */}
                {showComment && (
                    <>
                        <div onClick={revealComment} className='Mpopup__overlay '></div>
                        <div className={`mobile__comment__box ${slideComment}`}>
                            <Comments comments={comments} setShowComment={setShowComment} showComment={showComment} postId={id} />
                        </div>
                    </>
                )}
                {/* last content/comment section ends here  */}

            </div>
            <DFooter />
          
        </>
    );
};

export default MPost