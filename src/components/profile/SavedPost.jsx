import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { CardMedia, CircularProgress, Grid, Skeleton } from '@mui/material';
import { Button, InfiniteList, WithListContext, useRedirect } from 'react-admin';
import { ProfileCard } from './ProfileCard';
import { ThemeContext } from '../context/ThemeProvider';
import '../card/card.css';


const SavedPost = ({ userPost, loading}) => {
  const filters = ['all', 'hauls', 'lookbook', 'grwm', 'diy'];
  const [currentFilter, setCurrentFilter] = useState('all');
  const [collectionsFilter, setCollectionsFilter] = useState('all');
  const { theme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const [openColz, setOpenColz] = useState(false);
  const [isReady, setIsReady] = useState(false);


  const handleCanPlay = () => {
    setIsReady(true);
  };
  const filteredPosts = currentFilter === 'all'
    ? userPost
    : userPost?.filter(post => post.URL === currentFilter);
  
  const filteredCollections = collectionsFilter === 'all'
    ? userPost
    : userPost?.filter(post => post.URL === collectionsFilter);

  const redirect = useRedirect()

  const goToStore = (post) => (
    redirect(`/${post.URL}/${post.id}/show`)
  )

  const downArrow = (
    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="7" viewBox="0 0 9 7" fill="none" style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
      <path   d="M7.98408 1.93175L4.35163 6.03255C4.19871 6.20529 3.9517 6.20529 3.79837 6.03255L0.165916 1.93175C-0.0553053 1.68261 -0.0553053 1.27685 0.165916 1.02687C0.387137 0.777303 0.746185 0.777303 0.967406 1.02687L4.0752 4.53476L7.18219 1.02687C7.40382 0.777303 7.76286 0.777303 7.98408 1.02687C8.20531 1.27685 8.20531 1.68261 7.98408 1.93175Z" fill="black" />
    </svg>
  );

  const upArrow = (
    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="7" viewBox="0 0 9 7" fill="none" style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
      <path   d="M0.165941 5.06825L3.7984 0.967447C3.95131 0.794705 4.19833 0.794705 4.35165 0.967447L7.98411 5.06825C8.20533 5.31739 8.20533 5.72315 7.98411 5.97313C7.76289 6.2227 7.40384 6.2227 7.18262 5.97313L4.07482 2.46524L0.967837 5.97313C0.746209 6.2227 0.387162 6.2227 0.165941 5.97313C-0.0552807 5.72315 -0.0552807 5.31739 0.165941 5.06825Z" fill="black" />
    </svg>
  );


 
  return (
    <>
      {!loading ? (
      <div className='pb-[1rem] max-w-[90vw] mx-auto laptop:max-w-[70vw]'>
        <div className='flex justify-between items-center mb-[5px] text-[12px] w-full relative'>
          <h2>Saved</h2>
          <div className='flex items-center gap-x-[7px] cursor-pointer relative' onClick={() => { setOpen(!open);  setOpenColz(false)}}>
            <h2>
              View all
            </h2>
            {open ? upArrow : downArrow}
            
          </div>
          {open && (
            <div className='absolute w-[115px] h-fit py-[8px] px-[15px] rounded-[6px] top-[1.5rem] gap-y-[7px] right-[.2rem] flex flex-col capitalize items-start z-[2000]' style={{ backgroundColor: theme === "light" ? "#fff" : "rgba(68, 68, 68, 1)", color: theme === "light" ? "#222" : "#fff", boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
              {filters.map(filter => (
                <button key={filter} onClick={() => setCurrentFilter(filter)} className={currentFilter === filter ? 'bg-[#222] w-full px-[12px] py-[3px] rounded-[8px] text-[#fff] text-left' : 'px-[12px]'} style={{ textTransform: filter === 'grwm' || filter === 'diy' ? 'uppercase' : 'capitalize' }}>
                  <h2>{filter}</h2>
                </button>
              ))}
            </div>
          )}
        </div>

        {filteredPosts?.length > 0 ? (
            <div className='mb-[1rem] flex overflow-x-scroll gap-x-[10px] max-w-[90vw] mx-auto  laptop:max-w-[70vw] store__card'  >
      
            {filteredPosts?.sort((a, b) => b.timestamp - a.timestamp).map((post) => {
              const mediaUrl = post.media[0]; // Get the URL of the single media file
              const isImage = mediaUrl.includes('.jpg') || mediaUrl.includes('.jpeg') || mediaUrl.includes('.png');
              return (
            
                <div key={post.id} className='w-[150px]' onClick={() => goToStore(post)}>
                  <div className="min-w-[150px] h-[90px] rounded-[10px] overflow-hidden">
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
                  <div className='flex justify-between mt-[10px]'>
                    <div>
                      <p className='text-[10px] body'>{post.body}</p>
                      <p className='text-[8px] text-[#636363]'>{post.name}</p>
                    </div>
                    <div style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="4" height="15" viewBox="0 0 4 15" fill="none">
                        <path d="M2 11C2.53043 11 3.03914 11.1844 3.41421 11.5126C3.78929 11.8408 4 12.2859 4 12.75C4 13.2141 3.78929 13.6592 3.41421 13.9874C3.03914 14.3156 2.53043 14.5 2 14.5C1.46957 14.5 0.96086 14.3156 0.585787 13.9874C0.210714 13.6592 0 13.2141 0 12.75C0 12.2859 0.210714 11.8408 0.585787 11.5126C0.96086 11.1844 1.46957 11 2 11ZM2 5.75C2.53043 5.75 3.03914 5.93437 3.41421 6.26256C3.78929 6.59075 4 7.03587 4 7.5C4 7.96413 3.78929 8.40925 3.41421 8.73744C3.03914 9.06563 2.53043 9.25 2 9.25C1.46957 9.25 0.96086 9.06563 0.585787 8.73744C0.210714 8.40925 0 7.96413 0 7.5C0 7.03587 0.210714 6.59075 0.585787 6.26256C0.96086 5.93437 1.46957 5.75 2 5.75ZM2 0.5C2.53043 0.5 3.03914 0.684374 3.41421 1.01256C3.78929 1.34075 4 1.78587 4 2.25C4 2.71413 3.78929 3.15925 3.41421 3.48744C3.03914 3.81563 2.53043 4 2 4C1.46957 4 0.96086 3.81563 0.585787 3.48744C0.210714 3.15925 0 2.71413 0 2.25C0 1.78587 0.210714 1.34075 0.585787 1.01256C0.96086 0.684374 1.46957 0.5 2 0.5Z" fill="black" />
                      </svg>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className='no__post__available'>No Post</div>
        )}

        <div className='flex justify-between items-center mb-[15px] text-[12px] relative'>
          <h2>Collections</h2>
          <div className='flex items-center gap-x-[7px] cursor-pointer relative' onClick={() => { setOpenColz(!openColz);  setOpen(false)}}>
            <h2>
              View all
            </h2>
            {openColz ? upArrow : downArrow}
            
          </div>
          {openColz && (
            <div className='absolute w-[115px] h-fit py-[8px] px-[15px] rounded-[6px] top-[1.6rem] gap-y-[7px] right-[.4rem] flex flex-col capitalize items-start z-[2000]' style={{ backgroundColor: theme === "light" ? "#fff" : "rgba(68, 68, 68, 1)", color: theme === "light" ? "#222" : "#fff", boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
              {filters.map(filter => (
                <button key={filter} onClick={() => setCollectionsFilter(filter)} className={collectionsFilter === filter ? 'bg-[#222] w-full px-[12px] py-[3px] rounded-[8px] text-[#fff] text-left' : 'px-[12px]'} style={{ textTransform: filter === 'grwm' || filter === 'diy' ? 'uppercase' : 'capitalize' }}>
                  <h2>{filter}</h2>
                </button>
              ))}
            </div>
          )}
        </div>

        {filteredCollections?.length > 0 ? (
            <div className='mb-[2rem] flex overflow-x-scroll gap-x-[10px] max-w-[90vw] mx-auto laptop:max-w-[70vw] store__card'  >
      
            {filteredCollections?.sort((a, b) => b.timestamp - a.timestamp).map((post) => {
              const mediaUrl = post.media[0]; // Get the URL of the single media file
              const isImage = mediaUrl.includes('.jpg') || mediaUrl.includes('.jpeg') || mediaUrl.includes('.png');
              return (
            
                <div key={post.id} className='w-[150px] relative pt-[10px]' onClick={() => goToStore(post)}>
                  <div className="absolute w-[140px] h-[84px] left-[5px] right-0 top-[3px] bg-[#D9D9D9] rounded-[10px]"></div>
                  <div className="min-w-[150px] h-[90px] rounded-[10px] overflow-hidden relative">
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
                        <div className='absolute bg-[#222] p-[2px] right-[7px]  bottom-[7px] rounded-[2px] flex items-center gap-x-[2px] text-[5px] text-white'>
                          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="6" viewBox="0 0 8 6" fill="none">
                            <path d="M3.59462 3.30078H1H3.59462ZM3.59462 4.59809H1H3.59462Z" fill="white" />
                            <path d="M3.59462 3.30078H1M3.59462 4.59809H1" stroke="white" stroke-width="0.5" stroke-linecap="round" />
                            <path d="M6.1487 3.34009C6.68514 3.64982 6.95304 3.80485 6.99261 4.02799C7.00246 4.08388 7.00246 4.14107 6.99261 4.19696C6.95336 4.42075 6.68514 4.57546 6.1487 4.88486C5.61227 5.1946 5.34437 5.34963 5.13096 5.27211C5.07764 5.25265 5.02813 5.224 4.98469 5.18746C4.81085 5.04151 4.81085 4.73211 4.81085 4.11264C4.81085 3.49317 4.81085 3.18344 4.98469 3.03782C5.02816 3.0014 5.07766 2.97286 5.13096 2.95349C5.34405 2.87565 5.61227 3.03068 6.1487 3.34009Z" fill="white" stroke="white" stroke-width="0.5" />
                            <path d="M1 0.707031H4.40544H1ZM6.51358 0.707031H5.78384H6.51358ZM6.51358 2.00434H3.10813H6.51358ZM1 2.00434H1.72974H1Z" fill="white" />
                            <path d="M1 0.707031H4.40544M6.51358 0.707031H5.78384M6.51358 2.00434H3.10813M1 2.00434H1.72974" stroke="white" stroke-width="0.5" stroke-linecap="round" />
                          </svg>
                          <p>10</p>
                        </div>
                      </>
                    )}
                    {/* </Link> */}
                  </div>
                        
                  <div className='flex justify-between mt-[10px]'>
                    <div>
                      <p className='text-[10px] body'>{post.body}</p>
                      <p className='text-[8px] text-[#636363]'>{post.name} - <span className={` ${post.URL === 'diy' || post.URL === 'grwm' ? 'uppercase' : 'capitalize'}`}>{post.URL}</span></p>
                    </div>
                    <div style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="4" height="15" viewBox="0 0 4 15" fill="none">
                        <path d="M2 11C2.53043 11 3.03914 11.1844 3.41421 11.5126C3.78929 11.8408 4 12.2859 4 12.75C4 13.2141 3.78929 13.6592 3.41421 13.9874C3.03914 14.3156 2.53043 14.5 2 14.5C1.46957 14.5 0.96086 14.3156 0.585787 13.9874C0.210714 13.6592 0 13.2141 0 12.75C0 12.2859 0.210714 11.8408 0.585787 11.5126C0.96086 11.1844 1.46957 11 2 11ZM2 5.75C2.53043 5.75 3.03914 5.93437 3.41421 6.26256C3.78929 6.59075 4 7.03587 4 7.5C4 7.96413 3.78929 8.40925 3.41421 8.73744C3.03914 9.06563 2.53043 9.25 2 9.25C1.46957 9.25 0.96086 9.06563 0.585787 8.73744C0.210714 8.40925 0 7.96413 0 7.5C0 7.03587 0.210714 6.59075 0.585787 6.26256C0.96086 5.93437 1.46957 5.75 2 5.75ZM2 0.5C2.53043 0.5 3.03914 0.684374 3.41421 1.01256C3.78929 1.34075 4 1.78587 4 2.25C4 2.71413 3.78929 3.15925 3.41421 3.48744C3.03914 3.81563 2.53043 4 2 4C1.46957 4 0.96086 3.81563 0.585787 3.48744C0.210714 3.15925 0 2.71413 0 2.25C0 1.78587 0.210714 1.34075 0.585787 1.01256C0.96086 0.684374 1.46957 0.5 2 0.5Z" fill="black" />
                      </svg>
                    </div>
                  </div>
                  
                </div>
              )
            })}
          </div>
        ) : (
          <div className='w-[150px] pb-[2rem]'>
            <div className='w-[150px] h-[90px] rounded-[10px] bg-[#D9D9D9] flex justify-center items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect y="17.2559" width="40" height="5.92593" rx="2.96296" fill="#C6C6C6" />
                <rect x="17.0367" y="40" width="40" height="5.92593" rx="2.96296" transform="rotate(-90 17.0367 40)" fill="#C6C6C6" />
              </svg>
            </div>
            <p className='text-[10px] text-center mt-[3px]'>Create your collection</p>
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

export default SavedPost


export const VendorProducts = (theme) => {
  const redirect = useRedirect()

  const goToStore = () => (
    redirect("/store")
  )
  return (
    <>
      <InfiniteList
        resource='product'
        title=" "
        actions={false}
        sx={{
          maxWidth: '100vw !important',
          "& .MuiToolbar-root": {
            minHeight: "0px !important",
          },
          "& .MuiBox-root": {
            padding: "0 ",
          },
          
        }}
      >
        <WithListContext render={({ isLoading, data }) => (
            
          !isLoading ? (
            <>
              {data && !data.length && <span>No Products</span>}
              {data && data.length > 0 && (
                <>
                  <Grid container className='pb-[1.5rem] justify-center feed--page' spacing='5px'>
                    {data && data.slice(0, 6).map((product) => {
                      // console.log(product);
                      // console.log(product.variants[0].id);

                      return (
                        <Grid item xs={4} key={product.id} className="max-w-[115px] h-[115px] flex-shrink-0 overflow-hidden" sx={{ padding: '0', }}>
                          
                          <Link to={`/product/${product.id}/show`}>
                            <img src={product.thumbnail} alt='vendor-product' className="object-cover w-full h-full" />
                          </Link>
                                                      
                          
                                           
                        </Grid>
 
                      )
                    })
                    }
                  </Grid>
                  <div className=' flex justify-center items-center feed--page'>
                    <button
                      className={theme === "light" ? 'border-2 border-solid border-[#222]' : 'border border-solid border-[#fff'}
                      style={{
                        fontSize: "15px",
                        // border: theme === "dark" &&'1.6px solid #fff',
                        borderRadius: '5px',
                        fontWeight: '400',
                        padding: '5px 15px',
                      }}
                      onClick={goToStore}
                    >
                      View more
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            <p className='font-[500] feed--page'>Products Loading...</p>
          ))}
        />
                        
      </InfiniteList>
    </>
  );
};

export const InfluencerProducts = (theme) => {
  const redirect = useRedirect()
  const [isReady, setIsReady] = useState(false);
  const handleCanPlay = () => {
    setIsReady(true);
  };

  const goToStore = (influencersPost) => {
    redirect({
      pathname: "/influencerStore",
      state: { influencersPost }
    });
   }
  return (
    <>
      <InfiniteList
        resource='posts'
        title=" "
        actions={false}
        sx={{
          maxWidth: '100vw !important',
          "& .MuiToolbar-root": {
            minHeight: "0px !important",
          },
          "& .MuiBox-root": {
            padding: "0 ",
        
          },
    
          
        }}
      >
        <WithListContext render={({ isLoading, data }) => {
          const influencersPost = data && data.filter(post => post.taggedProducts.length > 1)
          if (!isLoading) {
            return (
              <>
                {influencersPost && !influencersPost.length && <span>No Products</span>}
                {influencersPost && influencersPost.length > 0 && (
                  <>
                    <Grid container className='pb-[1.5rem] justify-center feed--page max-w-[87vw] ' spacing='10px'>
                      {influencersPost && influencersPost.slice(0, 9).map((product) => {
                        const mediaUrl = product.media[0]; // Get the URL of the single media file
                        const isImage = mediaUrl.includes('.jpg') || mediaUrl.includes('.jpeg') || mediaUrl.includes('.png');

                        return (
                          <Grid item xs={4} sm={4} md={4} key={product.id} className="min-w-[112px] laptop:min-w-[250px]  flex-shrink-0 " sx={{ padding: '0', }}>
                          
                            <Link to={`/${product.URL}/${product.id}/show`}>
                            
                              <div className="min-w-[100px] h-[100px] laptop:w-[100%] laptop:h-[250px] rounded-[5.374px] overflow-hidden relative">
           
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
                                      poster={product.posterUrl ? product.posterUrl : null}
                                      onCanPlay={handleCanPlay}
                                      style={{ display: isReady ? 'block' : 'none' }}
                                    />
                        
                                  </>
                                )}
                                <div className='absolute top-[5.6px] right-[6.23px] w-[4px] h-[15px]' style={{ filter: "invert(1)" }}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="4" height="15" viewBox="0 0 4 15" fill="none">
                                    <path d="M2 11C2.53043 11 3.03914 11.1844 3.41421 11.5126C3.78929 11.8408 4 12.2859 4 12.75C4 13.2141 3.78929 13.6592 3.41421 13.9874C3.03914 14.3156 2.53043 14.5 2 14.5C1.46957 14.5 0.96086 14.3156 0.585787 13.9874C0.210714 13.6592 0 13.2141 0 12.75C0 12.2859 0.210714 11.8408 0.585787 11.5126C0.96086 11.1844 1.46957 11 2 11ZM2 5.75C2.53043 5.75 3.03914 5.93437 3.41421 6.26256C3.78929 6.59075 4 7.03587 4 7.5C4 7.96413 3.78929 8.40925 3.41421 8.73744C3.03914 9.06563 2.53043 9.25 2 9.25C1.46957 9.25 0.96086 9.06563 0.585787 8.73744C0.210714 8.40925 0 7.96413 0 7.5C0 7.03587 0.210714 6.59075 0.585787 6.26256C0.96086 5.93437 1.46957 5.75 2 5.75ZM2 0.5C2.53043 0.5 3.03914 0.684374 3.41421 1.01256C3.78929 1.34075 4 1.78587 4 2.25C4 2.71413 3.78929 3.15925 3.41421 3.48744C3.03914 3.81563 2.53043 4 2 4C1.46957 4 0.96086 3.81563 0.585787 3.48744C0.210714 3.15925 0 2.71413 0 2.25C0 1.78587 0.210714 1.34075 0.585787 1.01256C0.96086 0.684374 1.46957 0.5 2 0.5Z" fill="black" />
                                  </svg>
                                </div>
                                <div className='absolute bottom-[6.34px] left-[5.93px] text-[6.374px] text-white'>
                                  20k views
                                </div>
                              </div>
                              <div className='mt-[5.6px] text-[8.6px]'>
                                <p>Single style video</p>
                                <p>$10.00</p>
                              </div>
                            </Link>
                          
                                           
                          </Grid>
 
                        )
                      })
                      }
                    </Grid>
                    <div className=' flex justify-center items-center feed--page'>
                      <button
                        className={theme === "light" ? 'border-2 border-solid border-[#222]' : 'border border-solid border-[#fff'}
                        style={{
                          fontSize: "15px",
                          // border: theme === "dark" &&'1.6px solid #fff',
                          borderRadius: '5px',
                          fontWeight: '400',
                          padding: '5px 15px',
                        }}
                        onClick={() => goToStore(influencersPost)}
                      >
                        View more
                      </button>
                    </div>
                  </>
                )}
              </>
            )
          } else {
            <p className='font-[500] feed--page'>Products Loading...</p>
          }
        }}
        />
                        
      </InfiniteList>
    </>
  );
};