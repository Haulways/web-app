import * as React from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SendIcon from "@mui/icons-material/Send";
import { AiOutlineComment, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "./DialogBox.css";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LiveCarousels, ShowPageCarousels, SmallProductCard } from "../card/ShowCard";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { PurchaseDialog } from "./PurchaseDialog";
import { XVideoPlayer } from "../videoPlayer/VideoPlayer";
import chatlike from "../../assets/chatlike.png";
import save from "../../assets/postImg-Icons/save.png";
import liveIcon from "../../assets/liveIcon.png";
import sendIcon from "../../assets/sendIcon.png";
import { useState } from "react";
import { supabase } from "../../supabase/SupabaseConfig";
import { v4 as uuidv4 } from "uuid";
import { InfiniteList, WithListContext, useDataProvider, useGetList, useRefresh } from "react-admin";
import { Avatar, useMediaQuery } from "@mui/material";
import Conference from "../LiveComponents/conference/Conference";
import {  selectHLSState, selectHMSMessages, selectPeers, useAVToggle, useHMSActions, useHMSStore } from "@100mslive/react-sdk";
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import VideocamIcon from '@mui/icons-material/Videocam';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import { ThemeContext } from "../context/ThemeProvider";
import { useEffect } from "react";
import { Tag2 } from "../productTag/AddTag";





export const FullScreenDialog = ({ liked, open, handleClose, post, currentUser, toggleLike, savePost, likes2 }) => {
    const [currentMediaUrl, setCurrentMediaUrl] = useState(null);
    const [openCard, setOpenCard] = React.useState(false);
    const [openActions, setOpenActions] = React.useState(true);
    const [newCommentText, setNewCommentText] = React.useState("");
    const [thumbnailCarousel, setThumbnailCarousel] = React.useState(null);
    const [mainCarousel, setMainCarousel] = React.useState(null);
    const [openPurchase, setOpenPurchase] = React.useState(false);
    const [openPurchase1, setOpenPurchase1] = React.useState(true);
    const [showComments, setShowComments] = React.useState(true);
    const [showCarousels, setShowCarousels] = React.useState(true);
    const [initialPost, setInitialPost] = React.useState(post);
    const [isMuted, setIsMuted] = React.useState(true);
    const navigate = useNavigate();
 
   
    const { theme } = React.useContext(ThemeContext);
    const isSmall = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const useFetchMultipleLists = (resources) => {
        const dataProvider = useDataProvider();
        const [data, setData] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
            const fetchResources = async () => {
                try {
                    const dataPromises = resources.map((resource) =>
                        dataProvider.getList(resource, {
                            pagination: { page: 1, perPage: 1000 },
                            sort: { field: "id", order: "ASC" },
                            filter: {},
                        })
                    );

                    const results = await Promise.all(dataPromises);
                    const seenIds = new Set();
                    const combinedData = results.reduce((acc, { data }) => {
                        const uniqueData = data.filter((item) => {
                            if (!seenIds.has(item.id)) {
                                seenIds.add(item.id);
                                return true;
                            }
                            return false;
                        });
                        return [...acc, ...uniqueData];
                    }, []);
                    const filteredRecommendation = combinedData.filter(
                        (item) => item.id !== initialPost.id
                    );
                    setData(filteredRecommendation);
                } catch (e) {
                    setError(e);
                } finally {
                    setLoading(false);
                }
            };

            fetchResources();
        }, [dataProvider, resources]);

        return { data, loading, error };
    };

    const tables = ["posts", "hauls", "lookbook", "diy", "grwm"];
    const { data: recommendation } = useFetchMultipleLists(tables);

    const { data: ads, total, isLoading, error, refetch } = useGetList(
        'ads');

    const item = recommendation?.find((item) =>
        ads?.some((ad) => ad?.post_id === item?.id)
    );

    const Aditem = ads?.find((ad) => ad?.post_id === initialPost?.id);


    // console.log(item)

     

    React.useEffect(() => {
        setInitialPost(post);
    }, [post]);


    const toggleComments = (e) => {
        setShowComments(!showComments);
    };

    React.useEffect(() => {
        if (thumbnailCarousel && mainCarousel) {
            thumbnailCarousel.sync(mainCarousel);
        }
    }, [thumbnailCarousel, mainCarousel]);

    



    // purchase dialog
    const handlePurchase = () => {
        setOpenPurchase(true);
        setOpenActions(false);
        setShowComments(false);
        setShowCarousels(false);
    };

    const handleClosePurchase = () => {
        setOpenPurchase(false);
        setOpenActions(true);
        setShowComments(true);
        setShowCarousels(true);

    };

    const handleOpenPurchase1 = () => {
        setOpenPurchase1(true);
    };

    const handleClosePurchase1 = () => {
        setOpenPurchase1(false);
        handleClosePurchase();
    };

    const handleOpenCard = () => {
        setOpenCard(true);
        setOpenActions(false);
    };

    const handleCloseCard = () => {
        setOpenActions(true);
        setOpenCard(false);
    };
    
    
    const goToChat = () => {
        navigate('/chats', { state: { url: `http://haulway-demo-project.web.app${location.pathname}` } });
    };

    

    const uuid = uuidv4();

    // upload the comments to the database
    const handleAddComment = async () => {
        if (newCommentText.trim() !== "") {
            const newComment = {
                id: uuid,
                postId: initialPost.postId,
                uid: currentUser.uid,
                authorId: currentUser.uid,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
                commentText: newCommentText,
                publishedAt: new Date(),
            };

            try {
                await supabase.from("comments").insert([newComment]);
                setNewCommentText("");
            } catch (error) {
                toast.error(error.message);
            }
        }
    };


    const handleVideoEnd = () => {
        if (mainCarousel) {
            mainCarousel.go("+1"); // Slide to the next video
        }
    };

    const mainCarouselOptions = {
        type: "slide",
        pauseOnHover: false,
        pagination: false,
        arrows: false,
        rewind: true,
    };

    const fullScreenOption = {
        direction: "ttb",
        height: "100vh",
        type: "slide",
        pauseOnHover: false,
        pagination: false,
        arrows: false,
    };

    const mediaUrl = initialPost.media[0] || recommendation.media[0]; // Get the URL of the single media file

    const isImage =
        mediaUrl.includes(".jpg") ||
        mediaUrl.includes(".jpeg") ||
        mediaUrl.includes(".png");

    return (
        <div>
            {isSmall && (
                <Dialog
                    fullScreen
                    open={open}
                    onClose={handleClose}
                    sx={{
                        "& .MuiBox-root": {
                            padding: "0 !important",
                        },
                    }}
                    PaperProps={{ style: { bgcolor: "#222" } }}
                >
                    <InfiniteList
                        title=" "
                        resource="posts"
                        actions={false}
                        sx={{
                            "& .MuiToolbar-root": {
                                minHeight: "0px !important",
                            },
                            "& .MuiBox-root": {
                                padding: "0 ",
                            },
                        }}
                    >
                        <Splide
                            id="main-carousel"
                            options={{
                                ...fullScreenOption,
                            }}
                        >
                            <>
                                {initialPost && (
                                    <SplideSlide key={-1} className="">
                                        <div>
                                            {/* Background imgae/ video */}
                                            <div className="w-screen h-screen">
                                                {/* background image/video */}
                                                <Splide
                                                    id="main-carousel"
                                                    options={mainCarouselOptions}
                                                    onReady={(splide) => setMainCarousel(splide)}
                                                >
                                                    {Array.isArray(initialPost?.media) &&
                                                        initialPost.media
                                                            .slice(0, 4)
                                                            .map((mediaUrl, index) => {
                                                                const isImage =
                                                                    mediaUrl.includes(".jpg") ||
                                                                    mediaUrl.includes(".jpeg") ||
                                                                    mediaUrl.includes(".png");
                                                                return (
                                                                    <SplideSlide
                                                                        key={index}
                                                                        className="w-screen h-screen youtube--container"
                                                                    >
                                                                        {isImage ? (
                                                                            <img
                                                                                className="h-full w-full object-cover"
                                                                                src={mediaUrl}
                                                                                alt={initialPost.name}
                                                                            />
                                                                        ) : (
                                                                            <XVideoPlayer
                                                                                url={mediaUrl}
                                                                                post={initialPost}
                                                                                posterUrl={
                                                                                    index === 0
                                                                                        ? initialPost.posterUrl
                                                                                        : null
                                                                                }
                                                                                key={index}
                                                                                onVideoEnded={handleVideoEnd}
                                                                                isImage={isImage}
                                                                                isMuted={isMuted}
                                                                                toggleMute={toggleMute}
                                                                            />
                                                                        )}
                                                                    </SplideSlide>
                                                                );
                                                            })}
                                                </Splide>
                                            </div>

                                            <button
                                                className="close__btn"
                                                edge="start"
                                                color="inherit"
                                                onClick={() =>
                                                    handleClose({
                                                        postId: initialPost.postId,
                                                        resource: initialPost.URL,
                                                        page: "show",
                                                    })
                                                }
                                                aria-label="close"
                                            >
                                                <CloseIcon />
                                            </button>

                                            {/* Right hand side modal content goes here */}
                                            {openActions && (
                                                <div
                                                    className={
                                                        showComments &&
                                                            initialPost.taggedProducts.length > 0
                                                            ? "Right-modal-container"
                                                            : "Right-modal-container bottom-[25%]"
                                                    }
                                                >
                                                    <Link to={`/users/${initialPost.uid}/show`}>
                                                        <button aria-label="name" className="brand__name">
                                                            <Avatar
                                                                sx={{ width: "50px", height: "50px" }}
                                                                src={initialPost.photoURL}
                                                            />
                                                        </button>
                                                    </Link>

                                                    <div className="bg-black rounded-full w-[45px] h-[45px]">
                                                        <IconButton
                                                            onClick={toggleLike}
                                                            aria-label="Like"
                                                            className="likeBtn bg-black rounded-full w-[45px] h-[45px]"
                                                        >
                                                            <img
                                                                src={chatlike}
                                                                alt=""
                                                                className="likeImg1"
                                                            />
                                                            {liked ? (
                                                                <AiFillHeart className="likeMe" />
                                                            ) : (
                                                                <AiOutlineHeart className="likeMe" />
                                                            )}
                                                        </IconButton>
                                                    </div>

                                                    {Aditem?.post_id === initialPost?.id ? null : (
                                                        <>
                                                            <div
                                                                onClick={toggleComments}
                                                                className="bg-black rounded-full w-[45px] h-[45px]"
                                                            >
                                                                <IconButton
                                                                    aria-label="Comment"
                                                                    className="bg-black rounded-full w-[45px] h-[45px]"
                                                                >
                                                                    <AiOutlineComment className="comment__icon" />
                                                                </IconButton>
                                                            </div>

                                                            <div
                                                                className="bg-black rounded-full w-[45px] h-[45px]"
                                                                onClick={savePost}
                                                            >
                                                                <IconButton
                                                                    aria-label="Comment"
                                                                    className="bg-black rounded-full w-[45px] h-[45px]"
                                                                >
                                                                    <img
                                                                        className=" h-[30px] w-[30px]"
                                                                        src={save}
                                                                        alt="cart"
                                                                    />
                                                                </IconButton>
                                                            </div>

                                                            <div
                                                                className="bg-black rounded-full w-[45px] h-[45px]"
                                                                // onClick={handleOpenCard}
                                                                onClick={goToChat}

                                                            >
                                                                <IconButton
                                                                    aria-label="Comment"
                                                                    className="bg-black rounded-full w-[45px] h-[45px]"
                                                                >
                                                                    <SendIcon className="text-white h-[30px] w-[30px]" />
                                                                </IconButton>
                                                            </div>
                                                            {/* <div
                                                                className="bg-black rounded-full w-[45px] h-[45px]"
                                                                onClick={handleOpenCard}
                                                            >
                                                                <IconButton
                                                                    aria-label="Comment"
                                                                    className="bg-black rounded-full w-[45px] h-[45px]"
                                                                >
                                                                    <ExpandLessIcon className="text-white h-[30px] w-[30px]" />
                                                                </IconButton>
                                                            </div> */}
                                                        </>
                                                    )}
                                                </div>
                                            )}

                                            {/* catalogue container  */}
                                            <div className="catalogue">
                                                {openCard && (
                                                    <SmallProductCard
                                                        handleCloseCard={handleCloseCard}
                                                        openCard={openCard}
                                                        setThumbnailCarousel={setThumbnailCarousel}
                                                        post={initialPost}
                                                    />
                                                )}
                                            </div>

                                            {/* comments middle container modal */}
                                            {showComments && (
                                                <div
                                                    className={
                                                        initialPost.taggedProducts.length > 0
                                                            ? "comment-modal-container"
                                                            : "comment-modal-container bottom-[8rem]"
                                                    }
                                                >
                                                    <InfiniteList
                                                        resource="comments"
                                                        actions={false}
                                                        title=" "
                                                        sx={{
                                                            "& .MuiToolbar-root": {
                                                                minHeight: "0px !important",
                                                                backgroundColor: "transparent !important",
                                                                color: "#fff",
                                                            },
                                                            "& .RaList-content": {
                                                                backgroundColor: "transparent !important",
                                                                color: "#fff",
                                                            },
                                                            backgroundColor: "transparent !important",
                                                            color: "#fff",
                                                        }}
                                                    >
                                                        <WithListContext
                                                            render={({ isLoading, data }) =>
                                                                !isLoading && (
                                                                    <>
                                                                        <span>
                                                                            {data &&
                                                                                data
                                                                                    .filter(
                                                                                        (pst) =>
                                                                                            pst.postId ===
                                                                                            initialPost.postId
                                                                                    )
                                                                                    .sort(
                                                                                        (a, b) =>
                                                                                            b.publishedAt - a.publishedAt
                                                                                    )
                                                                                    .map((comment) => (
                                                                                        <React.Fragment key={comment.id}>
                                                                                            <div>
                                                                                                <ul className="User__comments">
                                                                                                    <img
                                                                                                        className="w-[40px] flex-shrink-0 h-[40px] rounded-full"
                                                                                                        src={comment.photoURL}
                                                                                                        alt={comment.displayName}
                                                                                                    />

                                                                                                    <li className="comment__details">
                                                                                                        <span className="comment__name">
                                                                                                            {currentUser.uid ===
                                                                                                                comment.uid
                                                                                                                ? "You"
                                                                                                                : comment.displayName}
                                                                                                        </span>
                                                                                                        <span className="comment__text">
                                                                                                            {comment.commentText}
                                                                                                        </span>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </div>
                                                                                        </React.Fragment>
                                                                                    ))}
                                                                        </span>
                                                                    </>
                                                                )
                                                            }
                                                        />
                                                    </InfiniteList>
                                                </div>
                                            )}

                                            {/* initialPost carousel container */}
                                            {showCarousels && (
                                                <div
                                                    className={
                                                        showComments &&
                                                            initialPost.taggedProducts.length > 0
                                                            ? "showCard"
                                                            : "showCard bottom-[1.2rem]"
                                                    }
                                                >
                                                    {Array.isArray(initialPost.taggedProducts) &&
                                                        initialPost.taggedProducts.map(
                                                            (mediaUrl, index) => (
                                                                <React.Fragment key={index}>
                                                                    <ShowPageCarousels
                                                                        handlePurchase={handlePurchase}
                                                                        handleOpenPurchase1={handleOpenPurchase1}
                                                                        post={initialPost}
                                                                        mediaUrl={mediaUrl}
                                                                        setCurrentMediaUrl={setCurrentMediaUrl}
                                                                    />
                                                                </React.Fragment>
                                                            )
                                                        )}
                                                </div>
                                            )}
                                            {/* Comments box modal container */}
                                            {Aditem?.post_id === initialPost?.id ? null : (
                                                <>
                                                    {showComments && (
                                                        <div className="Showcomment__box">
                                                            <textarea
                                                                type="text"
                                                                placeholder="Add a comment"
                                                                className="commentInput"
                                                                rows={1}
                                                                style={{ resize: "none" }}
                                                                value={newCommentText}
                                                                onChange={(e) =>
                                                                    setNewCommentText(e.target.value)
                                                                }
                                                            />
                                                            <button onClick={handleAddComment}>
                                                                <img src={sendIcon} alt="post" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </>
                                            )}

                                            {/* Purchase dialog box */}

                                            <PurchaseDialog
                                                theme={theme}
                                                openPurchase={openPurchase}
                                                handleClosePurchase={handleClosePurchase}
                                                handleClosePurchase1={handleClosePurchase1}
                                                openPurchase1={openPurchase1}
                                                setOpenPurchase1={setOpenPurchase1}
                                                post={initialPost}
                                                isImage={isImage}
                                                mediaUrl={initialPost.media[0]}
                                                product={currentMediaUrl}
                                            />
                                            {Aditem?.post_id === initialPost?.id && <div className="fixed bottom-[2rem] left-[1rem] bg-[#fff] bg-opacity-50 text-[10px] px-[.6rem] py-[0.2rem] rounded-full">Sponsored</div>}
                                        </div>
                                    </SplideSlide>
                                )}

                                {recommendation &&
                                    recommendation?.map((postItem, index) => (
                                        <React.Fragment key={postItem.id}>
                                            <Recommended
                                                postItem={postItem}
                                                index={index}
                                                data={likes2}
                                                handleClose={handleClose}
                                                currentUser={currentUser}
                                                recommendedAd={item}
                                            />
                                        </React.Fragment>
                                    ))}
                            </>
                        </Splide>
                    </InfiniteList>
                </Dialog>
            )}
        </div>
    );
};

const Recommended = ({ index, postItem, data, handleClose,
    currentUser, recommendedAd }) => {
    const [currentMediaUrl, setCurrentMediaUrl] = useState(null);
    const [openCard, setOpenCard] = React.useState(false);
    const [openActions, setOpenActions] = React.useState(true);
    const [newCommentText, setNewCommentText] = React.useState("");
    const [thumbnailCarousel, setThumbnailCarousel] = React.useState(null);
    const [mainCarousel, setMainCarousel] = React.useState(null);
    const [openPurchase, setOpenPurchase] = React.useState(false);
    const [openPurchase1, setOpenPurchase1] = React.useState(true);
    const [showComments, setShowComments] = React.useState(true);
    const [showCarousels, setShowCarousels] = React.useState(true);
    const [isMuted, setIsMuted] = React.useState(true);
    const [liked2, setLiked2] = React.useState(false);
    const { theme } = React.useContext(ThemeContext);
    const refresh = useRefresh();



    React.useEffect(() => {
        if (data.length > 0) {
            setLiked2(data.filter(pst => pst.postId === postItem.postId).some(like => like.user_id === currentUser.uid));
        }

        const likesSubscription = supabase
            .channel('room1')
            .on('postgres_changes', { event: '*', schema: '*', table: 'likes', filter: `postId=eq.${postItem?.postId}` }, payload => {
                console.log('Change received!', payload);
                // If new like is added
                if (payload.new) {
                    if (payload.new.user_id === currentUser.uid) {
                        // Like is made by the currentUser
                        setLiked2(true);

                    }
                }
                // If like is removed
                else if (payload.old) {
                    if (payload.old.user_id === currentUser.uid) {
                        // Like is removed by the currentUser
                        setLiked2(false);
            
                    }
                }
            })
            .subscribe();
      

        return () => {
            supabase.removeChannel(likesSubscription);
        };
    }, [liked2, data, postItem]);



    const like = async () => {
        try {
            const { error } = await supabase
                .from('likes')
                .insert([{
                    postId: postItem.postId,
                    user_id: currentUser.uid,
                }]);
            if (error) throw error;
         
            setLiked2(true);
            refresh()
        } catch (error) {
            console.log(error.message);
        }
    };
     
    const unlike = async () => {
        try {
            const { error } = await supabase
                .from('likes')
                .delete()
                .match({ postId: postItem.postId, user_id: currentUser.uid });
                
            if (error) throw error;
            setLiked2(false);
            refresh()
        } catch (error) {
            console.log(error.message);
        }
    };
    
    const savePost = async () => {
        try {
            // Check if the post already exists
            let { data: savedPost, error } = await supabase
                .from('saved_post')
                .select('*')
                .eq('postId', postItem.postId)
                .eq('user_id', currentUser.uid);
    
            if (error) throw error;
    
            // If the post does not exist, insert it
            if (!savedPost.length) {
                let { error } = await supabase
                    .from('saved_post')
                    .insert({
                        postId: postItem.postId,
                        user_id: currentUser.uid,
                    })
                    .single();
    
                if (error) throw error;
    
                toast("Post saved");
            } else {
                toast("Post already saved");
            }
        } catch (error) {
            console.log(error.message);
        }
    }
     

    const toggleLike2 = async () => {
        if (liked2) {
            await unlike();
        } else {
            await like();
        }
    };

    const toggleComments = (e) => {
        setShowComments(!showComments);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    // purchase dialog
    const handlePurchase = () => {
        setOpenPurchase(true);
        setOpenActions(false);
        setShowComments(false);
        setShowCarousels(false);
    };

    const handleClosePurchase = () => {
        setOpenPurchase(false);
        setOpenActions(true);
        setShowComments(true);
        setShowCarousels(true);

    };

    const handleOpenPurchase1 = () => {
        setOpenPurchase1(true);
    };

    const handleClosePurchase1 = () => {
        setOpenPurchase1(false);
        handleClosePurchase();
    };

    const handleOpenCard = () => {
        setOpenCard(true);
        setOpenActions(false);
    };

    const handleCloseCard = () => {
        setOpenActions(true);
        setOpenCard(false);
    };

    const uuid = uuidv4();

    const handleAddComment2 = async () => {
        if (newCommentText.trim() !== "") {
            const newComment = {
                id: uuid,
                postId: postItem.postId,
                uid: currentUser.uid,
                authorId: currentUser.uid,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
                commentText: newCommentText,
                publishedAt: new Date(),
            };

            try {
                await supabase.from("comments").insert([newComment]);
                setNewCommentText("");
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    const handleVideoEnd = () => {
        if (mainCarousel) {
            mainCarousel.go("+1"); // Slide to the next video
        }
    };

    const mainCarouselOptions = {
        type: "slide",
        pauseOnHover: false,
        pagination: false,
        arrows: false,
        rewind: true,
    };

    const mediaUrl = postItem.media[0]; // Get the URL of the single media file

    const isImage =
        mediaUrl.includes(".jpg") ||
        mediaUrl.includes(".jpeg") ||
        mediaUrl.includes(".png");


    return (
        <>
            <SplideSlide key={index} className="">
                <div>
                    {/* Background imgae/ video */}
                    <div className="w-screen h-screen">
                        {/* background image/video */}
                        <Splide
                            id="main-carousel"
                            options={mainCarouselOptions}
                            onReady={(splide) => setMainCarousel(splide)}
                        >
                            {Array.isArray(postItem?.media) &&
                                postItem.media.slice(0, 4).map((mediaUrl, index) => {
                                    const isImage =
                                        mediaUrl.includes(".jpg") ||
                                        mediaUrl.includes(".jpeg") ||
                                        mediaUrl.includes(".png");
                                    return (
                                        <SplideSlide
                                            key={index}
                                            className="w-screen h-screen youtube--container"
                                        >
                                            {isImage ? (
                                                <img
                                                    className="h-full w-full object-cover"
                                                    src={mediaUrl}
                                                    alt={postItem.name}
                                                />
                                            ) : (
                                                <XVideoPlayer
                                                    post={postItem}
                                                    url={mediaUrl}
                                                    posterUrl={index === 0 ? postItem.posterUrl : null}
                                                    key={index}
                                                    onVideoEnded={handleVideoEnd}
                                                    isImage={isImage}
                                                    isMuted={isMuted}
                                                    toggleMute={toggleMute}
                                                />
                                            )}
                                        </SplideSlide>
                                    );
                                })}
                        </Splide>
                    </div>

                    <button
                        className="close__btn"
                        edge="start"
                        color="inherit"
                        onClick={() =>
                            handleClose({
                                postId: postItem.postId,
                                resource: postItem.URL,
                                page: "show",
                            })
                        }
                        aria-label="close"
                    >
                        <CloseIcon />
                    </button>

                    {/* Right hand side modal content goes here */}
                    {openActions && (
                        <div
                            className={
                                showComments && postItem.taggedProducts.length > 0
                                    ? "Right-modal-container"
                                    : "Right-modal-container bottom-[25%]"
                            }
                        >
                            <Link to={`/users/${postItem.uid}/show`}>
                                <button aria-label="name" className="brand__name">
                                    <Avatar
                                        sx={{ width: "50px", height: "50px" }}
                                        src={postItem.photoURL}
                                    />
                                </button>
                            </Link>

                            <div className="bg-black rounded-full w-[45px] h-[45px]">
                                <IconButton
                                    onClick={toggleLike2}
                                    aria-label="Like"
                                    className="likeBtn bg-black rounded-full w-[45px] h-[45px]"
                                >
                                    <img src={chatlike} alt="" className="likeImg1" />
                                    {liked2 ? (
                                        <AiFillHeart className="likeMe" />
                                    ) : (
                                        <AiOutlineHeart className="likeMe" />
                                    )}
                                </IconButton>
                            </div>

                            {recommendedAd?.id === postItem?.id ? null : (
                                <>
                                    <div
                                        onClick={toggleComments}
                                        className="bg-black rounded-full w-[45px] h-[45px]"
                                    >
                                        <IconButton
                                            aria-label="Comment"
                                            className="bg-black rounded-full w-[45px] h-[45px]"
                                        >
                                            <AiOutlineComment className="comment__icon" />
                                        </IconButton>
                                    </div>

                                    <div
                                        className="bg-black rounded-full w-[45px] h-[45px]"
                                        onClick={savePost}
                                    >
                                        <IconButton
                                            aria-label="Comment"
                                            className="bg-black rounded-full w-[45px] h-[45px]"
                                        >
                                            <img
                                                className=" h-[30px] w-[30px]"
                                                src={save}
                                                alt="cart"
                                            />
                                        </IconButton>
                                    </div>

                                    <div
                                        className="bg-black rounded-full w-[45px] h-[45px]"
                                        onClick={handleOpenCard}
                                    >
                                        <IconButton
                                            aria-label="Comment"
                                            className="bg-black rounded-full w-[45px] h-[45px]"
                                        >
                                            <ExpandLessIcon className="text-white h-[30px] w-[30px]" />
                                        </IconButton>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* catalogue container  */}
                    <div className="catalogue">
                        {openCard && (
                            <SmallProductCard
                                handleCloseCard={handleCloseCard}
                                openCard={openCard}
                                setThumbnailCarousel={setThumbnailCarousel}
                                post={postItem}
                            />
                        )}
                    </div>

                    {/* comments middle container modal */}
                    {showComments && (
                        <div
                            className={
                                postItem.taggedProducts.length > 0
                                    ? "comment-modal-container"
                                    : "comment-modal-container bottom-[8rem]"
                            }
                        >
                            <InfiniteList
                                resource="comments"
                                actions={false}
                                title=" "
                                sx={{
                                    "& .MuiToolbar-root": {
                                        minHeight: "0px !important",
                                        backgroundColor: "transparent !important",
                                        color: "#fff",
                                    },
                                    "& .RaList-content": {
                                        backgroundColor: "transparent !important",
                                        color: "#fff",
                                    },
                                    backgroundColor: "transparent !important",
                                    color: "#fff",
                                }}
                            >
                                <WithListContext
                                    render={({ isLoading, data }) =>
                                        !isLoading && (
                                            <>
                                                <span>
                                                    {data &&
                                                        data
                                                            .filter((pst) => pst.postId === postItem.postId)
                                                            .sort((a, b) => b.publishedAt - a.publishedAt)
                                                            .map((comment) => (
                                                                <React.Fragment key={comment.id}>
                                                                    <div>
                                                                        <ul className="User__comments">
                                                                            <img
                                                                                className="w-[40px] flex-shrink-0 h-[40px] rounded-full"
                                                                                src={comment.photoURL}
                                                                                alt={comment.displayName}
                                                                            />

                                                                            <li className="comment__details">
                                                                                <span className="comment__name">
                                                                                    {currentUser.uid === comment.uid
                                                                                        ? "You"
                                                                                        : comment.displayName}
                                                                                </span>
                                                                                <span className="comment__text">
                                                                                    {comment.commentText}
                                                                                </span>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </React.Fragment>
                                                            ))}
                                                </span>
                                            </>
                                        )
                                    }
                                />
                            </InfiniteList>
                        </div>
                    )}

                    {/* postItem carousel container */}
                    {showCarousels && (
                        <div
                            className={
                                showComments && postItem.taggedProducts.length > 0
                                    ? "showCard"
                                    : "showCard bottom-[1.2rem]"
                            }
                        >
                            {Array.isArray(postItem.taggedProducts) &&
                                postItem.taggedProducts.map((mediaUrl, index) => (
                                    <React.Fragment key={index}>
                                        <ShowPageCarousels
                                            handlePurchase={handlePurchase}
                                            handleOpenPurchase1={handleOpenPurchase1}
                                            post={postItem}
                                            mediaUrl={mediaUrl}
                                            setCurrentMediaUrl={setCurrentMediaUrl}
                                        />
                                    </React.Fragment>
                                ))}
                        </div>
                    )}

                    {/* Comments box modal container */}
                    {recommendedAd?.id === postItem?.id ? null : (
                        <>
                            {showComments && (
                                <div className="Showcomment__box">
                                    <textarea
                                        type="text"
                                        placeholder="Add a comment"
                                        className="commentInput"
                                        rows={1}
                                        style={{ resize: "none" }}
                                        value={newCommentText}
                                        onChange={(e) => setNewCommentText(e.target.value)}
                                    />
                                    <button onClick={handleAddComment2}>
                                        <img src={sendIcon} alt="post" />
                                    </button>
                                </div>
                            )}
                        </>
                    )}

                    {/* Purchase dialog box */}

                    <PurchaseDialog
                        theme={theme}
                        openPurchase={openPurchase}
                        handleClosePurchase={handleClosePurchase}
                        handleClosePurchase1={handleClosePurchase1}
                        openPurchase1={openPurchase1}
                        setOpenPurchase1={setOpenPurchase1}
                        post={postItem}
                        isImage={isImage}
                        mediaUrl={postItem.media[0]}
                        product={currentMediaUrl}
                    />
                    {recommendedAd?.id === postItem?.id && (
                        <div className="fixed bottom-[2rem] left-[1rem] bg-[#fff] bg-opacity-50 text-[10px] px-[.6rem] py-[0.2rem] rounded-full">
                            Sponsored
                        </div>
                    )}
                </div>
            </SplideSlide>
        </>
    );
};



export const LiveScreenDialog = ({ open, handleClose, rooms, currentUser, user, broadcasterImg, broadcasterData }) => {
    const [mainCarousel, setMainCarousel] = React.useState(null);
    const [currentMediaUrl, setCurrentMediaUrl] = useState(null);
    const [showComments, setShowComments] = React.useState(false);
    const { theme } = React.useContext(ThemeContext);
    const [showCarousels, setShowCarousels] = React.useState(true);
    const isSmall = useMediaQuery((themes) => themes.breakpoints.down("sm"));
    const {
        isLocalAudioEnabled,
        isLocalVideoEnabled,
        toggleAudio,
        toggleVideo
    } = useAVToggle();
    const hlsState = useHMSStore(selectHLSState);
    const hmsActions = useHMSActions();
    const allMessages = useHMSStore(selectHMSMessages); // get all messages
    const [inputValues, setInputValues] = useState("");
    const [unreadMessages, setUnreadMessages] = useState([]);
    const [taggedData, setTaggedData] = useState([]);
    const [tags, setTags] = React.useState(false);
    const [openPurchase, setOpenPurchase] = React.useState(false);
    const [openPurchase1, setOpenPurchase1] = React.useState(false);
    const [openActions, setOpenActions] = React.useState(true);

   // purchase dialog
    const handlePurchase = () => {
        setOpenPurchase(true);
        setOpenActions(false);
        setShowComments(false);
        setShowCarousels(false);
    };

    const handleClosePurchase = () => {
        setOpenPurchase(false);
        setOpenActions(true);
        // setShowComments(true);
        setShowCarousels(true);

    };

    const handleOpenPurchase1 = () => {
        setOpenPurchase1(true);
    };

    const handleClosePurchase1 = () => {
        setOpenPurchase1(false);
        handleClosePurchase();
    };

    const openTags = () => {
        setTags(true);
    }

    const handleCloseTags = () => {
        setTags(false);
    }

    useEffect(() => {
        const newUnreadMessages = allMessages?.filter(message => message.read === false);
        setUnreadMessages(newUnreadMessages);
    }, [allMessages]);
    
    const handleInputChange = (e) => {
        setInputValues(e.target.value);
    };
    
    const sendMessage = async () => {
        try {
            await hmsActions.sendBroadcastMessage(inputValues);
            setInputValues("");
        } catch (e) {
            console.log(e);
        }
           
    };

    let broadcasterExists = false;
    const peers = (useHMSStore(selectPeers) || []).filter(peer => {
        if (peer.roleName === 'broadcaster') {
            if (broadcasterExists) {
                return false;
            } else {
                broadcasterExists = true;
                return true;
            }
        }
        return peer.roleName === 'cohost';
    });

    const viewers = (useHMSStore(selectPeers) || []).filter(
        peer =>
            peer.roleName === 'viewer'
    );




    
    
    



    // console.log(broadcasterImg);


          
   

    const toggleComments = async () => {
        setShowComments(!showComments);
        const readStatus = true; // true/false
        try {
            await hmsActions.setMessageRead(readStatus);
        } catch (e) {
            console.log(e)
        }
    };







    const mainCarouselOptions = {
        type: "slide",
        pauseOnHover: false,
        pagination: false,
        arrows: false,
        rewind: true,
    };




    return (
        <div className="feed--page">
            {isSmall && (
                <Dialog
                    fullScreen
                    open={open}
                    onClose={handleClose}
                    sx={{
                        "& .MuiBox-root": {
                            padding: "0 !important",
                        },
                    }}
                    PaperProps={{ style: { bgcolor: '#222' } }}
                >
                    {/* {rooms?.length === 0 && (
                        <p className="flex justify-center items-center text-white absolute top-0 left-0 bottom-0 right-0 z-[10000]">Live Stream Ended</p>
                    )} */}
                    {/* Background imgae/ video */}
                    <div className="w-screen h-full">
                        {/* background image/video */}
                        <Splide
                            id="main-carousel"
                            options={mainCarouselOptions}
                            onReady={(splide) => setMainCarousel(splide)}
                        >
                            
                            <SplideSlide
                                                
                                className="w-screen h-full youtube--container"
                            >
                                              
                                <Conference />
                                             
                            </SplideSlide>
                                   
                        </Splide>
                    </div>

                    <button
                        className="close__btn top-[15px] left-[10px] w-[30px] h-[30px] z-[20000]"
                        edge="start"
                        color="inherit"
                        onClick={
                            handleClose
                        }
                        aria-label="close"
                    >
                        <CloseIcon />
                    </button>

                    {broadcasterImg && (
                        <img src={liveIcon} alt='' className="absolute  top-[49px] left-[6px] right-0 w-[50px] h-[22.48px] z-[20000]" />
                    )}

                    {/* Right hand side modal content goes here */}
                    {openActions && (
                        <div
                            className={"Right-modal-container bottom-[20%]"}
                        >
                            {broadcasterImg && (
                                <>
                                    {/* <Link to={`/users/${post.uid}/show`}> */}
                                    <button aria-label="name" className="brand__name" style={{ border: '2px solid red' }}>
                                                        
                                        <Avatar sx={{ width: '50px', height: "50px" }}
                                            src={broadcasterImg}
                                        />
                                    </button>
                                    {/* </Link> */}

                                </>
                            )}

                            <div
                                onClick={toggleComments}
                                className="bg-black rounded-full w-[45px] h-[45px] relative"
                            >
                                {unreadMessages.length > 0 ? (
                                    <span className="w-[10px] h-[10px] rounded-full bg-[green] absolute top-[8px] left-[7px] z-[50]"></span>
                                ) : null}
                            
                                <IconButton
                                    aria-label="Comment"
                                    className="bg-black rounded-full w-[45px] h-[45px]"
                                >
                                    <AiOutlineComment className="comment__icon" />
                                </IconButton>
                            </div>

                            {(viewers?.length > 0) && (viewers[0]?.isLocal) ? null : (

                                <>
                                    <div className="bg-black rounded-full w-[45px] h-[45px] control-bar" >

                                        <IconButton
                                            aria-label="Comment"
                                            className="bg-black text-[#fff] rounded-full w-[45px] h-[45px]" onClick={toggleVideo}>
                                            {isLocalVideoEnabled ?
                                                <VideocamIcon style={{ color: "#fff" }} color="#fff" />
                                                :
                                                <VideocamOffIcon style={{ color: "#fff" }} color="#fff" />
                                            }
                                        </IconButton>
                                    </div>
                        
                                    <div className="bg-black rounded-full w-[45px] h-[45px] control-bar" >
                                         
                                        <IconButton
                                            aria-label="Comment"
                                            className="bg-black text-[#fff] rounded-full w-[45px] h-[45px]" onClick={toggleAudio}>
                                            {isLocalAudioEnabled ?
                                                <MicIcon style={{ color: "#fff" }} color="#fff" />
                                                :
                                                <MicOffIcon style={{ color: "#fff" }} color="#fff" />
                                            }
                                        </IconButton>
                                    </div>

                                    <div className="bg-black rounded-full w-[45px] h-[45px] control-bar" onClick={openTags}>
                                         
                                        <IconButton
                                            aria-label="Comment"
                                            className="bg-black rounded-full w-[45px] h-[45px]"
                                        >
                                            <ExpandLessIcon className="text-white h-[30px] w-[30px]" />
                                        </IconButton>
                                    </div>

                                    <Tag2
                                        theme={theme}
                                        broadcasterData={broadcasterData}
                                        tags={tags}
                                        handleCloseTags={handleCloseTags}
                                        taggedData={taggedData}
                                        setTaggedData={setTaggedData}
                                    />
                                </>
                            )}

                            {peers?.length > 6 ? (
                        
                                <div className="bg-black rounded-full w-[45px] h-[45px] text-white flex items-center justify-center" >
                                    <p>+ {peers?.length - 6}</p>
                            
                                </div>
                            ) : null}

                        </div>
                    )}
                    
                    
               

                    {/* {hlsState?.running && (
                        <> */}

                    {/* comments middle container modal */}
                    {showComments && (
                        <div
                            className={"comment-modal-container bottom-[8rem]"}
                        >
                            <span>
                                {allMessages.map((comment, index) => (
                                    <React.Fragment key={index}>
                                        <div>
                                            <ul className="User__comments">
                                                {/* <img
                                                                className="w-[40px] flex-shrink-0 h-[40px] rounded-full"
                                                                src={comment.photoURL}
                                                                alt={comment.displayName}
                                                            /> */}

                                                <li className="comment__details">
                                                    <span className="comment__name">
                                                        {comment.senderName}
                                                    </span>
                                                    <span className="comment__text">
                                                        {comment.message}
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </React.Fragment>
                                ))}
                            </span>
                        </div>
                    )}

                    {/* post carousel container */}
                    
                    {/* Comments box modal container */}
                    {showComments && (
                        <div className="Showcomment__box">
                            <textarea
                                type="text"
                                placeholder="Type a message"
                                className="commentInput"
                                rows={1}
                                style={{ resize: "none" }}
                                value={inputValues}
                                onChange={handleInputChange}
                            />
                            <button
                                onClick={sendMessage}
                            >
                                <img src={sendIcon} alt="post" />
                            </button>
                        </div>
                    )}

                    {showCarousels && (
                        <>
                            {broadcasterData?.taggedProducts?.length > 0 && (
                                <div
                                    className={"showCard bottom-[1.2rem]"}
                                >
                                    {Array.isArray(broadcasterData?.taggedProducts) &&
                                        broadcasterData?.taggedProducts.map((mediaUrl, index) => (
                                            <React.Fragment key={index}>
                                                <LiveCarousels
                                                    theme={theme}
                                                    handlePurchase={handlePurchase}
                                                    handleOpenPurchase1={handleOpenPurchase1}
                                                    mediaUrl={mediaUrl}
                                                    setCurrentMediaUrl={setCurrentMediaUrl}
                                                />
                                            </React.Fragment>
                                        ))}
                                </div>
                            )}
                        </>
                    )}
                    

                    

                    <PurchaseDialog
                        theme={theme}
                        openPurchase={openPurchase}
                        handleClosePurchase={handleClosePurchase}
                        handleClosePurchase1={handleClosePurchase1}
                        openPurchase1={openPurchase1}
                        setOpenPurchase1={setOpenPurchase1}
                        product={currentMediaUrl}
                    />
                                       
                </Dialog>
            )}
        </div>
    );
};