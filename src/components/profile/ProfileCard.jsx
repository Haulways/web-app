import { CardMedia, Skeleton } from "@mui/material";
import { useState } from "react";


export const ProfileCard = ({ mediaUrl, isImage, post }) => {
    const [isReady, setIsReady] = useState(false);
    const handleCanPlay = () => {
      setIsReady(true);
    };
    return (
        <>
            <div className="w-[100%] h-[104px]  laptop:w-[250px] laptop:h-[250px]">
                {/* <Link to={`/posts/${post.id}/show`}> */}
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
                        
                    </>
                )}
                {/* </Link> */}
            </div>
            
        </>
    );
};