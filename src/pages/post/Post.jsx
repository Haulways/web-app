import { Link, useParams } from 'react-router-dom'
import { AiOutlineComment, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import './post.css';
import MPost from './MPost';
import Comments from '../../components/comments/Comments';
import React, { useContext, useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { AuthContext } from '../../components/context/AuthContext';
import { Avatar, Box, CircularProgress, IconButton, Skeleton } from '@mui/material';
import { useGetIdentity, useGetList, useRecordContext, useRefresh, useStore } from 'react-admin';
import cartImg from "../../assets/cart.png";
import backIcon from "../../assets/postImg-Icons/back.png";
import shareIcon from "../../assets/socials/share.png";
import fb from "../../assets/socials/fb.png";
import IG from "../../assets/socials/ig.png";
import commentIcon from "../../assets/chatlike.png";
import { supabase } from '../../supabase/SupabaseConfig';
import { ShowVideoBox } from '../../components/videoPlayer/VideoPlayer';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { toast } from 'react-toastify';
import Medusa from '@medusajs/medusa-js';
import { ThemeContext } from '../../components/context/ThemeProvider';
import useSupabaseRealtime from '../../supabase/realTime';
import { v4 as uuidv4 } from "uuid";
import { ShowPageCarousels_1 } from '../../components/card/ShowCard';

const medusa = new Medusa({
  baseUrl: "https://ecommerce.haulway.co",
});

export const CheckSavedPost = (postId) => {
  const record = useRecordContext();
  const [post, setPost] = useState(null);
  const [savedPost, setSavedPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [user, setUser] = useStore('user');
  const { currentUser } = useContext(AuthContext);


  useEffect(() => {
    const getPost = async () => {
      try {
        console.log(currentUser?.uid);
        // Check if the post already exists
        let { data: savedData, error } = await supabase
          .from('saved_post')
          .select('*')
          .eq('postId', postId)
          .eq('user_id', currentUser.uid);

        if (error) throw error;

        // console.log(savedData);



        setSavedPost(savedData);


        
      } catch (error) {
        console.log(error.message);
        setError(error);
      } finally {
        setLoading(false);
      }

    }
    getPost();
  }, [postId]);

  return { savedPost, loading, error };
};



const Signlepost = () => {
  const record = useRecordContext();
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [following, setFollowing] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [open, setOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [cart, setCart] = useState(null);
  const [cart_id, setCartID] = useStore("cart_id");
  const { theme } = useContext(ThemeContext);
  const realtimeData = useSupabaseRealtime();
  const uuid = uuidv4();
  const [activeIndex, setActiveIndex] = useState(0);
  const splideRef = React.useRef(); // Create the ref
  // Attach an event listener after the Splide instance is mounted

  // Function to add a unique view
  const addUniqueView = async (userId, videoId) => {
    const { data, error } = await supabase
      .from('viewers')
      .upsert(
        { user_id: userId, video_id: videoId, id: uuid, viewed_at: new Date() },
        { onConflict: ['user_id', 'video_id'] }
      );

    if (error) {
      console.error('Error adding/updating viewer:', error);
    } else {
      console.log('Viewer added/updated:', data);
    }
  };
  // Effect to handle adding a view when the component mounts
  React.useEffect(() => {
    if (currentUser && currentUser.id && record && record.id) {
      addUniqueView(currentUser.id, record.id);
      // fetchTotalViews(record.id);
    }
  }, [currentUser, record]);


  useEffect(() => {
    if (!cart_id) {
      medusa.carts.create().then(({ cart }) => {
        setCartID(cart.id);
        setCart(cart)
      });
    } else {
      medusa.carts.retrieve(cart_id).then(({ cart }) => setCart(cart));
    }
    // console.log(cart);
  }, [cart_id, cart]);

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
  }, [activeIndex, splideRef.current]);

  const options = {
    perPage: 3,
    type: 'loop',
    pauseOnHover: false,
    pagination: false,
    arrows: false,
    gap: '10px',
    snap: true,
    perMove: 1,
    focus: 'center',
    isNavigation: true,
    drag: false,
  };


  useEffect(() => {
    if (record) {
      setPost(record)
      const fetchInitialData = async () => {
        let { data: initialData, error } = await supabase
          .from('followers')
          .select('*')
          .eq('followed_id', record?.uid);

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
          .match({ postId: record?.postId });

        if (error && status !== 406) throw error;
        setLiked(data.some(like => like.user_id === currentUser.uid));
        setLikes(data);
      }

      const loadComments = async () => {
        let { data, error } = await supabase
          .from('comments')
          .select('*')
          .eq("postId", id)
          .order('publishedAt', { ascending: false });

        if (error && status !== 406) throw error;
        setComments(data);
      };

      loadComments();
      fetchLikes();
      fetchInitialData();
    }

    return () => {

    }
  }, [record,]);



  // follow and unfollowe functionality 






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

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const savePost = async ({ filter }) => {
    try {
      // Check if the post already exists
      let { data: savedPost, error } = await supabase
        .from('saved_post')
        .select('*')
        .eq('postId', post.postId)
        .eq('user_id', currentUser.uid);

      if (error) throw error;

      // If the post does not exist, insert it
      if (!savedPost.length) {
        let { error } = await supabase
          .from('saved_post')
          .insert({
            postId: post.postId,
            user_id: currentUser.uid,
            coll_name: filter && filter === 'general' ? (filter) : (null)
          })
          .single();

        if (error) throw error;


        toast("Post saved");
      } else {
        const { data, error } = await supabase
          .from('saved_post')
          .update({ coll_name: filter && filter !== 'general' ? (filter) : (null) })
          .eq('postId', post.postId)
          .eq('user_id', currentUser.uid)
          .select();



        if (error) throw error;
        console.log(filter);
        toast(`Post moved to ${filter} collection.`);
      }
    } catch (error) {
      console.log(error.message);
    }
  }


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


  // fetch comments from the database 



  const handleClickOpen = () => {
    setOpen(true);
    setIsMuted(true);
  };



  const mPostCarousel = {
    type: 'slide',
    pauseOnHover: false,
    pagination: true,
    arrows: false,
  };

  const posterUrl = post?.posterUrl;

  const mediaUrl = post && post.media && post.media.length > 0 ? post.media[0] : null;
  const isImage = mediaUrl && (mediaUrl.includes('.jpg') || mediaUrl.includes('.jpeg') || mediaUrl.includes('.png'));




  return (
    <>
      {post ? (
        <>
          {/* <div className='post__header'>
            <DHeader  />
          </div> */}
          <div className='Destktop__sProducts feed--page'>
            <Link to={post.URL === 'posts' ? '/dashboard' : `/${post.URL}`}>
              <img className='back' src={backIcon} alt='back' />
            </Link>
            <div className='Destktop__sProduct__container'>
              <Splide options={mPostCarousel} className='mobile--post-splide w-[409px] tablet:w-full'>
                {Array.isArray(post.media) && post.media.map((mediaUrl, index) => {
                  const isImage = mediaUrl.includes('.jpg') || mediaUrl.includes('.jpeg') || mediaUrl.includes('.png');
                  return (
                    <SplideSlide key={index} className='w-[409px] overflow-hidden tablet:w-full'>

                      <div className='sProduct__img' >
                        {isImage ? (
                          <img src={mediaUrl} alt={`Image ${index}`} />
                        ) : (

                          <ShowVideoBox onClick={handleClickOpen} url={mediaUrl} posterUrl={index === 0 ? post.posterUrl : null} isMuted={isMuted} post={post} isPlaying={isPlaying} />
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
                      </div>


                    </SplideSlide>
                  );
                })}
              </Splide>
              <div className='sProduct__contents'>
                {/* top content starts here  */}
                <div className='top__content'>
                  <div className='name-followers'>
                    <ul>

                      <li className='initials'>
                        <Link to={`/users/${post.uid}/show`}>
                          <Avatar sx={{ width: '50px', height: "50px" }}
                            src={post.photoURL}
                          />
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
                    <ul>
                      <li className='follow' onClick={following ? unfollow : follow}>{following ? 'Followed' : 'Follow'}</li>
                      <li className='cart relative'>
                        <Link to="/cart">
                          <img className='w-[30px] h-[30px]' src={cartImg} alt='cart' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                          <span className='absolute bg-black  rounded-full top-[-.7rem] left-0 right-[-.7rem] flex justify-center items-center text-[8px] w-[15px] h-[15px]' style={{ backgroundColor: theme === "light" ? "#222" : "#444", color: theme === "light" ? "#fff" : "#fff", }}>
                            {cart && cart.items ? cart.items.length : '0'}
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* top content ends here  */}

                {/* middle content starts here  */}
                <div className='middle__content'>
                  <ul>
                    <li className='userName'>{post.name}</li>
                    <li className='socials__icons'>
                      <ul>
                        {/* <li><img src={shareIcon} alt='share' /></li> */}
                        <li><img src={fb} alt='share' /></li>
                        <li><img src={IG} alt='share' /></li>
                      </ul>
                    </li>
                  </ul>

                  {post.body && (
                    <div className="post__body">{post.body}</div>
                  )}
                  <div className='post__likes'>
                    <ul className='comment__likes'>
                      <li>
                        <ul className='comment__left1'>
                          <IconButton onClick={toggleLike} aria-label="Like" className='likeBtn p-0'>
                            <img src={commentIcon} alt='' className='likeImg' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                            {liked ? (
                              <AiFillHeart className='like' color={theme === "light" ? "#222" : "#fff"} />
                            ) : (
                              <AiOutlineHeart className='like' color={theme === "light" ? "#222" : "#fff"} />
                            )}
                          </IconButton>

                          <li>

                            <span>
                              {likes.length || 0}
                            </span>


                            {likes.length < 2 ? (
                              <span>like</span>
                            ) : (
                              <span>likes</span>
                            )}
                          </li>
                        </ul>
                      </li>
                      <li>
                        <ul className='comment__left2'>
                          <IconButton aria-label="Comment">
                            <AiOutlineComment className='comment__icons' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                          </IconButton>
                          <li>{comments.length || 0}</li>
                        </ul>
                      </li>
                    </ul>
                  </div>



                </div>
                {/* middle content ends here  */}

                {/* last content/comment section starts here  */}

                <div className='post__bottom__section'>
                  <Comments postId={id} comments={comments} setComments={setComments} />
                </div>
                {/* last content/comment section ends here  */}



              </div>
            </div>
            <div className=''>
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
            </div>

          </div>

          <MPost post={post} id={id} comments={comments} liked={liked} likes={likes} follow={follow} followers={followers} unfollow={unfollow} toggleLike={toggleLike} formatFollowers={formatFollowers} following={following} savePost={savePost} cart={cart} />
        </>
      ) : (
        <div className='spinner'>

          <CircularProgress sx={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
        </div>
      )}
    </>
  );
};

export default Signlepost