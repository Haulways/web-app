import * as React from 'react'
import './review.css';
import fwdIcon from '../../assets/socials/4wdIcon.png';
import infoIcon from '../../assets/socials/info.png';
import { ReviewCard } from './ReviewCard';
import { FullReviews } from './FullReviews';
import { CreateReview } from './CreateReview';

export const ShortReviews = ({ activeIndex, index, theme, mediaUrl, data, url }) => {
    const [openAllReview, setOpenAllReview] = React.useState(false);
    const [createReview, setCreateReview] = React.useState(false);


    const productReviews = data && data.filter((review) => review.product_id === mediaUrl?.id);
    const productRatings = productReviews.map(review => review.rating);
    const productRating = { id: 1, ratings: productRatings };

    const totalRatings = productRatings.length;
    const percentageOfFiveStars = totalRatings > 0 ? ((productRatings.filter(rating => rating === 5).length / totalRatings) * 100) : 0;
    const percentageOfFourStars = totalRatings > 0 ? ((productRatings.filter(rating => rating === 4).length / totalRatings) * 100) : 0;
    const percentageOfThreeStars = totalRatings > 0 ? ((productRatings.filter(rating => rating === 3).length / totalRatings) * 100) : 0;
    const percentageOfTwoStars = totalRatings > 0 ? ((productRatings.filter(rating => rating === 2).length / totalRatings) * 100) : 0;
    const percentageOfOneStars = totalRatings > 0 ? ((productRatings.filter(rating => rating === 1).length / totalRatings) * 100) : 0;




    const averageRating = productRatings.length > 0 ? (productRatings.reduce((a, b) => a + b, 0) / productRatings.length) : 0;
    // console.log(averageRating);

    // console.log(productReviews, productRatings, productRating)
    
    const handleOpenLAllReview = () => {
        setOpenAllReview(true);
  
    };
    
    const handleCloseAllReview = () => {
        setOpenAllReview(false);
    };
    
    const handleOpenCreateReview = () => {
        setCreateReview(true);
  
    };
    
    const handleCloseCreateReview = () => {
        setCreateReview(false);
    };

    const starLight = (
        <svg width="34" height="31" viewBox="0 0 34 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.1074 4.76135L17.3964 2.64304L16.6854 4.76135L14.0739 12.5418H5.60672H3.23662L5.17527 13.9053L12.0041 18.7081L9.39897 26.4695L8.67152 28.6368L10.5414 27.3217L17.3964 22.5005L24.2514 27.3217L26.1213 28.6368L25.3939 26.4695L22.7887 18.7081L29.6176 13.9053L31.5562 12.5418H29.1861H20.719L18.1074 4.76135Z" stroke="#D9D9D9" />
        </svg>
    );

    const starLightSmall = (
        <svg width="12.639" height="12.639" viewBox="0 0 34 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.1074 4.76135L17.3964 2.64304L16.6854 4.76135L14.0739 12.5418H5.60672H3.23662L5.17527 13.9053L12.0041 18.7081L9.39897 26.4695L8.67152 28.6368L10.5414 27.3217L17.3964 22.5005L24.2514 27.3217L26.1213 28.6368L25.3939 26.4695L22.7887 18.7081L29.6176 13.9053L31.5562 12.5418H29.1861H20.719L18.1074 4.76135Z" stroke="#D9D9D9" />
        </svg>
    );

    const starYellow = (
        <svg width="12.639" height="12.639" viewBox="0 0 34 31" fill="#FF8C31" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.1074 4.76135L17.3964 2.64304L16.6854 4.76135L14.0739 12.5418H5.60672H3.23662L5.17527 13.9053L12.0041 18.7081L9.39897 26.4695L8.67152 28.6368L10.5414 27.3217L17.3964 22.5005L24.2514 27.3217L26.1213 28.6368L25.3939 26.4695L22.7887 18.7081L29.6176 13.9053L31.5562 12.5418H29.1861H20.719L18.1074 4.76135Z" stroke="#D9D9D9" />
        </svg>
    );

    const starHalf = (
        <svg width="12.639" height="12.639" viewBox="0 0 34 31" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="half-fill" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="50%" style={{ stopColor: "#FF8C31", stopOpacity: "1" }} />
                    <stop offset="50%" style={{ stopColor: "#FF8C31", stopOpacity: "0" }} />
                </linearGradient>
            </defs>
            <path fill="url(#half-fill)" d="M18.1074 4.76135L17.3964 2.64304L16.6854 4.76135L14.0739 12.5418H5.60672H3.23662L5.17527 13.9053L12.0041 18.7081L9.39897 26.4695L8.67152 28.6368L10.5414 27.3217L17.3964 22.5005L24.2514 27.3217L26.1213 28.6368L25.3939 26.4695L22.7887 18.7081L29.6176 13.9053L31.5562 12.5418H29.1861H20.719L18.1074 4.76135Z" stroke="#D9D9D9" />
        </svg>

    );

    const stars = (
        <>
            {averageRating === 0 ? (
                <>
                    <li>{starLightSmall}</li>
                    <li>{starLightSmall}</li>
                    <li>{starLightSmall}</li>
                    <li>{starLightSmall}</li>
                    <li>{starLightSmall}</li>
                </>
            ) : averageRating === 0.5 ? (
                <>
                    <li>{starHalf}</li>
                    <li>{starLightSmall}</li>
                    <li>{starLightSmall}</li>
                    <li>{starLightSmall}</li>
                    <li>{starLightSmall}</li>
                </>
            ) : averageRating === 1 ? (
                <>
                    <li>{starYellow}</li>
                    <li>{starLightSmall}</li>
                    <li>{starLightSmall}</li>
                    <li>{starLightSmall}</li>
                    <li>{starLightSmall}</li>
                </>
            ) : averageRating === 1.5 ? (
                <>
                    <li>{starYellow}</li>
                    <li>{starHalf}</li>
                    <li>{starLightSmall}</li>
                    <li>{starLightSmall}</li>
                    <li>{starLightSmall}</li>
                </>
            ) : averageRating === 2 ? (
                <>
                    <li>{starYellow}</li>
                    <li>{starYellow}</li>
                    <li>{starLightSmall}</li>
                    <li>{starLightSmall}</li>
                    <li>{starLightSmall}</li>
                </>
            ) : averageRating === 2.5 ? (
                <>
                    <li>{starYellow}</li>
                    <li>{starYellow}</li>
                    <li>{starHalf}</li>
                    <li>{starLightSmall}</li>
                    <li>{starLightSmall}</li>
                </>
            ) : averageRating === 3 ? (
                <>
                    <li>{starYellow}</li>
                    <li>{starYellow}</li>
                    <li>{starYellow}</li>
                    <li>{starLightSmall}</li>
                    <li>{starLightSmall}</li>
                </>
            ) : averageRating === 3.5 ? (
                <>
                    <li>{starYellow}</li>
                    <li>{starYellow}</li>
                    <li>{starYellow}</li>
                    <li>{starHalf}</li>
                    <li>{starLightSmall}</li>
                </>
            ) : averageRating === 4 ? (
                <>
                    <li>{starYellow}</li>
                    <li>{starYellow}</li>
                    <li>{starYellow}</li>
                    <li>{starYellow}</li>
                    <li>{starLightSmall}</li>
                </>
            ) : averageRating === 4.5 ? (
                <>
                    <li>{starYellow}</li>
                    <li>{starYellow}</li>
                    <li>{starYellow}</li>
                    <li>{starYellow}</li>
                    <li>{starHalf}</li>
                </>
            ) : averageRating === 5 ? (
                <>
                    <li>{starYellow}</li>
                    <li>{starYellow}</li>
                    <li>{starYellow}</li>
                    <li>{starYellow}</li>
                    <li>{starYellow}</li>
                </>
            ) : null}

        </>
    );
      

    const progress5 = percentageOfFiveStars
    const progress4 = percentageOfFourStars
    const progress3 = percentageOfThreeStars
    const progress2 = percentageOfTwoStars
    const progress1 = percentageOfOneStars
    
    return (
        <div className='py-[2rem] feed--page w-[100%]' style={{ display: activeIndex === index ? "block" : 'none' }}>
            <div>
                <div>
                    <h2 className='text-[14px] font-[500] pb-[5px] laptop:text-[17px]'>{url === 'product_review' ? 'Rate this product' : 'Rate this video'}</h2>
                    <p className="text-[12px] font-[400] laptop:text-[15px]">Tell others what you think</p>

                    {/* Stars rating */}
                    <div>
                        <ul className='flex my-[20px] justify-between'>
                            <li>
                                {starLight}
                            </li>
                            <li>
                                {starLight}
                            </li>
                            <li>
                                {starLight}
                            </li>
                            <li>
                                {starLight}
                            </li>
                            <li>
                                {starLight}
                            </li>
                        </ul>
                    </div>
                    {/* write a review */}
                    <p className="text-[12px] font-[500] laptop:text-[15px]" onClick={handleOpenCreateReview}>Write a review</p>
                    
                    <div className='my-[20px] flex justify-between'>
                        <h2 className='text-[14px] font-[500]'>Ratings and reviews</h2>
                        <img onClick={handleOpenLAllReview} src={fwdIcon} alt='' className='w-[18px] h-[16px]' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                    </div>
                    <p className="text-[12px] font-[400] mb-[11px] laptop:text-[15px]">{url === 'product_review' ? 'Rating and reviews are verified and are from people who have used the same product' : 'Rating and reviews are verified and are from people who have watched the same video'} <img className='inline-block' src={infoIcon} alt='' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} /> </p>

                    {/* Overall rating  */}
                    <div className='flex items-center gap-x-[30px] '>
                        <div className='flex flex-col justify-between items-center'>
                            <h3 className='text-[65.722px] font-[400] leading-none laptop:text-[70px]'>{averageRating}</h3>
                            <ul className='flex'>
                                {stars}
                            </ul>
                        </div>

                        <div className='flex flex-col gap-y-[2px] w-full'>
                            <ul className='lineRate'>
                                <li>5</li>
                                <div style={{ height: '6px', width: '100%', backgroundColor: theme === "light" ? '#DDDDDD' : '#0D0D0D', borderRadius: '5px' }}>
                                    <div style={{ height: '100%', width: `${progress5}%`, backgroundColor: theme === "light" ? '#0D0D0D' : '#DDDDDD', borderRadius: '5px' }} />
                                </div>
                            </ul>

                            <ul className='lineRate'>
                                <li>4</li>
                                <div style={{ height: '6px', width: '100%', backgroundColor: theme === "light" ? '#DDDDDD' : '#0D0D0D', borderRadius: '5px' }}>
                                    <div style={{ height: '100%', width: `${progress4}%`, backgroundColor: theme === "light" ? '#0D0D0D' : '#DDDDDD', borderRadius: '5px' }} />
                                </div>
                            </ul>

                            <ul className='lineRate'>
                                <li>3</li>
                                <div style={{ height: '6px', width: '100%', backgroundColor: theme === "light" ? '#DDDDDD' : '#0D0D0D', borderRadius: '5px' }}>
                                    <div style={{ height: '100%', width: `${progress3}%`, backgroundColor: theme === "light" ? '#0D0D0D' : '#DDDDDD', borderRadius: '5px' }} />
                                </div>
                            </ul>

                            <ul className='lineRate'>
                                <li>2</li>
                                <div style={{ height: '6px', width: '100%', backgroundColor: theme === "light" ? '#DDDDDD' : '#0D0D0D', borderRadius: '5px' }}>
                                    <div style={{ height: '100%', width: `${progress2}%`, backgroundColor: theme === "light" ? '#0D0D0D' : '#DDDDDD', borderRadius: '5px' }} />
                                </div>
                            </ul>

                            <ul className='lineRate'>
                                <li>1</li>
                                <div style={{ height: '6px', width: '100%', backgroundColor: theme === "light" ? '#DDDDDD' : '#0D0D0D', borderRadius: '5px' }}>
                                    <div style={{ height: '100%', width: `${progress1}%`, backgroundColor: theme === "light" ? '#0D0D0D' : '#DDDDDD', borderRadius: '5px' }} />
                                </div>
                            </ul>
                        </div>
                    </div>

                </div>
                {productReviews && productReviews.slice(0, 3).map((review, index1) => (
                    <ReviewCard review={review} index={index1} theme={theme}  />
                ))}


            </div>
            
            <FullReviews url={url} openAllReview={openAllReview} handleCloseAllReview={handleCloseAllReview} mediaUrl={mediaUrl} productReviews={productReviews} averageRating={averageRating} />
            <CreateReview url={url} handleCloseCreateReview={handleCloseCreateReview} createReview={createReview} mediaUrl={mediaUrl} />
        </div>
    );
};

 