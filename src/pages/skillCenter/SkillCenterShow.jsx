import * as React from 'react'
import { ThemeContext } from '../../components/context/ThemeProvider';
import { AuthContext } from '../../components/context/AuthContext';
import { Link } from 'react-router-dom';
import { InfiniteList, WithListContext, useGetList, useRecordContext } from 'react-admin';
import { Avatar, Dialog } from '@mui/material';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import shareIcon from "../../assets/socials/share.png";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { FaPlay, FaPause } from "react-icons/fa";
import IG from "../../assets/socials/ig.png";
import { FullScreenVideoBox, SkillShowVideoBox } from '../../components/videoPlayer/VideoPlayer';
import { supabase } from '../../supabase/SupabaseConfig';
import { ShowPageCarousels_1 } from '../../components/card/ShowCard';
import { SFooter } from '../../components';
import { ShortReviews } from '../../components/reviews/ShortReviews';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { v4 as uuidv4 } from "uuid";

const SkillCenterShow = () => {
    const record = useRecordContext();
    const [post, setPost] = React.useState(null);
    const [following, setFollowing] = React.useState(false);
    const [followers, setFollowers] = React.useState([]);
    const [liked, setLiked] = React.useState(false);
    const [isMuted, setIsMuted] = React.useState(true);
    const [isPlaying, setIsPlaying] = React.useState(true);
    const [likes, setLikes] = React.useState([]);
    const { currentUser } = React.useContext(AuthContext);
    const { theme } = React.useContext(ThemeContext);
    const [selectedTab, setSelectedTab] = React.useState("video");
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [viewsCount, setViewsCount] = React.useState(0);
    const uuid = uuidv4();

    const { data: views, total: totalViews, isLoading, error } = useGetList(
        'viewers', {filter: { video_id: record?.id }}
      );

    // console.log(totalViews);

    // Function to add a unique view
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

   
    
     // Function to fetch the total unique views
  const fetchTotalViews = async (videoId) => {
    const { count } = await supabase
      .from('viewers')
      .select('*', { count: 'exact' })
      .eq('video_id', videoId);

    setViewsCount(count);
  };

     // Effect to handle adding a view when the component mounts
  React.useEffect(() => {
    if (currentUser && currentUser.id && record && record.id) {
      addUniqueView(currentUser.id, record.id);
      fetchTotalViews(record.id);
    }
  }, [currentUser, record]);

    const toggleFullScreen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };
       

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    }
    
    React.useEffect(() => {
        if (record) {
            setPost(record)
        }
    }, [record]);

    // formatting the number of followers
    const formatFollowers = (count) => {
        if (count >= 1000) {
            return (count / 1000).toFixed(1) + 'K+';
        } else if (count >= 100 && count <= 999) {
            return (count / 100).toFixed(1) + 'H';
        } else {
            return count;
        }
    };

    const follow = async () => {
        try {
            const { error } = await supabase
                .from('followers')
                .insert({
                    followed_id: post.uid,
                    follower_id: currentUser.uid,
                });
    
            const { error: Error } = await supabase
                .from('following')
                .insert({
                    followed_id: post.uid,
                    follower_id: currentUser.uid,
                });
    
            if (error) throw error;
    
            setFollowing(true);
            setFollowers(prevFollowers => [...prevFollowers, { followed_id: post.uid, follower_id: currentUser.uid }]);
        } catch (error) {
            console.log(error.message);
    
        }
    };
    
    const unfollow = async () => {
        try {
            const { error } = await supabase
                .from('followers')
                .delete()
                .eq('follower_id', currentUser.uid);
    
            const { error: Error } = await supabase
                .from('following')
                .delete()
                .eq('follower_id', currentUser.uid);
            
            if (error) throw error;
    
            setFollowing(false);
            setFollowers(prevFollowers => prevFollowers.filter(follower => follower.follower_id !== currentUser.uid));
        } catch (error) {
            console.log(error.message);
        }
    };
    
    const playButton = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 12 12" fill="none">
            <path d="M3.85716 8.99977C3.7435 8.99977 3.63449 8.95462 3.55411 8.87425C3.47374 8.79387 3.42859 8.68486 3.42859 8.5712V3.42834C3.42863 3.35532 3.44733 3.28351 3.48291 3.21974C3.51849 3.15598 3.56978 3.10236 3.6319 3.06397C3.69403 3.02559 3.76493 3.00372 3.83788 3.00043C3.91083 2.99715 3.98341 3.01256 4.04873 3.0452L9.19159 5.61663C9.26268 5.65226 9.32246 5.70697 9.36423 5.77463C9.40601 5.8423 9.42813 5.92025 9.42813 5.99977C9.42813 6.07929 9.40601 6.15725 9.36423 6.22491C9.32246 6.29258 9.26268 6.34728 9.19159 6.38291L4.04873 8.95434C3.98926 8.98413 3.92368 8.99968 3.85716 8.99977ZM4.28573 4.12177V7.87777L8.04173 5.99977L4.28573 4.12177Z" fill="white" />
            <path d="M6 0.857143C7.01716 0.857143 8.01148 1.15877 8.85722 1.72387C9.70296 2.28897 10.3621 3.09218 10.7514 4.03191C11.1406 4.97165 11.2425 6.0057 11.044 7.00332C10.8456 8.00094 10.3558 8.91731 9.63655 9.63655C8.91731 10.3558 8.00094 10.8456 7.00332 11.044C6.00571 11.2425 4.97165 11.1406 4.03192 10.7514C3.09218 10.3621 2.28898 9.70296 1.72387 8.85722C1.15877 8.01148 0.857145 7.01716 0.857145 6C0.857145 4.63603 1.39898 3.32792 2.36345 2.36345C3.32793 1.39898 4.63603 0.857143 6 0.857143ZM6 0C4.81331 0 3.65328 0.351894 2.66658 1.01118C1.67989 1.67047 0.910851 2.60754 0.456725 3.7039C0.0025997 4.80026 -0.11622 6.00665 0.115291 7.17054C0.346802 8.33443 0.918247 9.40352 1.75736 10.2426C2.59648 11.0818 3.66557 11.6532 4.82946 11.8847C5.99335 12.1162 7.19975 11.9974 8.2961 11.5433C9.39246 11.0891 10.3295 10.3201 10.9888 9.33342C11.6481 8.34672 12 7.18669 12 6C12 4.4087 11.3679 2.88258 10.2426 1.75736C9.11742 0.632141 7.5913 0 6 0Z" fill="white" />
        </svg>
    );
    
    // Likes functionality
     
    
    const like = async () => {
        try {
            const { error } = await supabase
                .from('likes')
                .insert({
                    postId: post.postId,
                    user_id: currentUser.uid,
                });
            if (error) throw error;
    
            setLiked(true);
            setLikes(prevLikes => [...prevLikes, { postId: post.postId, user_id: currentUser.uid }]);
        } catch (error) {
            console.log(error.message);
    
        }
    };
    
    const unlike = async () => {
        try {
            const { error } = await supabase
                .from('likes')
                .delete()
                .match({ postId: post.postId, user_id: currentUser.uid });
            
            if (error) throw error;
    
            setLiked(false);
            setLikes(prevLikes => prevLikes.filter(like => like.user_id !== currentUser.uid));
        } catch (error) {
            console.log(error.message);
        }
    };
          
    const toggleLike = async () => {
        if (liked) {
            await unlike();
        } else {
            await like();
        }
    };

    const eyes = (
        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="18" viewBox="0 0 27 18" fill="none">
            <path d="M13.5 16.639C15.8012 16.639 17.6667 14.7735 17.6667 12.4723C17.6667 10.1711 15.8012 8.30566 13.5 8.30566C11.1989 8.30566 9.33337 10.1711 9.33337 12.4723C9.33337 14.7735 11.1989 16.639 13.5 16.639Z" stroke="black" stroke-width="2" />
            <path d="M26 12.4724C26 12.4724 24.6111 1.36133 13.5 1.36133C2.38889 1.36133 1 12.4724 1 12.4724" stroke="black" stroke-width="2" />
        </svg>
    );

    const backIcon = (
        <svg className='absolute top-4 left-5 z-50 cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 50 50" fill="none">
            <circle cx="25" cy="25" r="25" fill="#222222" fill-opacity="0.7" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M29.0545 33.9434L19.3079 25.3249C18.8974 24.9621 18.8974 24.376 19.3079 24.0122L29.0545 15.3937C29.6466 14.8688 30.611 14.8688 31.2051 15.3937C31.7983 15.9185 31.7983 16.7704 31.2051 17.2953L22.8678 24.669L31.2051 32.0408C31.7983 32.5667 31.7983 33.4186 31.2051 33.9434C30.611 34.4683 29.6466 34.4683 29.0545 33.9434Z" fill="white" />
        </svg>
    );

    const fullscreen = (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none">
            <path d="M1 6.01763V2.88488C1 2.33098 1.21071 1.79976 1.58579 1.40809C1.96086 1.01642 2.46957 0.796387 3 0.796387H6M17 12.2831V15.4159C17 15.9698 16.7893 16.501 16.4142 16.8926C16.0391 17.2843 15.5304 17.5044 15 17.5044H12M12 0.796387H15C15.5304 0.796387 16.0391 1.01642 16.4142 1.40809C16.7893 1.79976 17 2.33098 17 2.88488V6.01763M6 17.5044H3C2.46957 17.5044 1.96086 17.2843 1.58579 16.8926C1.21071 16.501 1 15.9698 1 15.4159V12.2831" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
    
    const ReadMore = ({ children, maxCharCnt = 200 }) => {
        const text = children;
        const [isTruncated, setIsTruncated] = React.useState(true);
      
        const resultString = isTruncated ? text.slice(0, maxCharCnt) : text;
      
        function toggleIsTruncated() {
            setIsTruncated(!isTruncated);
        }
      
        return (
            <p>
                {resultString}
                <span onClick={toggleIsTruncated} style={{ color: '#D9D9D9', cursor: 'pointer' }}>
                    {isTruncated ? '...  more' : '  less'}
                </span>
            </p>
        );
    };
    // console.log(isFullScreen);

    const handle = useFullScreenHandle();

    React.useEffect(() => {
        if (handle.active) {
            setIsPlaying(false)
        } else {
            setIsPlaying(true)
        }
        
    }, [handle.active]);
    
    return (
        <>
               
            <div className='Mobile__sPost laptop:block tablet:block ' style={{ backgroundColor: theme === "light" ? "#fff" : "#222", color: theme === "light" ? "#222" : "#fff", }}>
                <div className='sPost__container laptop:w-[50vw] laptop:mx-auto'>
                    {/* top content starts here  */}
                    <div className='top__content'>
                        <div className='name-followers'>
                            <ul>
                                <li>
                                    <Link to={`/users/${post?.uid}/show`}>
                                        <div className='initials'>
                                          
                                            <Avatar sx={{ width: '50px', height: "50px" }}
                                                src={post?.photoURL}
                                            />
                                        </div>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/users/${post?.uid}/show`}>
                                        <span className='userName'>
                                            {post?.name}
                                        </span>
                                    </Link>
                                    <span className='follower'>{formatFollowers(followers.length || 0)} Followers</span>
                                </li>
                            </ul>
                        </div>

                        <div className='follow-cart'>
                            <span>
                                <button className='text-[14px] font-medium  rounded-[18.4px] cursor-pointer p-[9px] ' style={{ backgroundColor: theme === "light" ? "#222" : "#444", color: theme === "light" ? "#fff" : "#fff", }} onClick={following ? unfollow : follow}>{following ? 'Subscribed' : 'Subscribe'}</button>

                            </span>
                        </div>
                    </div>
                    {/* top content ends here  */}
                    {/* post file container  */}
                    <div className='w-full flex-shrink-0 overflow-hidden   relative h-[250px] laptop:h-[400px] rounded-t-[10px]' >
                        {/* back icon  */}
                        <span>
                            <Link to={post?.categories[0] === 'posts' ? '/dashboard' : `/${post?.categories[0]}`}>
                                {backIcon}
                            </Link>
                        </span>
                          
                        {/* post file  */}
                        

                        <SkillShowVideoBox url={post?.media[0]} posterUrl={post?.posterUrl ? post?.posterUrl : null} isMuted={isMuted} isPlaying={isPlaying} post={post} skillCenter='skillCenter' />
                
                        <button className="absolute bottom-[1rem] right-[1rem] z-50" onClick={() => { toggleFullScreen(); handle.enter(); }}>
                            {fullscreen}
                        </button>
                    
 
                    </div>
                   

                    <div className='flex gap-x-[10px] overflow-x-scroll max-w-[90vw] mt-[15px] mx-auto items-center store__card px-[10px]'>
                        {post?.media && post?.media.map((mediaUrl, index) => {
                            return (
                                <div key={index} className="min-w-[90px] h-[55px] overflow-hidden rounded-[6px] relative">
                                    <div className='absolute w-full h-full top-0 bottom-0 right-0 left-0  backdrop-blur-[1px] z-[40] mx-auto my-auto' style={{ background: 'rgba(0, 0, 0, 0.50)' }} />
                                    <video className='w-full h-full object-cover' src={mediaUrl} autoPlay={false} controls={false} playsInline={true} nodownload='true' />
                                    <div className='absolute w-[20px] h-[20px] top-0 bottom-0 right-0 left-0 mx-auto my-auto z-[50]'>{playButton}</div>
                                </div>

                            )
                        })}
                    </div>

                    <div className='sPost__contents'>
                        {/* middle content starts here  */}
                        <div className='middle__content'>
                            <ul>
                                <li className='userName'>{post?.name}</li>
                                <li className='socials__icons'>
                                    <ul>
                                        <li>
                                            <img src={shareIcon} alt='share' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                                        </li>
                                        {/* <li>
                                        <img src={fb} alt='share' />
                                    </li> */}
                                        <li>
                                            <img src={IG} alt='share' />
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                            {post?.body && (
                                <div className="post__body">
                                    <ReadMore maxCharCnt={110}>
                                        {post?.body}
                                    </ReadMore>
                                </div>
                            )}
                            <div className='post__likes mt-[12px]'>
                                <div className='comment__likes'>
                                    <div style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
                                        {eyes}
                                    </div>
                                            
                                    <div className="flex items-center gap-x-[6px]">
                                        {formatFollowers(totalViews)} watch
                                    </div>
                                </div>

                                {/* Add to Cart */}
                               
                            </div>
                        </div>
                        {/* middle content ends here  */}
                  
                    </div>
                </div>

                {/* {post.taggedProducts && post.taggedProducts.length > 0 && ( */}
                <div className='mt-[20px] flex gap-x-[16px] w-full px-[10px] laptop:w-[50vw] laptop:mx-auto'>
                    <div className={`font-[500] cursor-pointer text-[14px] px-[16px]  p-[6px] rounded-[10px] ${selectedTab === "video" ? "bg-[#000] text-white" : "bg-[#D9D9D9] text-black"}`} onClick={() => handleTabClick("video")}>Video reviews</div>
                    <div className={`font-[500] cursor-pointer text-[14px] px-[16px]  p-[6px] rounded-[10px] ${selectedTab === "product" ? "bg-[#000] text-white" : "bg-[#D9D9D9] text-black"}`} onClick={() => handleTabClick("product")}>Featured products</div>
                </div>
                {/* // )} */}
                <div className='px-[10px] laptop:w-[50vw] laptop:mx-auto'>
                    {selectedTab === 'video' ? (
                        <VideoReviews theme={theme} post={post} activeIndex={activeIndex} />
                    ) : (
                        <ProductReviews post={post} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

                    )}

                </div>
                <SFooter />

            </div>
            <FullScreen handle={handle}>
                {handle.active && (
                    <FullscreenVideo handle={handle} post={post} open={open} handleClose={handleClose} />
                )}
            </FullScreen>
        </>
    );
};

export default SkillCenterShow

const FullscreenVideo = ({ post, handle }) => {
    const [isMuted, setIsMuted] = React.useState(true);
    const [isPlaying, setIsPlaying] = React.useState(true);
    const [isReady, setIsReady] = React.useState(false);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const videoRef = React.useRef(null);
    const inputRef = React.useRef(null);

    React.useEffect(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    }, [isPlaying]);

    const handleCanPlay = () => {
        setIsReady(true);
        setDuration(videoRef.current.duration);
    };
    const handleTimeUpdate = () => {
        setCurrentTime(videoRef.current.currentTime);
        updateSliderStyles();
    };
  
    const handleSeekChange = (e) => {
        videoRef.current.currentTime = e.target.value;
        updateSliderStyles();
    };
  
    React.useEffect(() => {
        updateSliderStyles();
    }, [currentTime]);

    function formatTime(seconds) {
        const minutes = Math.floor(Math.abs(seconds) / 60);
        const remainingSeconds = Math.floor(Math.abs(seconds) % 60);
        const formatted = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        return formatted;
    }
      
    function formatTimes(seconds) {
        const sign = seconds < 0 ? '-' : '';
        const absSeconds = Math.abs(seconds);
        const minutes = Math.floor(absSeconds / 60).toString().padStart(2, '0');
        const remainingSeconds = Math.floor(absSeconds % 60).toString().padStart(2, '0');
        const formatted = `${sign}${minutes}:${remainingSeconds}`;
        return formatted;
    }
    // Usage
    const timeDifference = duration - currentTime;

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

  
    const updateSliderStyles = () => {
        if (inputRef.current !== null) {
            const value = ((inputRef.current.value - inputRef.current.min) / (inputRef.current.max - inputRef.current.min)) * 100;
            inputRef.current.style.background = `linear-gradient(to right, red 0%, red ${value}%, gray ${value}%, gray 100%)`;
        };
    };

    const pipSupported = document.pictureInPictureEnabled;
  
    const handleClick = async () => {
        if (!videoRef.current) return;
        try {
            if (videoRef.current !== document.pictureInPictureElement) {
                await videoRef.current.requestPictureInPicture();
            } else {
                await document.exitPictureInPicture();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const closeIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M28.5 1H3.5C2.11929 1 1 2.11929 1 3.5V28.5C1 29.8807 2.11929 31 3.5 31H28.5C29.8807 31 31 29.8807 31 28.5V3.5C31 2.11929 29.8807 1 28.5 1Z" fill="none" stroke="white" />
            <path d="M25.1667 6H21.345C20.6033 6 20.2308 6.8975 20.7558 7.4225L24.5775 11.2442C25.1025 11.7692 26 11.3975 26 10.655V6.83333C26 6.61232 25.9122 6.40036 25.7559 6.24408C25.5996 6.0878 25.3877 6 25.1667 6ZM6 6.83333V10.655C6 11.3967 6.8975 11.7692 7.4225 11.2442L11.2442 7.4225C11.7692 6.8975 11.3975 6 10.655 6H6.83333C6.61232 6 6.40036 6.0878 6.24408 6.24408C6.0878 6.40036 6 6.61232 6 6.83333ZM6.83333 26H10.655C11.3967 26 11.7692 25.1025 11.2442 24.5775L7.4225 20.7558C6.8975 20.2308 6 20.6025 6 21.345V25.1667C6 25.3877 6.0878 25.5996 6.24408 25.7559C6.40036 25.9122 6.61232 26 6.83333 26ZM26 25.1667V21.345C26 20.6033 25.1025 20.2308 24.5775 20.7558L20.7558 24.5775C20.2308 25.1025 20.6025 26 21.345 26H25.1667C25.3877 26 25.5996 25.9122 25.7559 25.7559C25.9122 25.5996 26 25.3877 26 25.1667Z" fill="white" />
        </svg>
    );

    const lock = (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="30" viewBox="0 0 24 30" fill="none">
            <path d="M20.3077 11.3395L7.12615 11.3395L6.64846 9.19705C5.83385 6.15736 7.24892 3.1269 10.4875 2.25921C13.6934 1.40029 16.5189 3.23813 17.3478 6.32998L17.7402 7.88672C17.8722 8.37921 18.378 8.67133 18.8709 8.53933C19.3634 8.40733 19.6555 7.90149 19.5235 7.40903L19.1308 5.85226C18.0351 1.76072 14.2158 -0.65082 10.0098 0.475795C5.78769 1.607 3.78738 5.65149 4.86554 9.67518L5.23662 11.3395H3.69231C1.656 11.3395 0 12.9955 0 15.0318V26.1087C0 28.145 1.656 29.801 3.69231 29.801H20.3077C22.344 29.801 24 28.145 24 26.1087V15.0318C24 12.9955 22.344 11.3395 20.3077 11.3395ZM22.1538 26.1087C22.1538 27.1264 21.3254 27.9549 20.3077 27.9549H3.69231C2.67462 27.9549 1.84615 27.1264 1.84615 26.1087V15.0318C1.84615 14.0141 2.67462 13.1857 3.69231 13.1857H20.3077C21.3254 13.1857 22.1538 14.0141 22.1538 15.0318V26.1087ZM12 16.878C10.9805 16.878 10.1538 17.7046 10.1538 18.7241C10.1538 19.4058 10.5277 19.9943 11.0769 20.3141V23.3395C11.0769 23.8491 11.4905 24.2626 12 24.2626C12.5095 24.2626 12.9231 23.8491 12.9231 23.3395V20.3141C13.4723 19.9943 13.8462 19.4054 13.8462 18.7241C13.8462 17.7046 13.0195 16.878 12 16.878Z" fill="white" />
        </svg>
    );

    const pip = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M9.94698 0H10.053C12.2009 0 13.8837 5.54462e-08 15.1972 0.176744C16.5405 0.357209 17.6009 0.734884 18.4335 1.56651C19.266 2.39907 19.6428 3.45953 19.8233 4.80372C20 6.11628 20 7.79907 20 9.94698V10.053C20 12.2009 20 13.8837 19.8233 15.1972C19.6428 16.5405 19.2651 17.6009 18.4335 18.4335C17.6623 19.2037 16.6958 19.5851 15.4874 19.7805C14.2995 19.973 12.8056 19.9963 10.9312 19.9991C10.7461 19.9993 10.5686 19.926 10.4376 19.7954C10.3065 19.6647 10.2328 19.4874 10.2326 19.3023C10.2323 19.1173 10.3056 18.9397 10.4362 18.8087C10.5669 18.6777 10.7443 18.604 10.9293 18.6037C12.827 18.6009 14.2065 18.5749 15.2642 18.4028C16.3033 18.2353 16.9553 17.9377 17.4465 17.4465C17.9767 16.9163 18.2809 16.2 18.4409 15.0102C18.6028 13.8009 18.6047 12.2121 18.6047 10C18.6047 7.78791 18.6028 6.19907 18.44 4.98977C18.2809 3.8 17.9767 3.08279 17.4465 2.55256C16.9163 2.02326 16.2 1.71907 15.0102 1.55907C13.8009 1.39721 12.2121 1.39535 10 1.39535C7.78791 1.39535 6.19814 1.39721 4.98884 1.55907C3.8 1.71907 3.08279 2.02419 2.55349 2.55349C2.0614 3.04465 1.76465 3.69767 1.59721 4.73488C1.42512 5.79349 1.39907 7.17302 1.39535 9.0707C1.39523 9.25573 1.3216 9.43314 1.19068 9.56389C1.05975 9.69464 0.882244 9.76803 0.69721 9.76791C0.512175 9.76778 0.334767 9.69416 0.204015 9.56323C0.0732633 9.43231 -0.000123201 9.2548 1.55263e-07 9.06977C0.00372109 7.19442 0.0279071 5.70047 0.219535 4.51349C0.414884 3.30419 0.796279 2.3386 1.56651 1.56744C2.39907 0.734884 3.45953 0.35814 4.80372 0.177674C6.11628 0.000930221 7.79907 0.000930276 9.94698 0.000930276" fill="white" />
            <path d="M14.186 10C14.186 10.1851 14.1125 10.3625 13.9817 10.4934C13.8508 10.6242 13.6734 10.6977 13.4884 10.6977H9.99998C9.81495 10.6977 9.63749 10.6242 9.50665 10.4934C9.37581 10.3625 9.30231 10.1851 9.30231 10V6.51166C9.30231 6.32662 9.37581 6.14917 9.50665 6.01833C9.63749 5.88749 9.81495 5.81398 9.99998 5.81398C10.185 5.81398 10.3625 5.88749 10.4933 6.01833C10.6242 6.14917 10.6977 6.32662 10.6977 6.51166V8.31631L14.1581 4.85584C14.222 4.7873 14.299 4.73232 14.3846 4.69419C14.4702 4.65605 14.5626 4.63555 14.6562 4.6339C14.7499 4.63224 14.843 4.64948 14.9298 4.68457C15.0167 4.71966 15.0956 4.77188 15.1619 4.83813C15.2281 4.90438 15.2804 4.9833 15.3154 5.07017C15.3505 5.15704 15.3678 5.25009 15.3661 5.34377C15.3645 5.43745 15.344 5.52983 15.3058 5.61541C15.2677 5.70099 15.2127 5.77802 15.1442 5.84189L11.6837 9.30235H13.4884C13.6734 9.30235 13.8508 9.37586 13.9817 9.5067C14.1125 9.63754 14.186 9.81499 14.186 10Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.37023 11.1626C3.53488 11.1626 2.83721 11.1626 2.28465 11.237C1.70047 11.3152 1.17302 11.4882 0.749767 11.9124C0.325581 12.3356 0.152558 12.8631 0.0744186 13.4472C4.15846e-08 13.9998 0 14.6966 0 15.5328V15.6296C0 16.4659 4.15846e-08 17.1626 0.0744186 17.7152C0.152558 18.2993 0.325581 18.8268 0.748837 19.25C1.17302 19.6742 1.70047 19.8472 2.28372 19.9254C2.83721 19.9998 3.53488 19.9998 4.37023 19.9998H4.46698C5.30233 19.9998 6 19.9998 6.55256 19.9254C7.13674 19.8472 7.66419 19.6742 8.08744 19.25C8.51163 18.8268 8.68465 18.2993 8.76279 17.7152C8.83721 17.1626 8.83721 16.4659 8.83721 15.6296V15.5328C8.83721 14.6966 8.83721 13.9998 8.76279 13.4472C8.68465 12.8631 8.51163 12.3356 8.08837 11.9124C7.66419 11.4882 7.13674 11.3152 6.55349 11.237C6 11.1626 5.30233 11.1626 4.46698 11.1626H4.37023ZM1.73581 12.8984C1.85674 12.7775 2.04093 12.6779 2.4707 12.6193C2.91907 12.5598 3.52186 12.5579 4.4186 12.5579C5.31535 12.5579 5.91814 12.5598 6.36744 12.6193C6.79628 12.6779 6.98046 12.7775 7.1014 12.8984C7.22233 13.0193 7.32186 13.2035 7.38047 13.6333C7.44 14.0817 7.44186 14.6845 7.44186 15.5812C7.44186 16.4779 7.44 17.0807 7.37953 17.53C7.32186 17.9589 7.22233 18.1431 7.10047 18.264C6.97954 18.3849 6.79628 18.4845 6.36744 18.5431C5.91814 18.6026 5.31535 18.6045 4.4186 18.6045C3.52186 18.6045 2.91907 18.6026 2.46977 18.5421C2.04093 18.4845 1.85674 18.3849 1.73581 18.2631C1.61488 18.1421 1.51535 17.9589 1.45674 17.53C1.39721 17.0807 1.39535 16.4779 1.39535 15.5812C1.39535 14.6845 1.39721 14.0817 1.45767 13.6324C1.51535 13.2035 1.61488 13.0193 1.73674 12.8984" fill="white" />
        </svg>
    );

    return (
        <>
       
            <div className='w-screen h-screen relative'>
                <div className=' fullscreen'>
                    <div className="absolute z-[100] cursor-pointer w-[32px] h-[32px] top-0 bottom-0 my-auto right-[1rem]" onClick={handle.exit}>
                        {closeIcon}
                    </div>

                    <button disabled={!pipSupported} className="absolute z-[100] cursor-pointer w-[32px] h-[32px] top-[1rem]   right-[1rem]" onClick={handleClick}>
                        {pip}
                    </button>

                    <div className="absolute z-[100] cursor-pointer w-[24px] h-[30px]  left-[1rem]  my-auto top-0 bottom-0" >
                        {lock}
                    </div>
                    <FullScreenVideoBox url={post?.media[0]} posterUrl={post?.posterUrl ? post?.posterUrl : null} isMuted={isMuted} isPlaying={isPlaying} post={post} isReady={isReady} handleCanPlay={handleCanPlay} videoRef={videoRef} handleTimeUpdate={handleTimeUpdate} />

                    <div className="absolute cursor-pointer w-[50px] h-[50px] top-[0%] z-[100] left-[0%] text-[#fff]  right-[0%] bottom-[0%]  my-auto mx-auto flex items-center opacity-0 hover:opacity-100 justify-center" onClick={togglePlay}>
                                                
                        {isPlaying && (timeDifference !== 0) ?
                            <FaPause style={{ fontSize: 50 }} />
                            :
                            <FaPlay style={{ fontSize: 50 }} />
                        }
                                               
                    </div>

                    {isReady && (
                        <div className='absolute h-[20px] text-[#fff]  bottom-[10%] right-0 mx-auto left-0 flex items-center gap-x-[14px] w-[80%]   z-[100]'>
                            <span className='text-[12px]'>
                                {formatTime(currentTime)}
                            </span>
                            <input
                                ref={inputRef}
                                className='slider'
                                type="range"
                                min={0}
                                max={duration}
                                value={currentTime}
                                onChange={handleSeekChange}
                            />
                            <span className='text-[12px]'>
                                {formatTimes(timeDifference)}
                            </span>
                        </div>
      
                    )}



                </div>
            </div>
                
        
        </>
    );
};


const VideoReviews = ({ theme, activeIndex, post }) => {
    const index = activeIndex;


    return (
        <>
         

                <InfiniteList title=' ' resource='video_review' actions={false}
                    sx={{
                        '& .MuiBox-root': {
                            padding: '0',
          
                        },
                        backgroundColor: theme === "light" ? "#fff" : "#222", color: theme === "light" ? "#222" : "#fff",
                    }}
                >
                    <WithListContext render={({ isLoading, data }) => (
                        !isLoading && (
                            <>
                                <ShortReviews activeIndex={activeIndex} url='video_review' index={index} theme={theme} mediaUrl={post} data={data} />
                            </>
                        ))}
                    />
       
                </InfiniteList>
           
        </>
    );
};


const ProductReviews = ({ activeIndex, post, setActiveIndex }) => {
    const splideRef = React.useRef(); // Create the ref

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
    

    return (
        <>
            <div className='showCard--post max-w-[90vw] mt-[19px] px-[5px]'>
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
        </>
    );
};