import { Avatar, Card, CardActionArea, CardContent, CardHeader, CardMedia, IconButton, Skeleton, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './card.css';
import * as React from 'react';
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeProvider";
import { useRedirect, useGetList } from "react-admin";
import { Cloudinary, Transformation } from '@cloudinary/url-gen';
import { source } from '@cloudinary/url-gen/actions/overlay';
import { image, text } from '@cloudinary/url-gen/qualifiers/source';
import { fill, scale } from '@cloudinary/url-gen/actions/resize';
import { opacity } from '@cloudinary/url-gen/actions/adjust';
import { Position } from '@cloudinary/url-gen/qualifiers';
import { compass } from '@cloudinary/url-gen/qualifiers/gravity';
import { TextStyle } from '@cloudinary/url-gen/qualifiers/textStyle';
import { trim } from '@cloudinary/url-gen/actions/videoEdit';

export const NormalCard = ({ post, mediaUrl, isImage, url }) => {

  const { data: views, total: totalViews, isLoading, error } = useGetList(
    'viewers', { filter: { video_id: post?.id } }
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
  const [isReady, setIsReady] = React.useState(false);


  const cld = new Cloudinary({
    cloud: {
      cloudName: `${import.meta.env.VITE_CLOUDINARY_NAME}`
    }
  })
    
      
  const watermarkId = `${import.meta.env.VITE_WATERMARK}`;
  const mytext = `@${post.name.substring(0, 6)}`;
  const publicId = mediaUrl.split('/').pop().split('.')[0];
    
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


  const handleCanPlay = () => {
    setIsReady(true);
  };
  const { theme } = React.useContext(ThemeContext);

    
  const redirect = useRedirect();

  const OpenAsce = () => {
    redirect(`/${url}/${post.id}/show`, `${url}`, post.id, {}, { open: true });
  }

  return (
    <>
      <Card sx={{ minWidth: '150px', width: '100%', maxWidth: '100%', boxShadow: 'none', position: 'relative', backgroundColor: theme === "light" ? "#fff" : "rgba(68, 68, 68, 0.2)", color: theme === "light" ? "#222" : "#fff", padding: '5px', borderRadius: '10px' }}>

        <CardHeader sx={{ position: 'absolute', zIndex: 50, padding: '0px', right: '.3rem', top: '.5rem' }}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon sx={{ color: '#fff' }} />
            </IconButton>
          }
        />

        <CardActionArea className="normalCard--bg feed--page" onClick={OpenAsce}>
                    
          {!isReady && <Skeleton variant="rectangular" width="100%" height='100%' />}
          <CardMedia
            className='object-cover h-full w-full rounded-[10px]'
            component={'video'}
            image={myURL}
            alt={'Video'}
            loading={isImage ? 'lazy' : 'auto'}
            playsInline={true}
            autoPlay={true}
            loop={true}
            muted={true}
            controls={false}
            controlsList={undefined}
            poster={post.posterUrl ? post.posterUrl : null}
            onCanPlay={handleCanPlay}
            style={{ display: isReady ? 'block' : 'none' }}
          />
                        
                   
          <CardContent className="absolute bottom-2 tablet:text-[15px] laptop:text-[17px]" sx={{ paddingTop: 0, paddingBottom: 0 }} >
                        
            <Typography sx={{ color: '#fff', fontSize: '11px', }}>
              {formatFollowers(totalViews)} views
            </Typography>
          </CardContent>
                                       
        </CardActionArea>
        <CardContent sx={{ paddingLeft: 0, paddingTop: '10px', paddingBottom: '10px' }} >
          <p className="normalCard--text text-[11px] tablet:text-[16px] laptop:text-[18px] font-[400]" >
            {post.body}
          </p>
        </CardContent>

        <CardHeader sx={{ padding: 0 }} className="normalcard--header"
          avatar={
            <Avatar className="tablet:h-[30px] tablet:w-[30px] laptop:h-[50px] laptop:w-[50px]"
              sx={{
                height: '25px',
                width: '25px',
                '@media (min-width:1024px)': {
                  width: 50,
                  height: 50,
                },
                '@media (min-width:641px) and (max-width:1023px)': {
                  width: 30,
                  height: 30,
                },
                overflow: 'hidden'
              }} aria-label="recipe">
              <img className="object-cover w-full h-full" src={post.photoURL} alt="avatar" />
            </Avatar>
          }
        
          title={
            <p className="laptop:text-[16px] text-[10px] tablet:text-[13px] font-[500] " style={{ color: theme === "light" ? "#636363" : "#ccc", }} >
              {post.name}
            </p>
          }
       
        />
      </Card>
        
    </>
  );
};