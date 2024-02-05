import React, { useContext, useEffect, useState } from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, IconButton, Avatar, CardHeader } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import {  AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import './card.css';
import { Link } from 'react-router-dom';
import {VideoPlay} from '../videoPlayer/VideoPlayer';
import chatLike from "../../assets/chatlike.png";
import commentIcon from "../../assets/commentIcon.png";
import { supabase } from '../../supabase/SupabaseConfig';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeProvider';
import useSupabaseRealtime from '../../supabase/realTime';
import { useGetList } from 'react-admin';





const CHeader = ({ post, formatFollowers, following, followers, unfollow, follow }) => (
    <CardHeader className='card--header' sx={{paddingLeft: 0, alignItems: 'center', margin: 'auto 0'}}
        avatar={
            <Avatar className="drop-shadow-sm" sx={{width: '50px', height: "50px"}}
                src={post.photoURL}
            />
        }
        action={
            <div className='bg-black rounded-[18px] mt-[10px]'>
                <Button variant="contained" size='small' color='primary' className='followBtn' sx={{ textTransform: 'none',  backgroundImage: 'inherit', borderRadius: '18px' }} onClick={following ? unfollow : follow}>{following ? 'Followed' : 'Follow'}
                </Button>
            </div>
        }
        title={
            <Typography variant="h6" sx={{  fontWeight: '600', marginBottom: '2px', fontSize: '14px' }}>
                {post.name}
            </Typography>
        }
        subheader={
            <Typography variant="subtitle2" sx={{  fontWeight: '400' }}>
                {formatFollowers(followers.length || 0)} Followers
            </Typography>
        }
    />
);
    
const CActions = ({ post, toggleLike, liked, likes, comments, theme }) => (
    <CardActions sx={{ fontWeight: 500 }}>

        <span>
            <IconButton aria-label="Like" className='likeBtn' onClick={toggleLike}>
                <img src={chatLike} alt='' className='likeImg' style={{filter : theme === "light" ? "invert(0)" : "invert(1)"}} />
                {liked ? (
                    <AiFillHeart color={theme === "light" ? "#222" : "#fff"} className='like' />
                ) : (
                    <AiOutlineHeart color={theme === "light" ? "#222" : "#fff"} className='like' />
                )}
            </IconButton>
            
            <span className='mr-1'>
                {likes.length || 0}
            </span>
                                                
            {likes.length < 2 ? (
                <span>like</span>
            ) : (
                <span>likes</span>
            )}
                                           
        </span>

        {/* comment  */}
        <span className='commentBtn'>
            <IconButton aria-label="Comment"  >
        <img src={commentIcon} className='comment__icons' alt='commentIcon' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
            </IconButton>
            <span>{comments?.length || 0}</span>
        </span>

       
    
    </CardActions>
);

const CContents = ({ post }) => (
    <CardContent sx={{fontWeight: 400, }}>           
        <Typography variant="body2" sx={{fontWeight: 400,}}  className='post--content font-[400]'>
            {post.body}
        </Typography>
    </CardContent>
);

export const YoutubCards = ({ post,  isMuted, toggleMute }) => {
  const { theme} = useContext(ThemeContext);
  const { currentUser } = useContext(AuthContext);
    const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);

  const realtimeData = useSupabaseRealtime();

  const { data: comments, refetch: refetchComment } = useGetList('comments', {
    filter: { postId: post.postId }
});

  
  // React.useEffect(() => {
  //       const intervalId = setInterval(() => {
  //         // Fetch the data again
  //         refetchComment();
  //       }, 5000); // 5000ms = 5s
     
  //       // Clear the interval when the component unmounts
  //       return () => clearInterval(intervalId);
  //     }, []);

  // follow and unfollowe functionality 
   useEffect(() => {
     const fetchInitialData = async () => {
       let { data: initialData, error } = await supabase
         .from('followers')
         .select('*')
         .eq('followed_id', post?.uid);
         
       if (error) console.log('Error fetching initial data: ', error);
       else {
         setFollowing(initialData.some(follower => follower.follower_id === currentUser.uid));
         setFollowers(initialData);
        //  console.log(initialData);
       }
     };
 
     const fetchLikes = async () => {
       let { data, error } = await supabase
         .from('likes')
         .select('*')
         .match({ postId: post?.postId });
       
       if (error && status !== 406) throw error;
       setLiked(data.some(like => like.user_id === currentUser.uid));
       setLikes(data);
     }
 
     


     fetchLikes();
     fetchInitialData();
   
   }, [likes, followers, following]);
 
 
 
   useEffect(() => {
 
 
     // Subscribe to changes
     const followerSubscription = supabase
     .channel('room1')
     .on('postgres_changes', { event: '*', schema: '*', table: 'followers', filter: `postId=eq.${post?.postId}` }, payload => {
       console.log('Change received!', payload);
       // If new follower is added
       if (payload.new) {
         setFollowers(prevFollowers => {
           if (payload.new.follower_id === currentUser.uid) {
             // Follower is added by the currentUser
             setFollowing(true);
             if (!prevFollowers.some(follower => follower.id === payload.new.id)) {
               return [...prevFollowers, payload.new];
             }
           } else {
             // Follower is added by someone else
             if (!prevFollowers.some(follower => follower.id === payload.new.id)) {
               return [...prevFollowers, payload.new];
             }
           }
           return prevFollowers;
         });
       }
       // If follower is removed
       else if (payload.old) {
         if (payload.old.follower_id === currentUser.uid) {
           // Follower is removed by the currentUser
           setFollowing(false);
         }
         // Follower is removed by someone else
         setFollowers(prevFollowers => prevFollowers.filter(follower => follower.id !== payload.old.id));
       }
     })
     .subscribe();
 
 
     const likesSubscription = supabase
       .channel('room1')
       .on('postgres_changes', { event: '*', schema: '*', table: 'likes', filter: `postId=eq.${post?.postId}` }, payload => {
         console.log('Change received!', payload);
         // If new like is added
         if (payload.new) {
           if (payload.new.user_id === currentUser.uid) {
             // Like is made by the currentUser
             setLiked(true);
             setLikes(prevLikes => {
               if (!prevLikes.some(like => like.id === payload.new.id)) {
                 return [...prevLikes, payload.new];
               } else {
                 return prevLikes;
               }
             });
             
           } else {
             // Like is made by someone else
             setLikes(prevLikes => {
               if (!prevLikes.some(like => like.id === payload.new.id)) {
                 return [...prevLikes, payload.new];
               } else {
                 return prevLikes;
               }
             });
           }
         }
         // If like is removed
         else if (payload.old) {
           if (payload.old.user_id === currentUser.uid) {
             // Like is removed by the currentUser
             setLiked(false);
             
             setLikes(prevLikes => prevLikes.filter(like => like.user_id !== currentUser.uid));
           } else {
             // Like is removed by someone else
             setLikes(prevLikes => prevLikes.filter(like => like.id !== payload.old.id));
           }
         }
       })
       .subscribe();
       
 
     return () => {
       supabase.removeChannel(followerSubscription);
       supabase.removeChannel(likesSubscription);
     };
   }, [post, realtimeData]);

  
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
        .eq('followed_id', post.uid);

      const { error: Error } = await supabase
        .from('following')
        .delete()
        .eq('followed_id', post.uid);
        
      if (error) throw error;

      setFollowing(false);
      setFollowers(prevFollowers => prevFollowers.filter(follower => follower.follower_id !== currentUser.uid));
    } catch (error) {
      console.log(error.message);
    }
  };

    

  // Likes functionality
  const checklikes = async () => {
    try {
      let { data, error } = await supabase
        .from('likes')
        .select('*')
        .match({ postId: post.postId });
        

      if (error && status !== 406) throw error;
      const isLiked = data.some(like => like.user_id === currentUser.uid);
     
        setLiked(isLiked);
        setLikes(data)
      
    } catch (error) {
      console.log(error.message);
    }
  };

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

     // formatting the number of followers
  const formatFollowers = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K+';
    } else if (count >= 100 && count <= 999) {
      return (count / 100).toFixed(1) + 'H';
    } else {
      return count;
    }
  }
    
    

    if (!post || !post.media || post.media.length !== 1) {
        return null; // Render nothing for posts without exactly one media file
    }

    const mediaUrl = post.media[0]; // Get the URL of the single media file
    const isImage = mediaUrl.includes('.jpg') || mediaUrl.includes('.jpeg') || mediaUrl.includes('.png');

    return (
        <Card sx={{ width: '93vw', maxHeight: 700, boxShadow: '0 5px 4px rgba(0, 0, 0, 0.01) !important', backgroundColor: theme === "light" ? "#fff" : "rgba(68, 68, 68, 0.2)", marginTop: '20px', color: theme === "light" ? "#222" : "#fff", padding: '10px', borderRadius: '10px'}} >
            {/* Card Header */}
            <CHeader post={post} theme={theme}  follow={follow} followers={followers} unfollow={unfollow}  formatFollowers={formatFollowers} following={following}/>
            <CardActionArea>
                <div className='w-full h-[430px] relative overflow-hidden youtube--container rounded-[10px]'>
                    <Link to={`/${post.URL}/${post.id}/show`}>
                       
                        {isImage ? (
                            <img
                                className={isImage && 'object-cover h-full w-full'}
                                height="140"
                                src={mediaUrl}
                                alt="media"
                                crossOrigin='anonymous'
                                loading="lazy"
                            />
                        ) : (
                            <VideoPlay post={post} url={mediaUrl} posterUrl={post.posterUrl} isMuted={isMuted}/>
                        )}
                    </Link>
                    {!isImage && (
                        <>
                            <span className="mute-btn " onClick={toggleMute}>
                                {isMuted ?
                                    <VolumeOffIcon />
                                    :
                                    <VolumeUpIcon />
                                }
                            </span>
                        </>
                    )}
                </div>
                {/* Card content  */}
                <CContents post={post} theme={theme}/>
                    
            </CardActionArea>
            {/* Card actions */}
        <CActions post={post} theme={theme} liked={liked} likes={likes} toggleLike={toggleLike} comments={comments} />
            
        </Card>
    
    );
};



export const FacebookCard = ({ post  }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMuted, setIsMuted] = useState(true);
  const { currentUser } = useContext(AuthContext);
    const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const realtimeData = useSupabaseRealtime();

  const toggleMute = () => {
    setIsMuted(!isMuted);
};

const { data: comments, refetch: refetchComment } = useGetList('comments', {
  filter: { postId: post.postId }
});

 // follow and unfollowe functionality 
  useEffect(() => {
    const fetchInitialData = async () => {
      let { data: initialData, error } = await supabase
        .from('followers')
        .select('*')
        .eq('followed_id', post?.uid);
        
      if (error) console.log('Error fetching initial data: ', error);
      else {
        setFollowing(initialData.some(follower => follower.follower_id === currentUser.uid));
        setFollowers(initialData);
        // console.log(initialData);
      }
    };

    const fetchLikes = async () => {
      let { data, error } = await supabase
        .from('likes')
        .select('*')
        .match({ postId: post?.postId });
      
      if (error && status !== 406) throw error;
      setLiked(data.some(like => like.user_id === currentUser.uid));
      setLikes(data);
    }

    fetchLikes();
    fetchInitialData();
  
  }, [likes, followers, comments, following]);



  useEffect(() => {


    // Subscribe to changes
    const followerSubscription = supabase
    .channel('room1')
    .on('postgres_changes', { event: '*', schema: '*', table: 'followers', filter: `postId=eq.${post?.postId}` }, payload => {
      console.log('Change received!', payload);
      // If new follower is added
      if (payload.new) {
        setFollowers(prevFollowers => {
          if (payload.new.follower_id === currentUser.uid) {
            // Follower is added by the currentUser
            setFollowing(true);
            if (!prevFollowers.some(follower => follower.id === payload.new.id)) {
              return [...prevFollowers, payload.new];
            }
          } else {
            // Follower is added by someone else
            if (!prevFollowers.some(follower => follower.id === payload.new.id)) {
              return [...prevFollowers, payload.new];
            }
          }
          return prevFollowers;
        });
      }
      // If follower is removed
      else if (payload.old) {
        if (payload.old.follower_id === currentUser.uid) {
          // Follower is removed by the currentUser
          setFollowing(false);
        }
        // Follower is removed by someone else
        setFollowers(prevFollowers => prevFollowers.filter(follower => follower.id !== payload.old.id));
      }
    })
    .subscribe();


    const likesSubscription = supabase
      .channel('room1')
      .on('postgres_changes', { event: '*', schema: '*', table: 'likes', filter: `postId=eq.${post?.postId}` }, payload => {
        console.log('Change received!', payload);
        // If new like is added
        if (payload.new) {
          if (payload.new.user_id === currentUser.uid) {
            // Like is made by the currentUser
            setLiked(true);
            setLikes(prevLikes => {
              if (!prevLikes.some(like => like.id === payload.new.id)) {
                return [...prevLikes, payload.new];
              } else {
                return prevLikes;
              }
            });
            
          } else {
            // Like is made by someone else
            setLikes(prevLikes => {
              if (!prevLikes.some(like => like.id === payload.new.id)) {
                return [...prevLikes, payload.new];
              } else {
                return prevLikes;
              }
            });
          }
        }
        // If like is removed
        else if (payload.old) {
          if (payload.old.user_id === currentUser.uid) {
            // Like is removed by the currentUser
            setLiked(false);
            
            setLikes(prevLikes => prevLikes.filter(like => like.user_id !== currentUser.uid));
          } else {
            // Like is removed by someone else
            setLikes(prevLikes => prevLikes.filter(like => like.id !== payload.old.id));
          }
        }
      })
      .subscribe();
      

    return () => {
      supabase.removeChannel(followerSubscription);
      supabase.removeChannel(likesSubscription);
    };
  }, [post, realtimeData]);

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
        .eq('followed_id', post.uid);

      const { error: Error } = await supabase
        .from('following')
        .delete()
        .eq('followed_id', post.uid);
        
      if (error) throw error;

      setFollowing(false);
      setFollowers(prevFollowers => prevFollowers.filter(follower => follower.follower_id !== currentUser.uid));
    } catch (error) {
      console.log(error.message);
    }
  };

    

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
      


     // formatting the number of followers
  const formatFollowers = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K+';
    } else if (count >= 100 && count <= 999) {
      return (count / 100).toFixed(1) + 'H';
    } else {
      return count;
    }
  }
    
  const toggleLike = async () => {
    if (liked) {
      await unlike();
    } else {
      await like();
    }
  };


    if (!post || !post.media || post.media.length !== 1) {
        return null; // Render nothing for posts without exactly one media file
    }

    const mediaUrl = post.media[0]; // Get the URL of the single media file
    const isImage = mediaUrl.includes('.jpg') || mediaUrl.includes('.jpeg') || mediaUrl.includes('.png');
    return (
        <Card sx={{ width: 450, boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)', backgroundColor: theme === "light" ? "#fff" : "rgba(68, 68, 68, 0.2)", marginTop: '20px', color: theme === "light" ? "#222" : "#fff", padding: '10px', borderRadius: '10px'}}>
            {/* Card header */}
            <CHeader post={post}  follow={follow} followers={followers} unfollow={unfollow}  formatFollowers={formatFollowers} following={following}/>
            <CardActionArea>
                {/* Card media (image or video) */}
                <div className='w-full h-[450px] relative overflow-hidden youtube--container rounded-[10px]'>
                    <Link to={`/${post.URL}/${post.id}/show`}>
                            {isImage ? (
                                <img
                                    className={isImage && 'object-cover h-full w-full '}
                                    height="140"
                                    crossOrigin='anonymous'
                                    src={mediaUrl}
                                    alt="media"
                                    loading="lazy"
                                />
                            ) : (
                                <VideoPlay post={post} url={mediaUrl} posterUrl={post.posterUrl} isMuted={isMuted}/>
                         
                        )}
                    </Link>
                    {!isImage && (
                        <>
                            <span className="mute-btn " onClick={toggleMute}>
                                {isMuted ?
                                    <VolumeOffIcon />
                                    :
                                    <VolumeUpIcon />
                                }
                            </span>
                            
                                
                        </>
                    )}
                </div>
                {/* Card content  */}
                <CContents post={post}  />
            

            </CardActionArea>
            {/* Card actions */}
            <CActions post={post} theme={theme} liked={liked} likes={likes} toggleLike={toggleLike} comments={comments} />

        </Card>
    );
};
  

  
export const CarouselCard = ({ post,  isMuted, toggleMute  }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const { currentUser } = useContext(AuthContext);
    const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  
  
  const { data: comments, refetch: refetchComment } = useGetList('comments', {
    filter: { postId: post.postId }
});
  


 // follow and unfollowe functionality 
  useEffect(() => {
    checkFollowing();
    checklikes();
  }, [likes, followers, following]);

  // fetch comments from the database 


  const checkFollowing = async () => {
    try {
      let { data, error } = await supabase
        .from('followers')
        .select('*')
        .eq('followed_id', post.uid);
  
      if (error && status !== 406) throw error;
  
      // Check if currentUser.uid is in the list of followers
      const isFollowing = data.some(follower => follower.follower_id === currentUser.uid);
  
      setFollowing(isFollowing);
      setFollowers(data);
    } catch (error) {
      console.log(error.message);
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
        .eq('followed_id', post.uid);

      const { error: Error } = await supabase
        .from('following')
        .delete()
        .eq('followed_id', post.uid);
        
      if (error) throw error;

      setFollowing(false);
      setFollowers(prevFollowers => prevFollowers.filter(follower => follower.follower_id !== currentUser.uid));
    } catch (error) {
      console.log(error.message);
    }
  };

    

  // Likes functionality
  const checklikes = async () => {
    try {
      let { data, error } = await supabase
        .from('likes')
        .select('*')
        .match({ postId: post.postId });
        

      if (error && status !== 406) throw error;
      const isLiked = data.some(like => like.user_id === currentUser.uid);
     
        setLiked(isLiked);
        setLikes(data)
      
    } catch (error) {
      console.log(error.message);
    }
  };

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

     // formatting the number of followers
  const formatFollowers = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K+';
    } else if (count >= 100 && count <= 999) {
      return (count / 100).toFixed(1) + 'H';
    } else {
      return count;
    }
  }
    
   

    
        const mPostCarousel = {
          type: 'slide',
          pauseOnHover: false,
          pagination: true,
          arrows: false,
      };

   


    

  return (
    <>
      {post && post.media && post.media.length > 1 && (
        <Card sx={{ width: '92vw', maxHeight: 700, margin: '0 auto', boxShadow: '0 1px 4px rgba(0, 0, 0, 0.03)', backgroundColor: theme === "light" ? "#fff" : "rgba(68, 68, 68, 0.2)", marginTop: '20px', color: theme === "light" ? "#222" : "#fff", padding: '10px', borderRadius: '10px' }}>
          <CHeader post={post} follow={follow} followers={followers} unfollow={unfollow} formatFollowers={formatFollowers} following={following} />
          <Splide  options={mPostCarousel} className='mobile--post-splide card__splide h-[430px]' >
      
            {Array.isArray(post.media) && post.media.map((mediaUrl, index) => {
              const isImage = mediaUrl.includes('.jpg') || mediaUrl.includes('.jpeg') || mediaUrl.includes('.png');
              return (
                <SplideSlide key={index} className='w-full h-[430px] relative youtube--container rounded-[10px] overflow-hidden'>

                    <Link to={`/${post.URL}/${post && post.id}/show`}>
                      {isImage ? (
                        <img
                          className={isImage && ' object-cover h-full w-full'}
                          height="140"
                          src={mediaUrl}
                          alt="media"
                          loading="lazy"
                          crossOrigin='anonymous'
                        />
                      ) : (
                        <VideoPlay post={post} url={mediaUrl} isMuted={isMuted} posterUrl={index === 0 ? post.posterUrl : null} />
                      )}
                                           
                      {!isImage && (
                        <>
                          <button className="mute-btn " onClick={toggleMute}>
                            {isMuted ?
                              <VolumeOffIcon />
                              :
                              <VolumeUpIcon />
                            }
                          </button>
                            
                                
                        </>
                      )}
                                            
                    </Link>
                </SplideSlide>
              );
            })}
                              
          </Splide>

 
          <div style={{ margin: '14px auto' }}>
                        
            {/* Card content  */}
            <CContents post={post} />
            {/* Card actions */}
            <CActions post={post} theme={theme} liked={liked} likes={likes} toggleLike={toggleLike} comments={comments} />
          </div>
       
        </Card>
              
      )}
    </>

  );
};


export const BigCarouselCard = ({ post  }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMuted, setIsMuted] = useState(true);
  const { currentUser } = useContext(AuthContext);
  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  
  
  const { data: comments, refetch: refetchComment } = useGetList('comments', {
    filter: { postId: post.postId }
});
  
  const toggleMute = () => {
      setIsMuted(!isMuted);
  };

  // follow and unfollowe functionality 
  useEffect(() => {
    checkFollowing();
    checklikes();
  }, [likes, followers, following]);



  const checkFollowing = async () => {
    try {
      let { data, error } = await supabase
        .from('followers')
        .select('*')
        .eq('followed_id', post.uid);
  
      if (error && status !== 406) throw error;
  
      // Check if currentUser.uid is in the list of followers
      const isFollowing = data.some(follower => follower.follower_id === currentUser.uid);
  
      setFollowing(isFollowing);
      setFollowers(data);
    } catch (error) {
      console.log(error.message);
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
        .eq('followed_id', post.uid);

      const { error: Error } = await supabase
        .from('following')
        .delete()
        .eq('followed_id', post.uid);
        
      if (error) throw error;

      setFollowing(false);
      setFollowers(prevFollowers => prevFollowers.filter(follower => follower.follower_id !== currentUser.uid));
    } catch (error) {
      console.log(error.message);
    }
  };

    

  // Likes functionality
  const checklikes = async () => {
    try {
      let { data, error } = await supabase
        .from('likes')
        .select('*')
        .match({ postId: post.postId });
        

      if (error && status !== 406) throw error;
      const isLiked = data.some(like => like.user_id === currentUser.uid);
     
      setLiked(isLiked);
      setLikes(data)
      
    } catch (error) {
      console.log(error.message);
    }
  };

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
      


  // formatting the number of followers
  const formatFollowers = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K+';
    } else if (count >= 100 && count <= 999) {
      return (count / 100).toFixed(1) + 'H';
    } else {
      return count;
    }
  }
    
  const toggleLike = async () => {
    if (liked) {
      await unlike();
    } else {
      await like();
    }
  };

    
  const mPostCarousel = {
    type: 'slide',
    pauseOnHover: false,
    pagination: true,
    arrows: false,
  };



    

  return (
    <>
      {post && post.media && post.media.length > 1 && (
        <Card sx={{ width: 450, margin: '0 auto', boxShadow: '0 1px 4px rgba(0, 0, 0, 0.03)', backgroundColor: theme === "light" ? "#fff" : "rgba(68, 68, 68, 0.2)", marginTop: '20px', color: theme === "light" ? "#222" : "#fff", padding: '10px', borderRadius: '10px' }}>
          <CHeader post={post} follow={follow} followers={followers} unfollow={unfollow} formatFollowers={formatFollowers} following={following} />
          <Splide options={mPostCarousel} className="h-[450px] mobile--post-splide"  >
      
            {Array.isArray(post.media) && post.media.map((mediaUrl, index) => {
              const isImage = mediaUrl.includes('.jpg') || mediaUrl.includes('.jpeg') || mediaUrl.includes('.png');
              return (
                <SplideSlide key={index} className='w-full h-[450px] relative youtube--container rounded-[10px] overflow-hidden'>

                  <Link to={`/${post.URL}/${post && post.id}/show`}>
                    {isImage ? (
                      <img
                        className={isImage && ' object-cover h-full w-full'}
                        height="140"
                        src={mediaUrl}
                        alt="media"
                        loading="lazy"
                        crossOrigin='anonymous'
                      />
                    ) : (
                      <VideoPlay post={post} url={mediaUrl} isMuted={isMuted} posterUrl={index === 0 ? post.posterUrl : null} />
                    )}
                                           
                    {!isImage && (
                      <>
                        <button className="mute-btn " onClick={toggleMute}>
                          {isMuted ?
                            <VolumeOffIcon />
                            :
                            <VolumeUpIcon />
                          }
                        </button>
                            
                                
                      </>
                    )}
                                            
                  </Link>
                </SplideSlide>
              );
            })}
                              
          </Splide>

 
          <div style={{ margin: '14px auto' }}>
                        
            {/* Card content  */}
            <CContents post={post} />
            {/* Card actions */}
            <CActions post={post} theme={theme} liked={liked} likes={likes} toggleLike={toggleLike} comments={comments} />
          </div>
       
        </Card>
              
      )}
    </>

  );
};
