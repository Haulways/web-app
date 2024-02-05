import * as React from 'react'
import './review.css';
import { ThemeContext } from '../context/ThemeProvider';
import { Dialog } from '@mui/material';
import { ReviewCard } from './ReviewCard';

export const FullReviews = ({ openAllReview, handleCloseAllReview, mediaUrl, productReviews, averageRating, url }) => {
    const { theme } = React.useContext(ThemeContext);
    const [selectedTab, setSelectedTab] = React.useState("All");

    const closeIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M0.251763 0.251763C0.331366 0.171957 0.425932 0.10864 0.530044 0.0654386C0.634156 0.0222369 0.745768 0 0.858488 0C0.971207 0 1.08282 0.0222369 1.18693 0.0654386C1.29104 0.10864 1.38561 0.171957 1.46521 0.251763L6.00022 4.78849L10.5352 0.251763C10.6149 0.172086 10.7095 0.108884 10.8136 0.065763C10.9177 0.0226426 11.0293 0.000448674 11.142 0.000448674C11.2546 0.000448674 11.3662 0.0226426 11.4703 0.065763C11.5744 0.108884 11.669 0.172086 11.7487 0.251763C11.8284 0.331439 11.8916 0.426028 11.9347 0.53013C11.9778 0.634232 12 0.745808 12 0.858488C12 0.971167 11.9778 1.08274 11.9347 1.18685C11.8916 1.29095 11.8284 1.38554 11.7487 1.46521L7.21196 6.00022L11.7487 10.5352C11.8284 10.6149 11.8916 10.7095 11.9347 10.8136C11.9778 10.9177 12 11.0293 12 11.142C12 11.2546 11.9778 11.3662 11.9347 11.4703C11.8916 11.5744 11.8284 11.669 11.7487 11.7487C11.669 11.8284 11.5744 11.8916 11.4703 11.9347C11.3662 11.9778 11.2546 12 11.142 12C11.0293 12 10.9177 11.9778 10.8136 11.9347C10.7095 11.8916 10.6149 11.8284 10.5352 11.7487L6.00022 7.21196L1.46521 11.7487C1.38554 11.8284 1.29095 11.8916 1.18685 11.9347C1.08274 11.9778 0.971167 12 0.858488 12C0.745808 12 0.634232 11.9778 0.53013 11.9347C0.426028 11.8916 0.331439 11.8284 0.251763 11.7487C0.172086 11.669 0.108884 11.5744 0.065763 11.4703C0.0226426 11.3662 0.000448674 11.2546 0.000448674 11.142C0.000448674 11.0293 0.0226426 10.9177 0.065763 10.8136C0.108884 10.7095 0.172086 10.6149 0.251763 10.5352L4.78849 6.00022L0.251763 1.46521C0.171957 1.38561 0.10864 1.29104 0.0654386 1.18693C0.0222369 1.08282 0 0.971207 0 0.858488C0 0.745768 0.0222369 0.634156 0.0654386 0.530044C0.10864 0.425932 0.171957 0.331366 0.251763 0.251763Z" fill="black" />
        </svg>
    );
    const starYellow = (
        <svg width="12.639" height="12.639" viewBox="0 0 34 31" fill="#FF8C31" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.1074 4.76135L17.3964 2.64304L16.6854 4.76135L14.0739 12.5418H5.60672H3.23662L5.17527 13.9053L12.0041 18.7081L9.39897 26.4695L8.67152 28.6368L10.5414 27.3217L17.3964 22.5005L24.2514 27.3217L26.1213 28.6368L25.3939 26.4695L22.7887 18.7081L29.6176 13.9053L31.5562 12.5418H29.1861H20.719L18.1074 4.76135Z" stroke="#D9D9D9" />
        </svg>
    );
    const starLight = (
        <svg width="12.639" height="12.639" viewBox="0 0 34 31" fill="#7A7A7A" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.1074 4.76135L17.3964 2.64304L16.6854 4.76135L14.0739 12.5418H5.60672H3.23662L5.17527 13.9053L12.0041 18.7081L9.39897 26.4695L8.67152 28.6368L10.5414 27.3217L17.3964 22.5005L24.2514 27.3217L26.1213 28.6368L25.3939 26.4695L22.7887 18.7081L29.6176 13.9053L31.5562 12.5418H29.1861H20.719L18.1074 4.76135Z" stroke="#D9D9D9" />
        </svg>
    );
    const filterIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="11" viewBox="0 0 15 11" fill="none">
            <path d="M0 10.5V8.83333H5V10.5H0ZM0 6.33333V4.66667H10V6.33333H0ZM0 2.16667V0.5H15V2.16667H0Z" fill="black" />
        </svg>
    );

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };
       

    return (
        <Dialog
            open={openAllReview}
            fullScreen
            onClose={handleCloseAllReview}
            PaperProps={{ style: { backgroundColor: theme === "light" ? "#fff" : "#222", color: theme === "light" ? "#222" : "#fff", } }}
        // className='store__card'
        >
            <div className='absolute top-[2rem] left-[1rem] w-[12px] h-[12px]' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} onClick={handleCloseAllReview}>
                {closeIcon}
            </div>

            <div className='flex items-center justify-end gap-x-[20px] mt-[18px] px-[16px]'>
                {url === 'product_review' && (
                    <div className="flex items-center gap-x-[20px]">
                        <div className='w-[40px] h-[40px] rounded-[8px] overflow-hidden'>
                            <img className='w-[40px] h-[40px]' src={mediaUrl?.thumbnail} alt='product' />
                        </div>
                        <div>
                            <h2 className='inline-block text-[14px] font-[500] capitalize'>{mediaUrl?.handle}:</h2> <span className='text-[14px] text-[#7A7A7A]'>Avenue store</span>
                            <p className='text-[10px]'>Ratings and reviews</p>
                        </div>
                    </div>
                )}
                <div className='text-[12px] flex items-center'>{averageRating} {starYellow}</div>
            </div>

            {/* rating tabs */}
            <div className='w-full mt-[30px] store__card px-[16px]'>
                <div className='flex items-center overflow-x-scroll gap-x-[6px] store__card pb-[2px]'>
                    <div className={`reviewTabs ${selectedTab === "All" ? "activeTab" : ""}`} onClick={() => handleTabClick("All")}>All</div>
                    <div className={`reviewTabs ${selectedTab === "Positive" ? "activeTab" : ""}`} onClick={() => handleTabClick("Positive")}>Positive</div>
                    <div className={`reviewTabs ${selectedTab === "Critical" ? "activeTab" : ""}`} onClick={() => handleTabClick("Critical")}>Critical</div>
                    <div className={`reviewTabs ${selectedTab === "5" ? "activeTab" : ""}`} onClick={() => handleTabClick("5")}>5 {starLight}</div>
                    <div className={`reviewTabs ${selectedTab === "4" ? "activeTab" : ""}`} onClick={() => handleTabClick("4")}>4{starLight}</div>
                    <div className={`reviewTabs ${selectedTab === "3" ? "activeTab" : ""}`} onClick={() => handleTabClick("3")}>3{starLight}</div>
                    <div className={`reviewTabs ${selectedTab === "2" ? "activeTab" : ""}`} onClick={() => handleTabClick("2")}>2{starLight}</div>
                    <div className={`reviewTabs ${selectedTab === "1" ? "activeTab" : ""}`} onClick={() => handleTabClick("1")}>1{starLight}</div>
                </div>
            </div>


            <div className='mt-[30px] px-[16px] pb-[30px]'>
                <div className='flex justify-between items-center'>
                    <p className='flex  items-center'>{selectedTab}{selectedTab === "All" || selectedTab === "Positive" || selectedTab === "Critical" ? null : starLight}</p>
                    {filterIcon}
                </div>
                {productReviews && productReviews.map((review, index) => {
                    if (selectedTab === "All" ||
                        (selectedTab === "Positive" && review.rating >= 3) ||
                        (selectedTab === "Critical" && review.rating === 0) ||
                        review.rating.toString() === selectedTab) {
                        return <ReviewCard review={review} index={index} theme={theme} />;
                    }
                })}


            </div>

        </Dialog>
    );
};

 