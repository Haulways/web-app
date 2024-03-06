import * as React from 'react';
import Button from '@mui/material/Button';
import { CardMedia, IconButton, Skeleton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './card.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import forwardBtn from "../../assets/forwardBtn.png";
import { InfiniteList, WithListContext, useRedirect } from 'react-admin';
import { supabase } from '../../supabase/SupabaseConfig';
import { ThemeContext } from '../context/ThemeProvider';
import { ShortReviews } from '../reviews/ShortReviews';





// showpage horizontal carousels 
export const ShowPageCarousels = ({ mediaUrl, handlePurchase, handleOpenPurchase1, setCurrentMediaUrl, price }) => {
    const handlePurchaseBox = () => {
        handleOpenPurchase1();
        handlePurchase();
        setCurrentMediaUrl(mediaUrl);
    }
    return (
        <>
            <div>

                <div className='showCard__container'>
                    {/* product container  */}
                    <div className='showCard__img'>
                       
                            <img src={mediaUrl.images && mediaUrl.images.length ? (mediaUrl.images[0].url) : (null)} alt={mediaUrl.title} />
                        
                    </div>

                    {/* product details container  */}
                    <div className='showCard__details'>
                        <div className='info'>
                            <span className='price'>
                                {price}
                            </span>
                            <h2 className='body'>
                                {mediaUrl.description}
                            </h2>

                            <p className='brand'>
                                {mediaUrl.title}
                            </p>
                        </div>

                        <IconButton sx={{ padding: '0' }} onClick={handlePurchaseBox}>
                            <div className="action__btn">
                                <img src={forwardBtn} alt='purchase' />
                            </div>
                        </IconButton>
                        
                    </div>
                </div>

            </div>
        </>
    )
};

export const ShowPageCarousels_1 = ({ mediaUrl, activeIndex, index, post, price }) => {
    const redirect = useRedirect();
    const { theme } = React.useContext(ThemeContext);


    const handlePurchaseBox = (props) => {
        const { productId, resource, page } = props;
        console.log(page, resource, productId);

        if (productId && resource && page) {
            redirect(page, resource, productId)
        }
    }


    return (
        <>

                <div className={`showCard__container mb-1`} style={{ backgroundColor: theme === "light" ? "#d9d9d9" : "rgba(68, 68, 68, 0.5)", color: theme === "light" ? "#222" : "#fff", boxShadow: activeIndex === index ? "0px -1px 8px 0px rgba(232, 232, 232, 0.10), 0px 1px 8px 0px #CCC" : '' }}>
                    {/* product container  */}
                    <div className='showCard__img'>
                        <img src={mediaUrl.thumbnail} alt={mediaUrl.title} />
                    </div>

                    {/* product details container  */}
                    <div className='showCard__details pr-[8px]' style={{ backgroundColor: activeIndex === index && "#000" }}>
                        <div className='info'>
                            <span className='price' style={{ color: activeIndex === index ? "#fff" : "" }}>
                                {price}
                            </span>
                            <h2 className='body' style={{ color: activeIndex === index ? "#fff" : "" }}>
                                {mediaUrl.description}
                            </h2>

                            <p className='brand' style={{ color: activeIndex === index ? "#fff" : "" }}>
                                {mediaUrl.title}
                            </p>
                        </div>

                        <IconButton sx={{ padding: '0' }} onClick={() =>
                            handlePurchaseBox({ productId: mediaUrl.id, resource: "product", page: "show" })
                        }
                        >
                            <div className="h-[74px] w-[40px] flex flex-col items-center justify-center  rounded-[11px] flex-shrink-0 overflow-hidden cursor-pointer">
                                <img src={forwardBtn} alt='purchase' className='' style={{ filter: activeIndex === index && "invert(1)" }} />
                            </div>
                        </IconButton>
                        
                    </div>
                </div>
                <InfiniteList title=' ' resource='product_review' actions={false}
                    sx={{
                        '& .MuiBox-root': {
                            padding: '0',
          
                        },
                        backgroundColor: theme === "light" ? "#fff" : "#222", color: theme === "light" ? "#222" : "#fff",
                    }}
                >
                    <WithListContext render={({ isLoading, data }) => (
                        !isLoading && (
                            <>
                                <ShortReviews activeIndex={activeIndex} url='product_review' index={index} theme={theme} mediaUrl={post.taggedProducts[activeIndex]} data={data} />
                            </>
                        ))}
                    />
       
                </InfiniteList>
        
        </>
    );
};

// Tag CaReact.rd Component 
export const TagCard = ({ post, taggedData, setTaggedData, theme }) => {

    const isTagged = taggedData.some(item => item.id === post.id);



    const handleAddClick = () => {
        if (!isTagged) {
            const product = post;
            const updatedTaggedData = [...taggedData, product];
            setTaggedData(updatedTaggedData); // Add this line
        } else {
            const product = taggedData.filter(item => item.id !== post.id);
            setTaggedData(product);
        }
    };
    
    
    const buttonStyle = isTagged ? { backgroundColor: 'black', color: 'white' } : {};
   
    return (
        <>
            <div>

                <div className=' tagCard__container' style={{backgroundColor: theme === "light" ? "#d9d9d9" : "rgba(68, 68, 68, 0.5)", color: theme === "light" ? "#222" : "#fff"}}>
                    {/* product container  */}
                    <div className='showCard__img'>
   
                        <img src={post.images[0].url} alt={post.title} />
                       
                    </div>

                    {/* product details container  */}
                    <div className='showCard__details ' style={{backgroundColor: theme === "light" ? "#d9d9d9" : "rgba(68, 68, 68, 0.2)", color: theme === "light" ? "#222" : "#fff"}}>
                        <div className='info'>
                            <h2 className='body' style={{color: theme === "light" ? "#222" : "#fff"}}>
                                {post.description}
                            </h2>

                            <p className='brand' style={{color: theme === "light" ? "#222" : "#fff"}}>
                                {post.title}
                            </p>

                            <span className='price' style={{color: theme === "light" ? "#222" : "#fff"}}>
                                $150.00
                            </span>

                        </div>

                        <div className="">
                            <button className='addTag-btn' style={buttonStyle} onClick={handleAddClick}>
                                {isTagged ? 'Remove' : 'Add'}
                            </button>
                        </div>
     
                        
                    </div>
                </div>

            </div>
        </>
    );
};

export const TagCard2 = ({ post, taggedData, setTaggedData, broadcasterData, theme }) => {

    const isTagged = taggedData.some(item => item.id === post.id);

    const updateTable = async (updatedTaggedData) => {
        let { data, error } = await supabase
            .from('liveStream')
            .update({ taggedProducts: updatedTaggedData })
            .match({ id: broadcasterData.id })
     
        if (error) console.error('Error updating table: ', error)
        else console.log('Table updated successfully: ', data)
     }

    const handleAddClick = () => {
        if (!isTagged) {
            const product = post;
            const updatedTaggedData = [...taggedData, product];
            setTaggedData(updatedTaggedData); // Add this line
            updateTable(updatedTaggedData); // Add this line
        } else {
            const product = taggedData.filter(item => item.id !== post.id);
            setTaggedData(product);
            updateTable(product);
        }
    };
    
    
    const buttonStyle = isTagged ? { backgroundColor: 'black', color: 'white' } : {};
   
    return (
        <>
            <div>

                <div className='tagCard__container' style={{backgroundColor: theme === "light" ? "#d9d9d9" : "rgba(68, 68, 68, 0.5)", color: theme === "light" ? "#222" : "#fff"}}>
                    {/* product container  */}
                    <div className='showCard__img'>
   
                        <img src={post.thumbnail} alt={post.title} />
                       
                    </div>

                    {/* product details container  */}
                    <div className='showCard__details ' style={{backgroundColor: theme === "light" ? "#d9d9d9" : "rgba(68, 68, 68, 0.2)", color: theme === "light" ? "#222" : "#fff"}}>
                        <div className='info'>
                            <h2 className='body' style={{color: theme === "light" ? "#222" : "#fff"}}>
                                {post.description}
                            </h2>

                            <p className='brand' style={{color: theme === "light" ? "#222" : "#fff"}}>
                                {post.title}
                            </p>

                            <span className='price' style={{ color: theme === "light" ? "#222" : "#fff"}}>
                                $150.00
                            </span>

                        </div>

                        <div className="">
                            <button className='addTag-btn' style={buttonStyle} onClick={handleAddClick}>
                                {isTagged ? 'Remove' : 'Add'}
                            </button>
                        </div>
     
                        
                    </div>
                </div>

            </div>
        </>
    );
};

export const AdCard = ({ post, taggedData, setTaggedData, theme, mediaUrl }) => {
    const [isReady, setIsReady] = React.useState(false);
    const handleCanPlay = () => {
        setIsReady(true);
    };

    const isTagged = taggedData && post.id === taggedData.id;

    const handleAddClick = (post) => {
        // Check if the clicked post is already selected
        if (isTagged) {
            // If it is, deselect it
            setTaggedData(null);
        } else {
            // If it isn't, select it
            setTaggedData(post);
        }
    };
    
    
    const buttonStyle = isTagged ? { backgroundColor: 'black', color: 'white' } : {};
   
    return (
        <>
            <div>

                <div className='tagCard__container' style={{ backgroundColor: theme === "light" ? "#d9d9d9" : "rgba(68, 68, 68, 0.5)", color: theme === "light" ? "#222" : "#fff" }}>
                    {/* product container  */}
                    <div className='showCard__img'>
   
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
                       
                    </div>

                    {/* product details container  */}
                    <div className='showCard__details ' style={{ backgroundColor: theme === "light" ? "#d9d9d9" : "rgba(68, 68, 68, 0.2)", color: theme === "light" ? "#222" : "#fff" }}>
                        <div className='info'>
                            <span className='price' style={{ color: theme === "light" ? "#222" : "#fff" }}>
                                $10.00
                            </span>
                            <h2 className='body' style={{ color: theme === "light" ? "#222" : "#fff" }}>
                                {post.body}
                            </h2>

                            <p className='brand' style={{ color: theme === "light" ? "#222" : "#fff" }}>
                                {post.name}
                            </p>
                        </div>

                        <div className="">
                            <button className='addTag-btn' style={buttonStyle} onClick={() => handleAddClick(post)}>
                                {isTagged ? 'Remove' : 'Add'}
                            </button>
                        </div>
     
                        
                    </div>
                </div>

            </div>
        </>
    );
};


export const LiveCarousels = ({ mediaUrl, handlePurchase, handleOpenPurchase1, setCurrentMediaUrl, theme }) => {
    const handlePurchaseBox = () => {
        handleOpenPurchase1();
        handlePurchase();
        setCurrentMediaUrl(mediaUrl);
    }
    return (
        <>
            <div>

                <div className='showCard__container' style={{backgroundColor: theme === "light" ? "#d9d9d9" : "rgba(68, 68, 68, 0.5)", color: theme === "light" ? "#222" : "#fff"}}>
                    {/* product container  */}
                    <div className='showCard__img'>
                       
                            <img src={mediaUrl.thumbnail} alt={mediaUrl.title} />
                        
                    </div>

                    {/* product details container  */}
                    <div className='showCard__details' style={{backgroundColor: theme === "light" ? "#d9d9d9" : "rgba(68, 68, 68, 0.2)", color: theme === "light" ? "#222" : "#fff"}}>
                        <div className='info'>
                            <span className='price' style={{ color: theme === "light" ? "#222" : "#fff"}}>
                                $150.00
                            </span>
                            <h2 className='body' style={{ color: theme === "light" ? "#222" : "#fff"}}>
                                {mediaUrl.description}
                            </h2>

                            <p className='brand' style={{ color: theme === "light" ? "#222" : "#fff"}}>
                                {mediaUrl.title}
                            </p>
                        </div>

                        <IconButton sx={{ padding: '0' }} onClick={handlePurchaseBox}>
                            <div className="action__btn">
                                <img src={forwardBtn} alt='purchase' />
                            </div>
                        </IconButton>
                        
                    </div>
                </div>

            </div>
        </>
    )
};

// Tagged products cards 
export const TaggedProductCard = ({ product, theme }) => {

    
    return (
        <>
            <div>

                <div className='showCard__container'>
                    {/* product container  */}
                    <div className='showCard__img'>
                    <img src={product.images[0].url} alt={product.title} />
                    </div>

                    {/* product details container  */}
                    <div className='showCard__details'>
                        <div className='info'>
                            <span className='price'>
                                $150.00
                            </span>
                            <h2 className='body'>
                                {product.description}
                            </h2>

                            <p className='brand'>
                                {product.title}
                            </p>
                        </div>

                        <IconButton sx={{ padding: '0' }}>
                            <div className="action__btn">
                                <img src={forwardBtn} alt='purchase' />
                            </div>
                        </IconButton>
                        
                    </div>
                </div>

            </div>
        </>
    )
};

export const TaggedVideoCard = ({ product, theme }) => {
    const mediaUrl = product.media[0];
    const [isReady, setIsReady] = React.useState(false);
    const handleCanPlay = () => {
        setIsReady(true);
    };
    return (
        <>
            <div>

                <div className='showCard__container' style={{backgroundColor: theme === "light" ? "#d9d9d9" : "rgba(68, 68, 68, 0.5)", color: theme === "light" ? "#222" : "#fff"}}>
                    {/* product container  */}
                    <div className='showCard__img'>
                        <>
                            {!isReady && <Skeleton variant="rectangular" width="100%" height='100%' />}
                            <CardMedia
                                component="video"
                                src={mediaUrl}
                                playsInline={true}
                                className="object-cover h-full w-full"
                                muted={true}
                                controls={false}
                                poster={product.posterUrl ? product.posterUrl : null}
                                onCanPlay={handleCanPlay}
                                style={{ display: isReady ? 'block' : 'none' }}
                            />
                              
                        </>
                    </div>

                    {/* product details container  */}
                    <div className='showCard__details' style={{backgroundColor: theme === "light" ? "#d9d9d9" : "rgba(68, 68, 68, 0.2)", color: theme === "light" ? "#222" : "#fff"}}>
                        <div className='info'>
                            <span className='price' style={{color: theme === "light" ? "#222" : "#fff"}}>
                                $10.00
                            </span>
                            <h2 className='body' style={{color: theme === "light" ? "#222" : "#fff"}}>
                                {product.body}
                            </h2>

                            <p className='brand' style={{color: theme === "light" ? "#222" : "#fff"}}>
                                {product.name}
                            </p>
                        </div>

                        <IconButton sx={{ padding: '0' }}>
                            <div className="action__btn">
                                <img src={forwardBtn} alt='purchase' />
                            </div>
                        </IconButton>
                        
                    </div>
                </div>

            </div>
        </>
    )
};


export const TaggedProductCard2 = ({ product, theme }) => {

    
    return (
        <>
            <div>

                <div className='showCard__container' style={{backgroundColor: theme === "light" ? "#d9d9d9" : "rgba(68, 68, 68, 0.5)", color: theme === "light" ? "#222" : "#fff"}}>
                    {/* product container  */}
                    <div className='showCard__img'>
                    <img src={product.thumbnail} alt={product.title} />
                    </div>

                    {/* product details container  */}
                    <div className='showCard__details' style={{backgroundColor: theme === "light" ? "#d9d9d9" : "rgba(68, 68, 68, 0.2)", color: theme === "light" ? "#222" : "#fff"}}>
                        <div className='info'>
                            <span className='price' style={{ color: theme === "light" ? "#222" : "#fff"}}>
                                $150.00
                            </span>
                            <h2 className='body' style={{ color: theme === "light" ? "#222" : "#fff"}}>
                                {product.description}
                            </h2>

                            <p className='brand' style={{ color: theme === "light" ? "#222" : "#fff"}}>
                                {product.title}
                            </p>
                        </div>

                        <IconButton sx={{ padding: '0' }}>
                            <div className="action__btn">
                                <img src={forwardBtn} alt='purchase' />
                            </div>
                        </IconButton>
                        
                    </div>
                </div>

            </div>
        </>
    )
};



export const SmallProductCard = ({ handleCloseCard, setThumbnailCarousel, Posts, post }) => {

    const thumbnailCarouselOptions = {
        direction: 'ttb',
        height: 'fit-content',
        type: 'slide',
        fixedWidth: 60.16,
        fixedHeight: 63.16,
        isNavigation: true,
        pagination: false,
        gap: 5,
        drag: 'free',
        snap: false,
        perPage: 3,
        pauseOnHover: false,
        arrows: false,
    };

    


    return (
        <div className='catalogue__container' >
            
            <div className="catalogue__contents">

                <div className='catalogue__closeBtn' onClick={handleCloseCard}>
                    <Button sx={{ padding: '0' }}>
                        <ExpandMoreIcon fontSize='large' />
                    </Button>
                </div>
                
                <Splide id="thumbnail-carousel" options={thumbnailCarouselOptions} onReady={(splide) => setThumbnailCarousel(splide)} >

                    {Array.isArray(post.media) && post.media.slice(0, 4).map((mediaUrl, index) => {
                        const isImage = mediaUrl.includes('.jpg') || mediaUrl.includes('.jpeg') || mediaUrl.includes('.png');
                        return (
                            <SplideSlide key={index} className='w-[60.16px] h-[63.16px] rounded-[8px] overflow-hidden '>
                                <div className='catalogueImg'>
                                    {isImage ? (
                                        <img src={mediaUrl} alt={post.id} />
                                    ) : (
                                        <video src={mediaUrl} alt={post.id} muted controls={false} playsInline={true}controlsList="nodownload" />
                                    )}
                                </div>
                            </SplideSlide>
                        );
                    })}

                            
                    
                </Splide>
            </div>
       
              
        </div>
    );
};




export const SmallPHorizontalCards = ({ post }) => {
    const slider1 = React.useRef();
    const slider2 = React.useRef();
  
    React.useEffect(() => {
      slider1.current.sync(slider2.current.splide);
    //   slider2.current.sync(slider1.current.splide);
    }, [slider1, slider2]);

    const thumbnailCarouselOptions = {
        type: 'slide',
        fixedWidth: 60.16,
        fixedHeight: 63.16,
        isNavigation: true,
        pagination: false,
        gap: 5,
        drag: 'free',
        snap: false,
        perPage: 3,
        pauseOnHover: false,
        arrows: false,
        direction:'ttb',
        height: '70vw',
        autoHeight: true
        // focus: slideFocus
    };

    const bigThumbnailCarouselOptions = {
        type: 'slide',
        // fixedWidth: 100,
        isNavigation: true,
        pagination: false,
        gap: 5,
        drag: 'free',
        snap: true,
        perPage: 1,
        pauseOnHover: false,
        arrows: false,
        // focus: slideFocus
    };

    



    return (
        <div className='catalogue__container mx-auto flex flex-row-reverse' >
                
            <Splide id="thumbnail-carousel" className='catalogue__container__big' options={bigThumbnailCarouselOptions} ref={slider1}>

                {Array.isArray(post.images) && post.images.slice(0, 4).map((mediaUrl, index) => {
                    const isImage = mediaUrl.url.includes('.jpg') || mediaUrl.url.includes('.jpeg') || mediaUrl.url.includes('.png');
                    return (
                        <SplideSlide key={index} className='w-full h-full rounded-[8px] overflow-hidden border'>
                            <div className='catalogueImg'>
                                {isImage ? (
                                    <img src={mediaUrl.url} alt={post.id} className="w-full h-full object-cover" style={{height: '70vw'}} />
                                ) : (
                                    <video src={mediaUrl} alt={post.id} muted controls={false} playsInline={true} controlsList="nodownload" />
                                )}
                            </div>
                        </SplideSlide>
                    );
                })}
                    
            </Splide>
            <div className='px-[1px]'></div>
            <Splide id="thumbnail-carousel mr-2" options={thumbnailCarouselOptions} ref={slider2 }>

                {Array.isArray(post.images) && post.images.slice(0, 4).map((mediaUrl, index) => {
                    const isImage = mediaUrl.url.includes('.jpg') || mediaUrl.url.includes('.jpeg') || mediaUrl.url.includes('.png');
                    return (
                        <SplideSlide key={index} className='w-[60.16px] h-[63.16px] rounded-[8px] overflow-hidden'>
                            <div className='catalogueImg'>
                                {isImage ? (
                                    <img src={mediaUrl.url} alt={post.id} />
                                ) : (
                                    <video src={mediaUrl} alt={post.id} muted controls={false} playsInline={true} controlsList="nodownload" />
                                )}
                            </div>
                        </SplideSlide>
                    );
                })}
                    
            </Splide>
                        
        </div>
    );
};

export const SmallPHorizontalVariantCards = ({ post }) => {
    const { theme } = React.useContext(ThemeContext);

    // console.log(post);
    // const slider1 = React.useRef();
    // const slider2 = React.useRef();
  
    // React.useEffect(() => {
    //   slider1.current.sync(slider2.current.splide);
    // }, [slider1, slider2]);

    const thumbnailCarouselOptions = {
        type: 'slide',
        fixedWidth: 'auto',
        fixedHeight: 43.16,
        isNavigation: true,
        pagination: false,
        gap: 5,
        drag: 'free',
        snap: false,
        perPage: 3,
        pauseOnHover: false,
        arrows: false,
        // focus: slideFocus
    };

    

    



    return (
        <div className='catalogue__container mx-auto' >
                
            
            
            <Splide id="thumbnail-carousel" options={thumbnailCarouselOptions}>

                {post && post.variants && Array.isArray(post.variants) && post.variants.slice(0, 4).map((mediaUrl, index) => {
                    // const isImage = mediaUrl.url.includes('.jpg') || mediaUrl.url.includes('.jpeg') || mediaUrl.url.includes('.png');
                    return (
                        <SplideSlide key={index} className='w-auto h-[63.16px] px-2 rounded-[8px] overflow-hidden flex flex-nowrap justify-center items-center bg-[#eee]' style={{
                            backgroundColor: theme === 'light' ? '#fff' : 'rgba(68, 68, 68, 0.2)',
                            color: theme === 'light' ? '#222' : '#fff',
                            boxShadow: theme === 'light' ? '0 5px 4px rgba(0, 0, 0, 0.01)!important' : '0 5px 4px rgba(0, 0, 0, 0.01)!important',
                        }}>
                            <div className='catalogueImg'>
                                {mediaUrl.title}
                                
                                {/* {isImage ? (
                                    <img src={mediaUrl.url} alt={post.id} />
                                ) : (
                                    <video src={mediaUrl} alt={post.id} muted controls={false} playsInline={true} controlsList="nodownload" />
                                )} */}
                            </div>
                        </SplideSlide>
                    );
                })}
                    
            </Splide>
            <div className='py-2'></div>
                        
        </div>
    );
};

// showpage horizontal carousels 
// export const ProductCard = ({ product }) => {

//     const AddToCartButton = ({ variantId, qty, children, product }) => {
//         const { addItem2Cart } = addCart();
    
//         const handleClick = () => {
//             toast(product.title + " Added to cart");
//             addItem2Cart(variantId, qty);
//         };
    
//         return (
//             <Button onClick={handleClick}>
//                 {children}
//             </Button>
//         );
//     };
    
    

//     // console.log(product);

   
//     return (
//         <>
//             <div>

//                 <div className='showCard__container'>
//                     {/* product container  */}
//                     <div className='showCard__img'>
//                         <img src={product.images[0].url} alt={product.title} />
//                     </div>

//                     {/* product details container  */}
//                     <div className='showCard__details'>
//                         <div className='info'>
//                             <span className='price'>
//                                 $150.00
//                             </span>
//                             <h2 className='body'>
//                                 {product.description}
//                             </h2>

//                             <p className='brand'>
//                                 {product.title}
//                             </p>
//                         </div>

                       
//                             <AddToCartButton variantId={product.variants[0].id} qty={1} product={product}>

//                             <div className="action__btn">
//                                 <img src={forwardBtn} alt='purchase' />
//                             </div>
//                             </AddToCartButton>
                       
                        
//                     </div>
//                 </div>

//             </div>
//         </>
//     )
// };

