import React from 'react'

export const Rating = ({ rating, onRatingChange }) => {
    const starLight = (
        <svg width="34" height="31" viewBox="0 0 34 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.1074 4.76135L17.3964 2.64304L16.6854 4.76135L14.0739 12.5418H5.60672H3.23662L5.17527 13.9053L12.0041 18.7081L9.39897 26.4695L8.67152 28.6368L10.5414 27.3217L17.3964 22.5005L24.2514 27.3217L26.1213 28.6368L25.3939 26.4695L22.7887 18.7081L29.6176 13.9053L31.5562 12.5418H29.1861H20.719L18.1074 4.76135Z" stroke="#D9D9D9" />
        </svg>
    );
    const starYellow = (
        <svg width="34" height="31" viewBox="0 0 34 31" fill="#FF8C31" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.1074 4.76135L17.3964 2.64304L16.6854 4.76135L14.0739 12.5418H5.60672H3.23662L5.17527 13.9053L12.0041 18.7081L9.39897 26.4695L8.67152 28.6368L10.5414 27.3217L17.3964 22.5005L24.2514 27.3217L26.1213 28.6368L25.3939 26.4695L22.7887 18.7081L29.6176 13.9053L31.5562 12.5418H29.1861H20.719L18.1074 4.76135Z" stroke="#D9D9D9" />
        </svg>
    );
    return (
        <div className='flex my-[30px] justify-between'>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label key={i}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => onRatingChange(ratingValue)}
                            className='hidden'
                        />
                        {ratingValue <= rating ? starYellow : starLight}
                    </label>
                );
            })}
        </div>
    );
};

