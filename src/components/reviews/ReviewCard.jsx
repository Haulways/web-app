import * as React from 'react'
import './review.css';
import { Avatar } from '@mui/material';
import userIcon from '../../assets/commentBg.png';

export const ReviewCard = ({ theme, review, index }) => {
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
            {review.rating === 0 ? (
                <>
                    <li>{starLightSmall}</li>
                    <li>{starLightSmall}</li>
                    <li>{starLightSmall}</li>
                    <li>{starLightSmall}</li>
                    <li>{starLightSmall}</li>
                </>
  
            ) : review.rating === 1 ? (
                <>
                    <li>{starYellow}</li>
                    <li>{starLightSmall}</li>
                    <li>{starLightSmall}</li>
                    <li>{starLightSmall}</li>
                    <li>{starLightSmall}</li>
                </>

            ) : review.rating === 2 ? (
                <>
                    <li>{starYellow}</li>
                    <li>{starYellow}</li>
                    <li>{starLightSmall}</li>
                    <li>{starLightSmall}</li>
                    <li>{starLightSmall}</li>
                </>
     
            ) : review.rating === 3 ? (
                <>
                    <li>{starYellow}</li>
                    <li>{starYellow}</li>
                    <li>{starYellow}</li>
                    <li>{starLightSmall}</li>
                    <li>{starLightSmall}</li>
                </>
         
            ) : review.rating === 4 ? (
                <>
                    <li>{starYellow}</li>
                    <li>{starYellow}</li>
                    <li>{starYellow}</li>
                    <li>{starYellow}</li>
                    <li>{starLightSmall}</li>
                </>
            
            ) : review.rating === 5 ? (
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

    const playButton = (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3.85716 8.99977C3.7435 8.99977 3.63449 8.95462 3.55411 8.87425C3.47374 8.79387 3.42859 8.68486 3.42859 8.5712V3.42834C3.42863 3.35532 3.44733 3.28351 3.48291 3.21974C3.51849 3.15598 3.56978 3.10236 3.6319 3.06397C3.69403 3.02559 3.76493 3.00372 3.83788 3.00043C3.91083 2.99715 3.98341 3.01256 4.04873 3.0452L9.19159 5.61663C9.26268 5.65226 9.32246 5.70697 9.36423 5.77463C9.40601 5.8423 9.42813 5.92025 9.42813 5.99977C9.42813 6.07929 9.40601 6.15725 9.36423 6.22491C9.32246 6.29258 9.26268 6.34728 9.19159 6.38291L4.04873 8.95434C3.98926 8.98413 3.92368 8.99968 3.85716 8.99977ZM4.28573 4.12177V7.87777L8.04173 5.99977L4.28573 4.12177Z" fill="white" />
            <path d="M6 0.857143C7.01716 0.857143 8.01148 1.15877 8.85722 1.72387C9.70296 2.28897 10.3621 3.09218 10.7514 4.03191C11.1406 4.97165 11.2425 6.0057 11.044 7.00332C10.8456 8.00094 10.3558 8.91731 9.63655 9.63655C8.91731 10.3558 8.00094 10.8456 7.00332 11.044C6.00571 11.2425 4.97165 11.1406 4.03192 10.7514C3.09218 10.3621 2.28898 9.70296 1.72387 8.85722C1.15877 8.01148 0.857145 7.01716 0.857145 6C0.857145 4.63603 1.39898 3.32792 2.36345 2.36345C3.32793 1.39898 4.63603 0.857143 6 0.857143ZM6 0C4.81331 0 3.65328 0.351894 2.66658 1.01118C1.67989 1.67047 0.910851 2.60754 0.456725 3.7039C0.0025997 4.80026 -0.11622 6.00665 0.115291 7.17054C0.346802 8.33443 0.918247 9.40352 1.75736 10.2426C2.59648 11.0818 3.66557 11.6532 4.82946 11.8847C5.99335 12.1162 7.19975 11.9974 8.2961 11.5433C9.39246 11.0891 10.3295 10.3201 10.9888 9.33342C11.6481 8.34672 12 7.18669 12 6C12 4.4087 11.3679 2.88258 10.2426 1.75736C9.11742 0.632141 7.5913 0 6 0Z" fill="white" />
        </svg>
    );

    const ReviewVideo = ({ media }) => (
        <li className='w-[36.795px] h-[36.795px] rounded-[5.256px] relative overflow-hidden'>
            <div className='absolute w-full h-full top-0 bottom-0 right-0 left-0 backdrop-blur-[1px] z-[40] mx-auto my-auto' style={{ background: 'rgba(0, 0, 0, 0.50)' }} />
            <video className='w-full h-full object-cover' src={media} autoPlay={false} controls={false} playsInline={true} nodownload='true' />
            <div className='absolute w-[12px] h-[12px] top-0 bottom-0 right-0 left-0 mx-auto my-auto z-[50]'>{playButton}</div>
        </li>
     );

    return (
        <div key={index} className='mt-[20px]'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-x-[10px] items-center'>
                    <Avatar sx={{ width: '35px', height: "35px" }}
                        src={review.from_photoURL}
                    />
                    <h2 className='text-[11px] laptop:text-[14px]'>{review.from_name}</h2>
                </div>
                <div style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="15" viewBox="0 0 4 15" fill="none">
                        <path d="M2 11C2.53043 11 3.03914 11.1844 3.41421 11.5126C3.78929 11.8408 4 12.2859 4 12.75C4 13.2141 3.78929 13.6592 3.41421 13.9874C3.03914 14.3156 2.53043 14.5 2 14.5C1.46957 14.5 0.96086 14.3156 0.585787 13.9874C0.210714 13.6592 0 13.2141 0 12.75C0 12.2859 0.210714 11.8408 0.585787 11.5126C0.96086 11.1844 1.46957 11 2 11ZM2 5.75C2.53043 5.75 3.03914 5.93437 3.41421 6.26256C3.78929 6.59075 4 7.03587 4 7.5C4 7.96413 3.78929 8.40925 3.41421 8.73744C3.03914 9.06563 2.53043 9.25 2 9.25C1.46957 9.25 0.96086 9.06563 0.585787 8.73744C0.210714 8.40925 0 7.96413 0 7.5C0 7.03587 0.210714 6.59075 0.585787 6.26256C0.96086 5.93437 1.46957 5.75 2 5.75ZM2 0.5C2.53043 0.5 3.03914 0.684374 3.41421 1.01256C3.78929 1.34075 4 1.78587 4 2.25C4 2.71413 3.78929 3.15925 3.41421 3.48744C3.03914 3.81563 2.53043 4 2 4C1.46957 4 0.96086 3.81563 0.585787 3.48744C0.210714 3.15925 0 2.71413 0 2.25C0 1.78587 0.210714 1.34075 0.585787 1.01256C0.96086 0.684374 1.46957 0.5 2 0.5Z" fill="black" />
                    </svg>
                </div>
            </div>

            <div className='flex gap-x-[15px] items-center mt-[10px]'>
                <ul className='flex items-center'>
                   {stars}
                </ul>
                <p className='text-[8px] laptop:text-[12px]'>{(new Date(review?.created_at)).toLocaleDateString()}</p>
            </div>

            <p className='text-[10px] mt-[5px] laptop:text-[14px]'>{review.review_text}</p>

            <div className='mt-[15px]'>
                {review.review_media && review.review_media.length > 0 && review.review_media.map((media, index) => (
                <ul key={index} className='flex gap-x-[10px] items-center'>
                     <ReviewVideo media={media} />
                </ul>
                ))}
                <div className='mt-[15px] flex justify-between'>
                    <p className='text-[10px] laptop:text-[14px]'>Was this review helpful ?</p>
                    <ul className='flex items-center gap-x-[13px] text-[8px] laptop:text-[12px]'>
                        <li>Yes</li>
                        <li>No</li>
                    </ul>
                </div>
            </div>
            
        </div>
    );
};

