import * as React from 'react';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { FaPlay, FaPause } from "react-icons/fa";
import { motion } from "framer-motion";
import { CardMedia, CircularProgress, Skeleton } from '@mui/material';
import { Cloudinary, Transformation } from '@cloudinary/url-gen';
import { source } from '@cloudinary/url-gen/actions/overlay';
import { image, text } from '@cloudinary/url-gen/qualifiers/source';
import { fill, pad, scale } from '@cloudinary/url-gen/actions/resize';
import { opacity } from '@cloudinary/url-gen/actions/adjust';
import { Position } from '@cloudinary/url-gen/qualifiers';
import { Gravity, compass } from '@cloudinary/url-gen/qualifiers/gravity';
import { AutoFocus } from '@cloudinary/url-gen/qualifiers/autoFocus';
import { FocusOn } from '@cloudinary/url-gen/qualifiers/focuson';
import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle';
import { trim } from '@cloudinary/url-gen/actions/videoEdit';
import { byAngle } from '@cloudinary/url-gen/actions/rotate';
import { ar16X9 } from '@cloudinary/url-gen/qualifiers/aspectRatio';
import { generativeFill } from '@cloudinary/url-gen/qualifiers/background';


export const VideoPlay = ({ url, isMuted, posterUrl, post }) => {
    const [isInView, setIsInView] = React.useState(false);
    const [isReady, setIsReady] = React.useState(false);
  const playerRef = React.useRef(null);
  const [videoReady, setVideoReady] = React.useState(false);

  const cld = new Cloudinary({
    cloud: {
      cloudName: `${import.meta.env.VITE_CLOUDINARY_NAME}`
    }
  })

  
const watermarkId = `${import.meta.env.VITE_WATERMARK}`;
  const mytext = `@${post?.name.substring(0, 6)}`;
  const publicId = url?.split('/')?.pop()?.split('.')[0];

  const myVideo = cld.video(publicId)

  myVideo
    .quality('auto:low')
    .videoEdit(
      trim().startOffset(0.0).endOffset(5.0)
    )
    .resize(fill().width(400))
    .overlay(
      source(
        image(watermarkId)
          .transformation(new Transformation()
            .resize(scale().width(30))
            .adjust(opacity(50))
          )
      )
        .position(new Position().gravity(compass('north_east')).offsetX(35).offsetY(200))
        
    )
    .overlay(
      source(
        text(mytext, new TextStyle('arial', 12).fontWeight('bold'))
          .textColor('white')
          .transformation(new Transformation()
            .adjust(opacity(50))
          )
      )
        .position(new Position().gravity(compass('north_east')).offsetX(25).offsetY(235))
    );

  const myURL = myVideo.toURL();

  
    React.useEffect(() => {
      if (!playerRef.current) {
        return; // If playerRef is not available, exit early
      }
  
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1,
      };
  
      const observer = new IntersectionObserver(([entry]) => {
        // Video is in view if intersection ratio is greater than threshold
        setIsInView(entry.isIntersecting);
  
        // Pause or play the video based on visibility
        if (entry.isIntersecting) {
          if (playerRef.current && playerRef.current.paused) {
            playerRef.current.play().catch(error => {
              // console.log(error)
            });
          }
        } else {
          if (playerRef.current && !playerRef.current.paused) {
            playerRef.current.pause();
            playerRef.current.currentTime = 0; // Reset the video to the beginning
          }
        }
      }, options);
  
      observer.observe(playerRef.current);
  
      return () => {
        if (playerRef.current) { // Check if playerRef.current is not null
          observer.unobserve(playerRef.current);
        }
      };
    }, [playerRef]);

    const handleCanPlay = () => {
      setIsReady(true);
    };
  
  return (
    <>
      {!isReady && <Skeleton variant="rectangular" width="100%" height='100%' />}
      <CardMedia
        component={'video'}
        alt={'Video'}
        loading={'auto'}
        ref={playerRef}
        className='react-player relative'
        controls={false}
        playsInline={true}
        muted={isMuted}
        autoPlay={isInView}
        src={myURL}
        poster={posterUrl ? posterUrl : null}
        onCanPlay={handleCanPlay}
        style={{ display: isReady ? 'block' : 'none' }}
      />
      {/* {(!isInView || !isReady) && posterUrl && (
          <img src={posterUrl} alt="Video poster" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        )} */}
    </>
  );
  };
  
  
  


export const TrendingVideoBox = ({ url, posterUrl }) => {
  const [isReady, setIsReady] = React.useState(false);
const handleCanPlay = () => {
    setIsReady(true);
  };

  
  
  return (
    <>
      {!isReady && <Skeleton variant="rectangular" width="100%" height='100%' />}
       <CardMedia
        component="video"
        className='react-player object-cover h-full w-full'
        controls={false}
        playsInline={true}
        autoPlay={false}
        muted
        loading={'auto'}
        src={url}
        poster={posterUrl ? posterUrl : null}
        onCanPlay={handleCanPlay}
        style={{ display: isReady ? 'block' : 'none' }}
      />
      
    </>
  );
};


export const EditorVideoPlayer = ({ url, isPlaying, isMuted }) => {
  return (
    <>
      <CardMedia
        className='react-player'
        muted={isMuted}
        controls={false}
        crossOrigin="anonymous"
        playsinline={true}
        autoPlay={isPlaying}
        src={url}
        component="video"
        width='100%'
        height='100%'
             
      />
    </>
  )
};



export const ShowVideoBox = ({ url, isPlaying, isMuted, posterUrl, skillCenter, post }) => {
  const [isReady, setIsReady] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const videoRef = React.useRef(null);
  const inputRef = React.useRef(null);

  const cld = new Cloudinary({
    cloud: {
      cloudName: `${import.meta.env.VITE_CLOUDINARY_NAME}`
    }
  })

  
const watermarkId = `${import.meta.env.VITE_WATERMARK}`;
  const mytext = `@${post?.name.substring(0, 6)}`;
  const publicId = url?.split('/')?.pop()?.split('.')[0];

  const myVideo = cld.video(publicId)

  myVideo
    .quality('auto:low')
    .resize(fill().width(400))
    .overlay(
      source(
        image(watermarkId)
          .transformation(new Transformation()
            .resize(scale().width(30))
            .adjust(opacity(50))
          )
      )
        .position(new Position().gravity(compass('north_east')).offsetX(35).offsetY(200))
        
    )
    .overlay(
      source(
        text(mytext, new TextStyle('arial', 12).fontWeight('bold'))
          .textColor('white')
          .transformation(new Transformation()
            .adjust(opacity(50))
          )
      )
        .position(new Position().gravity(compass('north_east')).offsetX(25).offsetY(235))
    );

  const myURL = myVideo.toURL();


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
   
  

  React.useEffect(() => {
    const video = videoRef.current;
    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const updateSliderStyles = () => {
    if (inputRef.current !== null) { 
      const value = ((inputRef.current.value - inputRef.current.min) / (inputRef.current.max - inputRef.current.min)) * 100;
      inputRef.current.style.background = `linear-gradient(to right, red 0%, red ${value}%, gray ${value}%, gray 100%)`;
    };
  };

  return (
    <>
      {!isReady  && <Skeleton variant="rectangular" width="100%" height='100%' />}
      <CardMedia
        component="video"
        ref={videoRef}
        className='react-player object-cover h-full w-full'
        controls={false}
        playsInline={true}
        loop
        muted={isMuted}
        autoPlay={isPlaying}
        loading={'auto'}
        src={myURL}
        poster={posterUrl ? posterUrl : null}
        onCanPlay={handleCanPlay}
        style={{ display: isReady ? 'block' : 'none' }}
      />
      {isReady && skillCenter && (
        <div className='absolute h-[20px] bottom-[00px] w-full'>
        <input
          ref={inputRef}
          className='slider'
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeekChange}
        />   
      </div>
      
      )}
    </>
  );
};

export const SkillShowVideoBox = ({ url, isPlaying, isMuted, posterUrl, skillCenter, post }) => {
  const [isReady, setIsReady] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const videoRef = React.useRef(null);
  const inputRef = React.useRef(null);

  const cld = new Cloudinary({
    cloud: {
      cloudName: `${import.meta.env.VITE_CLOUDINARY_NAME}`
    }
  })

  
const watermarkId = `${import.meta.env.VITE_WATERMARK}`;
  const mytext = `@${post?.name.split(' ')[0]}`;
  const publicId = url?.split('/')?.pop()?.split('.')[0];

  const myVideo = cld.video(publicId)

  myVideo
    .quality('auto:low')
    .resize(fill().width(400))
    .overlay(
      source(
        image(watermarkId)
          .transformation(new Transformation()
            .resize(scale().width(30))
            .adjust(opacity(50))
          )
      )
        .position(new Position().gravity(compass('south_east')).offsetX(25).offsetY(290))
        
    )
    .overlay(
      source(
        text(mytext, new TextStyle('arial', 12).fontWeight('bold'))
          .textColor('white')
          .transformation(new Transformation()
            .adjust(opacity(50))
          )
      )
        .position(new Position().gravity(compass('south_east')).offsetX(10).offsetY(278))
    );

  const myURL = myVideo.toURL();


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
   
  

  React.useEffect(() => {
    const video = videoRef.current;
    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const updateSliderStyles = () => {
    if (inputRef.current !== null) { 
      const value = ((inputRef.current.value - inputRef.current.min) / (inputRef.current.max - inputRef.current.min)) * 100;
      inputRef.current.style.background = `linear-gradient(to right, red 0%, red ${value}%, gray ${value}%, gray 100%)`;
    };
  };

  return (
    <>
      {!isReady  && <Skeleton variant="rectangular" width="100%" height='100%' />}
      <CardMedia
        component="video"
        ref={videoRef}
        className='skill_center_player aspect-video object-center object-cover   h-[250px] w-full '
        controls={false}
        playsInline={true}
        muted={isMuted}
        autoPlay={isPlaying}
        loading={'auto'}
        src={myURL}
        poster={posterUrl ? posterUrl : null}
        onCanPlay={handleCanPlay}
        style={{ display: isReady ? 'block' : 'none', aspectRatio: "16/9" }}
      />
      {isReady && skillCenter && (
        <div className='absolute h-[20px] bottom-[-2px] w-full'>
        <input
          ref={inputRef}
          className='slider'
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeekChange}
        />   
      </div>
      
      )}
    </>
  );
};


export const XVideoPlayer = ({ url, posterUrl, onVideoEnded, isImage, isMuted, toggleMute, post }) => {
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isReady, setIsReady] = React.useState(false);
  const [played, setPlayed] = React.useState(0);
  const [isInView, setIsInView] = React.useState(false);
  const [percentage, setPercentage] = React.useState(0);
  const playerRef = React.useRef(null);
  
  const cld = new Cloudinary({
    cloud: {
      cloudName: `${import.meta.env.VITE_CLOUDINARY_NAME}`
    }
  })

  
const watermarkId = `${import.meta.env.VITE_WATERMARK}`;
  const mytext = `@${post?.name.split(' ')[0]}`;
  const publicId = url.split('/').pop().split('.')[0];

  const myVideo = cld.video(publicId)

  myVideo
    .quality('auto:good')
    .resize(fill().width(400))
    .overlay(
      source(
        image(watermarkId)
          .transformation(new Transformation()
            .resize(scale().width(30))
            .adjust(opacity(50))
          )
      )
        .position(new Position().gravity(compass('north_east')).offsetX(55).offsetY(70))
        
    )
    .overlay(
      source(
        text(mytext, new TextStyle('arial', 12).fontWeight('bold'))
          .textColor('white')
          .transformation(new Transformation()
            .adjust(opacity(50))
          )
      )
        .position(new Position().gravity(compass('north_east')).offsetX(45).offsetY(105))
    );

  const myURL = myVideo.toURL();


  const togglePlay = () => {
      setIsPlaying(!isPlaying);
  };


  React.useEffect(() => {
    if (!playerRef.current) {
      return; // If playerRef is not available, exit early
    }

 

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    };

    const observer = new IntersectionObserver(([entry]) => {
      // Video is in view if intersection ratio is greater than threshold
      setIsInView(entry.isIntersecting);

      // Pause or play the video based on visibility
      if (entry.isIntersecting) {
        if (playerRef.current && playerRef.current.paused) {
          playerRef.current.play().catch(error => {
            // console.log(error)
          });
        }
      } else {
        if (playerRef.current && !playerRef.current.paused) {
          playerRef.current.pause();
          playerRef.current.currentTime = 0; // Reset the video to the beginning
        }
      }
    }, options);

    observer.observe(playerRef.current);

    return () => {
      if (playerRef.current) { // Check if playerRef.current is not null
        observer.unobserve(playerRef.current);
        // playerRef.current.muted = isMuted;
      }
    };
  }, [playerRef]);

  React.useEffect(() => {
    if (playerRef.current) {
      if (isPlaying && isInView) {
        playerRef.current.play();
      } else {
        playerRef.current.pause();
      }
    }
  }, [isPlaying, isInView]);
  
  

  const handleProgress = (state) => {
  if (!isPlaying || typeof state.played !== 'number') {
    return;
  }
  setPlayed(state.played);
  const playedPercentage = (state.played * 100).toFixed(0);
  setPercentage(playedPercentage);
};

const handleCanPlay = () => {
  setIsReady(true);
};

  return (
    <>
      {!isReady && <div className='spinner'><CircularProgress  /></div>}
      <CardMedia
        component="video"
        ref={playerRef}
        onTimeUpdate={handleProgress}
        onEnded={onVideoEnded}
        className='react-player object-cover h-full w-full'
        controls={false}
        playsInline={true}
        loop
        muted={isMuted}
        autoPlay={isInView}
        loading={'auto'}
        src={myURL}
        poster={posterUrl ? posterUrl : null}
        onCanPlay={handleCanPlay}
        style={{ display: isReady ? 'block' : 'none' }}
      />
     
      {!isImage && (
        <>
          <button className="mute-btn right-[1.5rem] top-4" onClick={toggleMute}>
            {isMuted ?
              <VolumeOffIcon />
              :
              <VolumeUpIcon />
            }
          </button>
          <button className="play-pause-btn flex items-center justify-center" onClick={togglePlay}>
                                                
            {isPlaying ?
              <FaPause style={{ fontSize: 50 }} />
              :
              <FaPlay style={{ fontSize: 50 }} />
            }
                                               
          </button>
          <motion.div
            className="progress-bar"
            initial={{ width: 0 }}
            animate={{ width: percentage + "%" }}
            transition={{
              delay: 0,
              ease: "easeInOut",
            }}
          >
                                                 
          </motion.div>
                                            
        </>
      )}
    </>
  );
};

export const FullScreenVideoBox = ({ url, isPlaying, isMuted, posterUrl,  post,  videoRef, isReady, handleCanPlay, handleTimeUpdate}) => {
  

  const cld = new Cloudinary({
    cloud: {
      cloudName: `${import.meta.env.VITE_CLOUDINARY_NAME}`
    }
  })

  
const watermarkId = `${import.meta.env.VITE_WATERMARK}`;
  const mytext = `@${post?.name.split(' ')[0]}`;
  const publicId = url?.split('/')?.pop()?.split('.')[0];

  const myVideo = cld.video(publicId)

  myVideo
    .quality('auto:low')
    // .resize(fill().width('iw').height(400).aspectRatio(ar16X9()))
    // .rotate(byAngle(90))
    .overlay(
      source(
        image(watermarkId)
          .transformation(new Transformation()
            .resize(scale().width(30))
            .adjust(opacity(50))
          )
      )
        .position(new Position().gravity(compass('south_east')).offsetX(25).offsetY(290))
        
    )
    .overlay(
      source(
        text(mytext, new TextStyle('arial', 12).fontWeight('bold'))
          .textColor('white')
          .transformation(new Transformation()
            .adjust(opacity(50))
          )
      )
        .position(new Position().gravity(compass('south_east')).offsetX(10).offsetY(278))
    );

  const myURL = myVideo.toURL();


  
  React.useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.addEventListener('timeupdate', handleTimeUpdate);
      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
      };   
    }
  }, []);
  

  

  return (
    <>
      {!isReady && <div className='spinner'><CircularProgress  /></div>}
      <CardMedia
        component="video"
        ref={videoRef}
        className=' object-contain aspect-video  h-screen w-screen'
        controls={false}
        playsInline={true}
        muted={isMuted}
        autoPlay={isPlaying}
        loading={'auto'}
        src={myURL}
        onCanPlay={handleCanPlay}
        style={{ display: isReady ? 'block' : 'none' }}
      />
      
    </>
  );
};