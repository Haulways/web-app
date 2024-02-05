import React, { useContext } from 'react'
import { BsPlusCircleFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { CircularProgress, Grid } from '@mui/material';
import { ProfileCard } from './ProfileCard';
import { ThemeContext } from '../context/ThemeProvider';

const MakePost = ({ userPost, currentUser, userData, postLoading }) => {
  const { theme } = useContext(ThemeContext);
  

  return (
    <>
      {!postLoading ? (
        <div>
          {userPost.length > 0 ? (
            <Grid container spacing='5px' className='mb-[2rem]'  >
      
              {userPost.sort((a, b) => b.timestamp - a.timestamp).map((post) => {
                const mediaUrl = post.media[0]; // Get the URL of the single media file
                const isImage = mediaUrl.includes('.jpg') || mediaUrl.includes('.jpeg') || mediaUrl.includes('.png');
                return (
          
                  <Grid key={post.id} item xs={4} sm={4} md={4} className='mx-auto'>
                    <ProfileCard mediaUrl={mediaUrl} isImage={isImage} post={post} />
                  </Grid>
                )
              })}
            </Grid>
           
          ) : userData.uid === currentUser.uid ? (
        
            <div className='flex flex-col items-center '>
              <Link to='/posts/create'>
                <BsPlusCircleFill className='text-[10rem] mobile:text-[90px] text-[#D9D9D9] bg-[#C6C6C6] rounded-full' />
              </Link>
              <p className='text-[#C6C6C6] text-[22px] mobile:text-[16px] mobile:font-[500] font-[600] my-[1.5rem] mt-[1rem]'>Create New Post</p>
            </div>
          ) : (
            <div className='no__post__available'>
              No Post
            </div>
         
          )}
        
        </div>

      ) : (
        <div className="flex flex-col  justify-center items-center mt-[1rem]">
          <CircularProgress sx={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
        </div>
      )}

    </>
  );
};

export default MakePost