import * as React from 'react'
import SkillDialog from './SkillDialog'
import { InfiniteList, Link, Title, WithListContext, useGetList } from 'react-admin';
import { ThemeContext } from '../../components/context/ThemeProvider';
import { CardMedia, Skeleton } from '@mui/material';
import { SFooter } from '../../components';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchBox } from '../../components/search/SearchBox';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { VideoPlay } from '../../components/videoPlayer/VideoPlayer';
import '@splidejs/splide/dist/css/splide.min.css';
import { supabase } from '../../supabase/SupabaseConfig';
import { CoursesActions } from './skill/courses/CoursesActions';

const SkillCenter = () => {
    const location = useLocation();
    const [open, setOpen] = React.useState(location.state ? location.state.open : true);
    const { theme } = React.useContext(ThemeContext);
    const [isReady, setIsReady] = React.useState(false);
    const [input, setInput] = React.useState('');
    const [result, setResult] = React.useState([]);

    React.useEffect(() => {
        if (input.length > 0 && input.trim() !== '') {
            supabase
                .from('courses')
                .select('*')
                .or(`body.ilike.%${input}%,name.ilike.%${input}%`)
                .then(({ data, error }) => {
                    if (error) {
                        console.error('Error fetching courses:', error);
                    } else {
                        setResult(data);
                    }
                });
        } else {
            setResult([]);
        }
    }, [input]);
    

    const navigate = useNavigate();

    const handleCanPlay = () => {
        setIsReady(true);
    };

    const handleClickOpen = () => {
        setOpen(false);
    };

    console.log(result);

    const mPostCarousel = {
        type: 'slide',
        pauseOnHover: false,
        pagination: true,
        arrows: false,
    };

    const categories = [
        { url: null, title: 'All' },
        { url: 'makeup', title: 'Makeup' },
        { url: 'craft', title: 'Craft' },
        { url: 'fashion', title: 'Fashion design' },
        { url: 'cosmetics', title: 'Cosmetics' },
    ];

    const goToStore = (post) => {
        if (post.categories.includes('makeup')) {
            navigate('/makeup');
        } else if (post.categories.includes('craft')) {
            navigate('/craft');
        } else if (post.categories.includes('fashion')) {
            navigate('/fashion');
        } else if (post.categories.includes('cosmetics')) {
            navigate('/cosmetics');
        }
    };

    const search = (
        <svg className="absolute w-[20px] h-[20px] top-[50%] left-[1rem] translate-y-[-50%]" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M9.579 6.31004e-07C8.07976 0.000801964 6.60162 0.353313 5.26339 1.0292C3.92515 1.70509 2.76414 2.6855 1.87367 3.89164C0.9832 5.09778 0.38811 6.496 0.13623 7.97393C-0.115651 9.45185 -0.0172969 10.9683 0.423386 12.4013C0.86407 13.8343 1.63479 15.1439 2.6736 16.2249C3.71242 17.3059 4.99035 18.1281 6.40468 18.6255C7.81902 19.1229 9.33031 19.2815 10.8171 19.0886C12.3039 18.8957 13.7247 18.3567 14.9653 17.515L20.8883 23.4332C21.0528 23.6097 21.2512 23.7513 21.4716 23.8496C21.692 23.9478 21.93 24.0006 22.1713 24.0048C22.4126 24.0091 22.6522 23.9647 22.876 23.8743C23.0998 23.784 23.303 23.6494 23.4737 23.4788C23.6443 23.3081 23.7788 23.1049 23.8692 22.8811C23.9596 22.6574 24.004 22.4177 23.9997 22.1764C23.9955 21.9351 23.9426 21.6972 23.8444 21.4767C23.7462 21.2563 23.6046 21.0579 23.428 20.8934L17.5099 14.9704C18.489 13.5294 19.0568 11.8487 19.1522 10.1092C19.2476 8.36962 18.8671 6.63695 18.0515 5.09746C17.236 3.55798 16.0162 2.26991 14.5234 1.37177C13.0306 0.473622 11.3212 -0.000631453 9.579 6.31004e-07ZM3.58892 9.58412C3.58892 7.99545 4.22002 6.47185 5.34337 5.3485C6.46673 4.22514 7.99033 3.59404 9.579 3.59404C11.1677 3.59404 12.6913 4.22514 13.8146 5.3485C14.938 6.47185 15.5691 7.99545 15.5691 9.58412C15.5691 11.1728 14.938 12.6964 13.8146 13.8197C12.6913 14.9431 11.1677 15.5742 9.579 15.5742C7.99033 15.5742 6.46673 14.9431 5.34337 13.8197C4.22002 12.6964 3.58892 11.1728 3.58892 9.58412Z" fill="#7A7A7A" />
        </svg>
    );

    return (
        <>
            <Title className='font-[600] text-[14px]' title='SKILL CENTER' />
            <SkillDialog open={open} handleClickOpen={handleClickOpen} />
          
            <InfiniteList resource='courses' actions={<CoursesActions />} title=' '
                sx={{
                    '& .MuiToolbar-root': {
                        minHeight: '0px !important'
                    },
                    '& .RaList-content': {
                        backgroundColor: theme === "light" ? "#fff" : "#222",
                        color: theme === "light" ? "#222" : "#fff",
                        
                    }
                }}
             
            >
                <div className=' max-w-[90vw] laptop:max-w-[1000px]   pb-[3rem]'>
                    {/* Search box */}
                    <div className='general search--box mx-auto' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
                        <input
                            className='search--input'
                            type='search'
                            placeholder='Search for courses'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        {search}
                    </div>
                    
                    <div className='stacked--contents'>
                        <WithListContext render={({ isLoading, data }) => (
                            !isLoading ? (
                                <>
                                    {data && Array.from(
                                        data.reduce((map, post) => {
                                            post.categories.forEach(category => {
                                                if (!map.has(category)) {
                                                    map.set(category, post);
                                                }
                                            });
                                            return map;
                                        }, new Map())
                                            .values()).map((post, index) => {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <div className='stacked--container' onClick={() => goToStore(post)}>

                                                            <div className="stacked-avatar-container relative">
                                                                <div className="absolute w-[50px] h-[50px] z-[10] right-[0px]  bg-[#3d3d3d] rounded-full"></div>
                                                                <div className="absolute w-[50px] h-[50px]  right-[-2px]  bg-[#D9D9D9] rounded-full"></div>
                                                                {post?.media && post?.media.map((mediaUrl) => {
                                                                    return (
                                                                        <div key={mediaUrl.id} className="min-w-[50px] h-[50px] z-[15] overflow-hidden rounded-full relative">
                                                                            <video className='w-full h-full object-cover' src={mediaUrl} autoPlay={false} controls={false} playsInline={true} nodownload='true' />
             
                                                                        </div>

                                                                    )
                                                                })}
                                                            </div>
                                                            <div className='stacked--name'>{post.categories}</div>
                                                        </div>
                                                    </React.Fragment>
                                                );
                                            })}


                                </>
                            ) : (
                                <p className='font-[500] text-[#222] flex items-center justify-center'>Loading...</p>
                            ))}
                        />
                        
                    </div>

                    <div className='search__card--container shadow-md drop-shadow-md pb-[5px]'>
                        <Splide options={mPostCarousel} className='mobile--post-splide overflow-hidden rounded-[10px] card__splide h-[137px] w-full' >
                            <WithListContext render={({ isLoading, data }) => (
                                !isLoading ? (
                                    <>
                                        {data && data.slice(0, 4).map((post, index) => {
                                            const mediaUrl = post.media[0];
                                            const isImage = mediaUrl.includes('.jpg') || mediaUrl.includes('.jpeg') || mediaUrl.includes('.png');
                                            return (
                                                <SplideSlide key={index} className='w-full h-[137px] relative youtube--container  '>
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
                        </Splide>
                        {/* <AdCard />
                    <AdCard />
                    <AdCard /> */}
                    </div>

                    {categories.map((category, index) => (
                        <WithListContext key={index} render={({ isLoading, data }) => (
                            !isLoading && (
                                <>
                                    {result && result.length > 0 ? (
                                        <CustomInfiniteList
                                            data={category.url ? result.filter(post => post.categories.includes(category.url)) : result}
                                            title={category.title}
                                            handleCanPlay={handleCanPlay}
                                            isReady={isReady}
                                            theme={theme}
                                        />
                                  
                                    ) : (
                                        <>
                                            {data && (
                                                <CustomInfiniteList
                                                    data={category.url ? data.filter(post => post.categories.includes(category.url)) : data}
                                                    title={category.title}
                                                    handleCanPlay={handleCanPlay}
                                                    isReady={isReady}
                                                    theme={theme}
                                                />
                                            )}
                                        </>
                                    )}
                                    
                                </>
                            )
                        )}
                        />
                    ))}

                    
            
                </div>
            </InfiniteList>
            <SFooter />
        </>
    );
};

export default SkillCenter

const CustomInfiniteList = ({ title, handleCanPlay, isReady, data }) => {
    const navigate = useNavigate();
    const goToStore = () => {
        const categories = ['makeup', 'craft', 'fashion', 'cosmetics'];
        if (categories.every(category => data.some(post => post.categories.includes(category)))) {
            navigate('/courses');
        } else if (data.some(post => post.categories.includes('makeup'))) {
            navigate('/makeup');
        } else if (data.some(post => post.categories.includes('craft'))) {
            navigate('/craft');
        } else if (data.some(post => post.categories.includes('fashion'))) {
            navigate('/fashion');
        } else if (data.some(post => post.categories.includes('cosmetics'))) {
            navigate('/cosmetics');
        }
    };

    

    return (

   
        <>
            <div className='flex justify-between items-center pt-[1rem] pb-[5px] text-[12px] feed--page px-[5px] laptop:text-[16px]'>
                <h2>{title}</h2>
                <div className='flex items-center gap-x-[7px] relative cursor-pointer'>
                    <h2
                        onClick={goToStore}
                    >
                        View all
                    </h2>

            
                </div>
      
            </div>


            <div className='pb-[1.5rem] pt-[10px]  flex gap-x-[15px] store__card overflow-x-scroll feed--page laptop:max-w-[1000px] max-w-[90vw] mx-auto' style={{ boxSizing: 'border-box' }}>
                {data && data.slice(0, 9).map((product) => {
                    const mediaUrl = product.media[0]; // Get the URL of the single media file
                    const isImage = mediaUrl.includes('.jpg') || mediaUrl.includes('.jpeg') || mediaUrl.includes('.png');
                    
  
                    return (
                        <CourseVideos product={product} isImage={isImage} mediaUrl={mediaUrl} isReady={isReady} handleCanPlay={handleCanPlay} />
   
                    )
                })
                }
            </div>
                                    
        </>
                          
                    
    );
};

const CourseVideos = ({ product, isImage, mediaUrl, isReady, handleCanPlay }) => {

    const { data: views, total: totalViews, isLoading, error } = useGetList(
        'viewers', { filter: { video_id: product?.id } }
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
    
    return (
        <div key={product.id} className="min-w-[100px]  flex-shrink-0 " >
            <div className="min-w-[100px] h-[100px] laptop:w-[250px] laptop:h-[250px] rounded-[5.374px] overflow-hidden relative">
            <Link to={`/courses/${product.id}/show`}>
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
                <div className='absolute bottom-[6.34px] left-[5.93px] laptop:text-[12px] text-[6.374px] text-white'>
                    {formatFollowers(totalViews)} views
                </div>
            </Link>               
            </div>
            <div className='mt-[5.6px] text-[8.6px] laptop:text-[13px]'>
                <p>Single style video</p>
                <p>$10.00</p>
            </div>
                                               
                                             
        </div>
    );
};