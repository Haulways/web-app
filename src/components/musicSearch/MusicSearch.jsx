import { CardMedia, CircularProgress } from "@mui/material";
import React from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { PiCaretDownBold } from "react-icons/pi";


export async function searchVideo(songName) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(songName)}&key=AIzaSyD_RmW_SJDiGHUuIGCs67yma8pn2QfmxIY`);
    const data = await response.json();

    return data.items.map(item => ({
        title: item.snippet.title,
        videoId: item.id.videoId,
        thumbnail: item.snippet.thumbnails.default
    }));
}

export const MusicCard = ({ theme, song, selectedfiles, activeFile }) => {
    const playerRef = React.useRef(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [openVideos, setOpenVideos] = React.useState(false);
    const [duration, setDuration] = React.useState(0);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [isReady, setIsReady] = React.useState(false);
    const [videoUrl, setVideoUrl] = React.useState('');

    React.useEffect(() => {
        if (activeFile && activeFile instanceof Blob) {
            const fileUrl = window.URL.createObjectURL(activeFile);
            setVideoUrl(fileUrl);
        } else if (selectedfiles && selectedfiles.length > 0 && selectedfiles[0] instanceof Blob) {
            const fileUrl = window.URL.createObjectURL(selectedfiles[0]);
            setVideoUrl(fileUrl);
        }
    }, [selectedfiles, activeFile]);


    const handleCanPlay = () => {
        setIsReady(true);
        setDuration(playerRef.current.duration);
    };
   

    function formatTimes(seconds) {
        const sign = seconds < 0 ? '-' : '';
        const absSeconds = Math.abs(seconds);
        const minutes = Math.floor(absSeconds / 60).toString().padStart(2, '0');
        const remainingSeconds = Math.floor(absSeconds % 60).toString().padStart(2, '0');
        const formatted = `${sign}${minutes}:${remainingSeconds}`;
        return formatted;
    }
    const timeDifference = duration - currentTime;

    React.useEffect(() => {
        if (playerRef.current) {
            if (isPlaying) {
                playerRef.current.play();
            } else {
                playerRef.current.pause();
            }
        }
    }, [isPlaying]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

 

    const handleTimeUpdate = () => {
        setCurrentTime(playerRef.current.currentTime);
    };

    const musicIcon = (
        <svg width="64px" height="64px" style={{ stroke: theme === "light" ? "#222" : "#fff" }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 19C9 20.1046 7.65685 21 6 21C4.34315 21 3 20.1046 3 19C3 17.8954 4.34315 17 6 17C7.65685 17 9 17.8954 9 19ZM9 19V5L21 3V17M21 17C21 18.1046 19.6569 19 18 19C16.3431 19 15 18.1046 15 17C15 15.8954 16.3431 15 18 15C19.6569 15 21 15.8954 21 17ZM9 9L21 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
    )
    // const YOUR_VIDEO_ID = "dBP_OXE-yc8";

    return (
        <>
            <div className="relative">
                <div className=' tagCard__container items-center max-w-[345px] mx-auto' style={{ backgroundColor: theme === "light" ? "#d9d9d9" : "rgba(68, 68, 68, 0.5)", color: theme === "light" ? "#222" : "#fff" }}>
                    {/* product container  */}
                    <div className='showCard__img rounded-[6px] overflow-hidden flex justify-center items-center relative'>

                        {song && song.thumbnail ?
                            <CardMedia
                                component="img"
                                className='h-full w-full'
                                src={song.thumbnail.url}
                            />

                            :
                            { musicIcon }
 
                        }
                        <button className="absolute flex items-center justify-center z-[100]" onClick={togglePlay}>

                            {isPlaying ?
                                <FaPause style={{ fontSize: 20 }} />
                                :
                                <FaPlay style={{ fontSize: 20 }} />
                            }

                        </button>
                        {!isReady && <div className='absolute w-[40px] h-[40px] top-0 bottom-0 left-0 right-0 my-auto mx-auto invert'><CircularProgress /></div>}
                       

                    </div>

                    {/* product details container  */}
                    <div className='showCard__details items-start relative pr-[.5rem]' style={{ backgroundColor: theme === "light" ? "#d9d9d9" : "rgba(68, 68, 68, 0.2)", color: theme === "light" ? "#222" : "#fff" }}>
                        <CardMedia
                            className="hidden"
                            component='audio'
                            ref={playerRef}
                            controls={false}
                            playsinline={true}
                            onCanPlay={handleCanPlay}
                            onTimeUpdate={handleTimeUpdate}
                            autoPlay={false}
                            src={`http://localhost:8000/watch?id=${encodeURIComponent(song?.videoId)}`}
                        />
                       
                        
                        <div className='info'>
                            <h2 className='body' style={{ color: theme === "light" ? "#222" : "#fff" }}>
                                {song.title}
                            </h2>

                            <p className='brand' style={{ color: theme === "light" ? "#222" : "#fff" }}>
                                {/* {post.title} */}
                                Artist
                            </p>

                            <span className='price font-[400] text-[10px]' style={{ color: theme === "light" ? "#222" : "#fff" }}>
                                {formatTimes(timeDifference)}
                            </span>

                        </div>

                        <div className="flex flex-col gap-1 items-center">
                            <div className="w-[40px] h-[40px] rounded-[5px] overflow-hidden">
                                <CardMedia
                                    className='react-player'
                                    muted
                                    controls={false}
                                    crossOrigin="anonymous"
                                    playsinline={true}
                                    autoPlay={false}
                                    src={videoUrl}
                                    component="video"
                                    width='100%'
                                    height='100%'
                                />
                            </div>
                            <PiCaretDownBold onClick={() => setOpenVideos(!openVideos)} className="flex-shrink-0 cursor-pointer" />
                        </div>

                        {openVideos && (
                            <div className="flex gap-x-2 absolute rounded-[6px] right-0 z-[100] bottom-[-3rem] bg-[#fff] px-[.5rem] py-[.5rem]" style={{ backgroundColor: theme === "light" ? "#d9d9d9" : "rgba(68, 68, 68, 1)" }}>
                                {selectedfiles && selectedfiles.map((file, index) => (
                                    <>
                                        <div className="w-[40px] h-[40px] rounded-[5px] overflow-hidden">
                                            <CardMedia
                                                className='react-player'
                                                muted
                                                controls={false}
                                                crossOrigin="anonymous"
                                                playsinline={true}
                                                autoPlay={false}
                                                src={window.URL.createObjectURL(file)}
                                                component="video"
                                                width='100%'
                                                height='100%'
                                            />
                                        </div>
                                    </>
                                ))}
                            </div>
                        )}


                    </div>
                </div>
            </div>
        </>
    );
};


