import * as React from 'react';
import { Dialog } from "@mui/material";
import DFooter from '../dashboard/footer/DFooter';
import { SearchBox } from './SearchBox';
import '../../components/search/search.css';
import { StackedAvatars } from '../stacked/StackedAvatars';
import { AdCard } from '../card/AdCard';
import { SearchCards } from './SearchCard';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { WithListContext } from 'react-admin';
import { VideoPlay } from '../videoPlayer/VideoPlayer';



export const SearchDialog = () => {
    const [input, setInput] = React.useState('');



    const mPostCarousel = {
        type: 'slide',
        pauseOnHover: false,
        pagination: true,
        arrows: false,
    };
    return (

        <>


            <div className='search--page feed--page'>
                <div className='mx-auto laptop:max-w-sm tablet:max-w-sm max-w-[330px] min-w-[330px]'>
                    <SearchBox
                        placeholder='Search'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>

                <div className='stacked--contents'>

                    <WithListContext render={({ isLoading, data }) => (
                        !isLoading ? (
                            <>
                                {['hauls', 'grwm', 'diy', 'posts', 'lookbook'].map((post, index) => {
                                    // const mediaUrl = post.media[0];
                                    // console.log(post);
                                    // const isImage = mediaUrl.includes('.jpg') || mediaUrl.includes('.jpeg') || mediaUrl.includes('.png');
                                    return (
                                        <StackedAvatars post={data[index]} title={post} />

                                    );
                                })}

                            </>
                        ) : (
                            <p className='font-[500] text-[#222] flex items-center justify-center'>Loading...</p>
                        ))}
                    />

                </div>

                <div className='search__card--container'>

                    {/* <Splide options={mPostCarousel} className='mobile--post-splide card__splide overflow-hidden rounded-[10px] h-[137px] w-full' >
                        <WithListContext render={({ isLoading, data }) => (
                            !isLoading ? (
                                <>
                                    {data && data.slice(0, 4).map((post, index) => {
                                        const mediaUrl = post.media[0];
                                        console.log(post);
                                        const isImage = mediaUrl.includes('.jpg') || mediaUrl.includes('.jpeg') || mediaUrl.includes('.png');
                                        return (
                                            <SplideSlide key={index} className='w-full h-[137px] relative youtube--container '>
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
                                                    <VideoPlay url={mediaUrl} isMuted={true} posterUrl={index === 0 ? post.posterUrl : null} />
                                                )}
  
                                            </SplideSlide>
                                        );
                                    })}
                                </>
                            ) : (
                                <p className='font-[500] text-[#222] flex items-center justify-center'>Loading...</p>
                            ))}
                        />
                    </Splide> */}
                    {/* <AdCard />
                    <AdCard />
                    <AdCard /> */}
                </div>

                <div className='searched'>
                    <SearchCards title='Tuxedos' subTitle='hauls' type='Recommended' input={input} />
                    <SearchCards title='Wedding Gown' subTitle='grwm' type='Trending' input={input} />
                    <SearchCards title='Gown' subTitle='diy' type='Recommended' input={input} />
                    <SearchCards title='Joggers' subTitle='posts' type='Trending' input={input} />
                    <SearchCards title='Bikini' subTitle='lookbook' type='Recommended' input={input} />
                </div>

            </div>
            <DFooter />

        </>
    );
};