import * as React from 'react';
import './search.css';
import { Avatar, Card, CardActionArea, CardContent, CardHeader, CardMedia, IconButton, Skeleton, Typography } from "@mui/material";
import { StoreViewALl, ViewAllDialog } from './ViewAll';
import userIcon from "../../assets/default-user-image.png";
import { InfiniteList, Link, WithListContext } from 'react-admin';
import { ThemeContext } from '../context/ThemeProvider';




// Search cards 
export const SearchCards = ({ title, subTitle, type }) => {
    const [openView, setOpenView] = React.useState(false);
    const [isReady, setIsReady] = React.useState(false);
    const { theme } = React.useContext(ThemeContext);

    const handleCanPlay = () => {
      setIsReady(true);
    };
    const handleViewAll = () => {
        setOpenView(true);
    };

    const closeViewAll = () => {
        setOpenView(false);
    };

    

    const SearchCard = ({ post, mediaUrl }) => (
        <div className="search--card">
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
        </div>
    );

    return (
        <>

            <div className='searched--result max-w-[90vw]'>
                <div className='seached-text'>
                    <h2>{title}</h2>
                    <span>{subTitle} - {type}</span>
                </div>

               
                <div className='view--all' onClick={handleViewAll}>
                    <IconButton sx={{ color: '#222', fontSize: '10px', fontWeight: '600' }}>
                        View All
                    </IconButton>
                </div>
               
            </div>

            <InfiniteList
                resource='posts'
                title=" "
                actions={false}
                sx={{
                    "& .MuiToolbar-root": {
                        minHeight: "0px !important",
                    },
                    "& .MuiBox-root": {
                        padding: "0 ",
                    },
                    '& .MuiPaper-root': {
                        backgroundColor: theme === "light" ? "#fff !important" : "#222 !important",
                        color: theme === "light" ? "#222 !important" : "#fff !important",
                      },
                }}
            >
                <WithListContext render={({ isLoading, data }) => (
                    
                    !isLoading ? (
                        <>
                            {data && !data.length && <span>No Posts</span>}
                            {data && data.length > 0 && (
                                <>
                                    <div className='search__card--container'>
                                        {data && data.map((post) => {
                                            const mediaUrl = post.media[0]; // Get the URL of the 
                                            return (
                                                <SearchCard key={post.id} post={post} mediaUrl={mediaUrl} />
                                            )
                                        })
                                        }
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <p className='font-[500] text-[#222] flex items-center justify-center'>Loading...</p>
                    ))}
                />
                                
            </InfiniteList>

            <ViewAllDialog openView={openView} closeViewAll={closeViewAll} title={title} subTitle={subTitle} type={type} />

        </>
    );
};


// Serach normal cards 
export const NormalSearchCards = ({ title, subTitle, type, post, mediaUrl }) => {
    const [isReady, setIsReady] = React.useState(false);
    const handleCanPlay = () => {
      setIsReady(true);
    };
   
    return (
        <>
            <Card sx={{ minWidth: '150px', width: '100%', maxWidth: '100%', boxShadow: 'none', position: 'relative' }}>

                <CardActionArea className="normalCard--bg" >
                <Link to={`/${post.URL}/${post.id}/show`}>
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
                    </Link>
                </CardActionArea>
                <CardContent sx={{ paddingLeft: 0, paddingTop: '10px', paddingBottom: '10px' }} >
                    <Typography className="normalSearchCard--text tablet:text-[16px] laptop:text-[16px]" variant='h2' sx={{ fontSize: '12px', fontWeight: 600, paddingBottom: '5px' }}>
                        {title}
                    </Typography>
                    <Typography className="normalSearchCard--text tablet:text-[16px] laptop:text-[16px]" variant='h2' sx={{ fontSize: '10px', fontWeight: 600 }}>
                        {subTitle} - {type}
                    </Typography>
                    
                </CardContent>

                <CardHeader sx={{ padding: 0 }} className="normalcard--header"
                    avatar={
                        <Avatar className="tablet:h-[30px] tablet:w-[30px] laptop:h-[30px] laptop:w-[30px] drop-shadow" sx={{ height: '25px', width: '25px', overflow: 'hidden' }} 
                            src={post.photoURL} 
                        />
                    }
        
                    title={
                        <Typography className="laptop:text-[14px] tablet:text-[13px]" sx={{ color: '#636363', fontSize: '10px', fontWeight: 600 }}>
                            {post.name}
                        </Typography>
                    }
       
                />
            </Card>
        
        </>
    );
};


// store cards 
export const StoreCards = ({ title, subTitle, name, price, product, products }) => {
    const [openView, setOpenView] = React.useState(false);
    const { theme } = React.useContext(ThemeContext);

    const handleViewAll = () => {
        setOpenView(true);
    };

    const closeViewAll = () => {
        setOpenView(false);
    };

    

    const SearchCard = ({ product }) => (
        <div className="search--card">
            <img src={product.thumbnail} alt="searched-card" />
        </div>
    );

    return (
        <>

            <div className='searched--result feed--page'>
                <div className='seached-text'>
                    <h2>{title}</h2>
                </div>

               
                <div onClick={handleViewAll}>
                    <IconButton sx={{  fontSize: '10px', fontWeight: '600', filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
                        View All
                    </IconButton>
                </div>
               
            </div>
                
            {products && !products.length && <span>No Products</span>}
            {products && products.length > 0 && (
                <div className='search__card--container'>
                  
                    {products.map((product) => {
                        // console.log(product);
                        // console.log(product.variants[0].id);

                        return (
                                
                            <SearchCard key={product.id} product={product} />
                               
                        )
                    })
                    }
                    
                </div>
            )}
            

            <StoreViewALl openView={openView} closeViewAll={closeViewAll} title={title} subTitle={subTitle} name={name} price={price} product={product} products={products} />

        </>
    )
};

// store normal cards 
export const NormalStoreCards = ({ title,  price, name, subTitle, product }) => {
    return (
        <>
            <Card sx={{ minWidth: '100px', width: '100%', maxWidth: '100%', boxShadow: 'none', position: 'relative' }}>

                <CardActionArea className="h-[100px] w-full relative laptop:h-[320px] tablet:h-[280px]">
                    <Link to={`/product/${product.id}/show`}>
                        <CardMedia
                            className='object-cover h-full w-full rounded-[10px]'
                            component='img'
                            image={product.thumbnail}
                            alt='product'
                        />
                    </Link>
                </CardActionArea>
                <CardContent sx={{ paddingLeft: 0, paddingTop: '10px', paddingBottom: '10px' }} >
                    <Typography className="normalSearchCard--text tablet:text-[16px] laptop:text-[16px]" variant='h2' sx={{ fontSize: '12px', fontWeight: 600, paddingBottom: '5px' }}>
                        {name}
                    </Typography>
                    
                    <Typography className='font-[600] ' sx={{ fontWeight: 700, fontSize: '10px' }}>
                        {price}
                    </Typography>
                </CardContent>

                <CardHeader sx={{ padding: 0 }} className="normalcard--header"
                    avatar={
                        <Avatar className="tablet:h-[30px] tablet:w-[30px] laptop:h-[30px] laptop:w-[30px]" sx={{ height: '25px', width: '25px', overflow: 'hidden' }} aria-label="recipe">
                            <img className="object-cover w-full h-full" src={userIcon} alt="avatar" />
                        </Avatar>
                    }
        
                    title={
                        <Typography className="laptop:text-[14px] tablet:text-[13px]" sx={{ color: '#636363', fontSize: '8px', fontWeight: 600 }}>
                            {subTitle}
                        </Typography>
                    }
       
                />
            </Card>
        
        </>
    );
};