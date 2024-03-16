import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './stat.css';
import { Doughnut } from 'react-chartjs-2';
import { Card } from '@mui/material';
import viewsIcon from '../../assets/stat/views.png';
import partnerIcon from '../../assets/stat/partner.png';
import engageIcon from '../../assets/stat/engage.png';
import contentIcon from '../../assets/stat/content.png';
import earnedIcon from '../../assets/stat/earned.png';
import { InfiniteList, ListBase, WithListContext } from 'react-admin';
import { ThemeContext } from '../context/ThemeProvider';
import { useContext } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);


const data = {
    labels: ['Accounts reached', 'Accounts engaged', 'Total Followers', 'Content Shared'],
    datasets: [
        {
            data: [90, 60, 60, 40],
            backgroundColor: ['#FF2C91', '#FFD52C', '#1748C5', '#37C8AE'],
            hoverBackgroundColor: ['#FF2C91', '#FFD52C', '#1748C5', '#37C8AE'],
            borderWidth: 0, // Add this line
            // borderColor: '#fff',
            // borderRadius: 5, // Add this line
            // borderSkipped: false // And this line
        }
    ]
};
  
const prevStats = [
    { label: 'Accounts reached', value: 28 },
    { label: 'Accounts engaged', value: 70 },
    { label: 'Total Followers', value: 70 },
    { label: 'Content Shared', value: 40 }
];
  
const stats = [
    { label: 'Accounts reached', value: 50, change: '0.0%', color: '#FF2C91' },
    { label: 'Accounts engaged', value: 60, change: '0.0%', color: '#FFD52C' },
    { label: 'Total Followers', value: 70, change: '0.0%', color: '#1748C5' },
    { label: 'Content Shared', value: 40, change: '', color: '#37C8AE' }
];

  function formatCount(count) {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K+';
    } else {
      return count;
    }
};

 const UserStat = ({theme}) => {
    return (
        <>
            <Card className='feed--page'
                sx={{ width: '100%', margin: '0 auto', boxShadow: 'none !important', padding: '0px 0px 16px', borderRadius: '10px' }}
            >
                <div className='flex justify-between items-center mb-[10px] pt-[.5rem]'>
                    <h1 className='  text-[12px] font-[600] '>Insights</h1>
                    <h3 className=' text-[10px] font-[500] text-[#828282]'>Jan 22 - Feb 23</h3>

                </div>



                <div className='flex items-center justify-center gap-x-[10px]'>
                    <div className="Doughnut">
                        <Doughnut data={data} options={{ plugins: { legend: { display: false } }, cutout: '60%' }} />
                    </div>
                    
                    <div className='flex flex-wrap w-full gap-x-[15px] gap-y-[20px] items-center'>
                        {stats.map((stat, index) => {
                            const prevStat = prevStats.find(s => s.label === stat.label);
                            let change;
                            if (prevStat) {
                                const currentValue = (stat.value);
                                const prevValue = (prevStat.value);
                                change = ((currentValue - prevValue) / prevValue * 100).toFixed(1);
                                if (change > 0) {
                                    change = `+${change}%`;
                                } else {
                                    change = `${change}%`;
                                }
                            }
                            if (prevStat && stat.change === '') {
                                // If change is an empty string, set it to null
                                change = null;
                            }

                            let changeColor = 'inherit'; // Default color

                            if (change !== null) {
                                if (change.includes('+')) {
                                    changeColor = '#1B8F74'; // Change is positive
                                } else if (change.includes('-')) {
                                    changeColor = '#FF2C91'; // Change is negative
                                }
                            }
  
                            return (
                                <div key={index} className='flex-[30%]'>
                                    <p className="stat-value">{formatCount(stat.value)}</p>
                                    {change !== null && (
                                        <p className="stat-change" style={{ color: changeColor }}>
                                            {change}
                                        </p>
                                    )}
                                    <div className='flex gap-x-[5px]'>
                                        <div className="dot" style={{ backgroundColor: stat.color }}></div>
                                        <p className="stat-label">{stat.label}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Card>
        </>
    );
};

export const InfluencerStat = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <div className='feed--page'>
                <UserStat />
                <div className=' flex overflow-x-scroll store__card  gap-x-6 pt-[1rem] pb-[5px] px-[.5rem] w-[90vw]'>

                    <TotalViews />
                    <Partnership  />
                    <TotalEarned  />
                    <TotalContent  />
                    <TotalEngagement  />
                </div>

                {/* Trending Post */}
                <div className=''>
                    <h2 className='text-[12px] font-[600]  mt-[20px] laptop:text-[18px]'>Trending Post</h2>

                    <ListBase title=' ' resource='posts'>
                        <InfiniteList title=' ' exporter={false} actions={false}
                            sx={{
                                '& .MuiPaper-root': {
                                    backgroundColor: theme === "light" ? "#fff !important" : "#222 !important",
                                    color: theme === "light" ? "#222 !important" : "#fff !important",
                                   
                                },
                            }}
                        >
                            <WithListContext render={({ isLoading, data }) => (
                                !isLoading ? (
                                    <>
                                        <div className='pb-[1.5rem] mt-[1rem] flex overflow-x-scroll store__card gap-x-[15px] items-center max-w-[340px] laptop:max-w-lg' >

                                            {data && data.map((post) => {
                                                const mediaUrl = post.media[0]; // Get the URL of the single media file
                                                const isImage = mediaUrl.includes('.jpg') || mediaUrl.includes('.jpeg') || mediaUrl.includes('.png');
                                                return (
                                                    <div key={post.id} className="w-[80px] h-[80px] flex-shrink-0 rounded-full overflow-hidden laptop:w-[100px] laptop:h-[100px]">
                                                        {isImage ? (
        
                                                            <img src={mediaUrl} alt='user-post' className="object-cover w-full h-full" />
                                                        ) : (
                                                            <video
                                                                src={mediaUrl}
                                                                playsInline={true}
                                                                className="object-cover h-full w-full"
                                                                muted={true}
                                                                controls={false}
                                                                controlsList={undefined}
                                                                {...(post.posterUrl ? { poster: post.posterUrl } : {})}
                                                            />
                                                        )}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </>
                                ) : (
                                    <p className='font-[500]  flex items-center justify-center mt-[1rem]'>Loading...</p>
                                )
                            )} />
                        </InfiniteList>
                    </ListBase>
                </div>
            </div>
        </>
    );
};

// Total views
const TotalViews = () => {
    const progress = 75
    return (
        <div className='totalViews--container' >
            <div className='views--top'>
                <div>
                    <h2>5678</h2>
                    <p>Total Views</p>
                </div>
                <div>
                    <img src={viewsIcon} alt='views' />
                </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', marginBottom: '5px' }}>
                <p>0%</p>
                <p>{progress}%</p>
            </div>
            <div style={{ height: '7px', width: '100%', backgroundColor: '#DDDDDD', borderRadius: '3px' }}>
                <div style={{ height: '100%', width: `${progress}%`, backgroundColor: '#fff', borderRadius: '3px 0 0 3px' }} />
            </div>
        </div>
    )
};

// Partnership
const Partnership = () => {
    const { theme } = useContext(ThemeContext);

    const progress = 40
    return (
        <div className='partners--container' style={{backgroundColor: theme === "light" ? "#fff " : "", boxShadow: theme === 'light' ? "0px 2px 2px 0px rgba(0, 0, 0, 0.1), 2px 0px 2px 0px rgba(0, 0, 0, 0.019) " : "0px 1px 1px 1px rgba(255, 255, 255, 0.2)"}} >
            <div className='partner--top'>
                <div>
                    <h2>8/20</h2>
                    <p>Partnership</p>
                </div>
                <div>
                    <img src={partnerIcon} alt='partner' />
                </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', marginBottom: '5px' }}>
                <p>0%</p>
                <p>{progress}%</p>
            </div>
            <div style={{ height: '7px', width: '100%', backgroundColor: '#DDDDDD', borderRadius: '3px' }}>
                <div style={{ height: '100%', width: `${progress}%`, backgroundColor: '#FFD52C', borderRadius: '3px 0 0 3px' }} />
            </div>
        </div>
    )
};

// Total earned
const TotalEarned = () => {
    const { theme } = useContext(ThemeContext);

    const progress = 40
    return (
        <div className='partners--container' style={{backgroundColor: theme === "light" ? "#fff " : "", boxShadow: theme === 'light' ? "0px 2px 2px 0px rgba(0, 0, 0, 0.1), 2px 0px 2px 0px rgba(0, 0, 0, 0.019) " : "0px 1px 1px 1px rgba(255, 255, 255, 0.2)"}}>
            <div className='partner--top'>
                <div>
                    <h2>$150</h2>
                    <p>Total Earned</p>
                </div>
                <div>
                    <img src={earnedIcon} alt='earned' />
                </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', marginBottom: '5px' }}>
                <p>0%</p>
                <p>{progress}%</p>
            </div>
            <div style={{ height: '7px', width: '100%', backgroundColor: '#DDDDDD', borderRadius: '3px' }}>
                <div style={{ height: '100%', width: `${progress}%`, backgroundColor: '#37C8AE', borderRadius: '3px 0 0 3px' }} />
            </div>
        </div>
    )
};

// Total content 
const TotalContent = () => {
    const { theme } = useContext(ThemeContext);

    const progress = 90
    return (
        <div className='partners--container' style={{backgroundColor: theme === "light" ? "#fff " : "", boxShadow: theme === 'light' ? "0px 2px 2px 0px rgba(0, 0, 0, 0.1), 2px 0px 2px 0px rgba(0, 0, 0, 0.019) " : "0px 1px 1px 1px rgba(255, 255, 255, 0.2)"}}>
            <div className='partner--top'>
                <div>
                    <h2>1052</h2>
                    <p>Total Content</p>
                </div>
                <div>
                    <img src={contentIcon} alt='content' />
                </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', marginBottom: '5px' }}>
                <p>0%</p>
                <p>{progress}%</p>
            </div>
            <div style={{ height: '7px', width: '100%', backgroundColor: '#DDDDDD', borderRadius: '3px' }}>
                <div style={{ height: '100%', width: `${progress}%`, backgroundColor: '#FF2C91', borderRadius: '3px 0 0 3px' }} />
            </div>
        </div>
    )
};

// Total Engagement
const TotalEngagement = () => {
    const { theme } = useContext(ThemeContext);

    const progress = 70
    return (
        <div className='partners--container' style={{backgroundColor: theme === "light" ? "#fff " : "", boxShadow: theme === 'light' ? "0px 2px 2px 0px rgba(0, 0, 0, 0.1), 2px 0px 2px 0px rgba(0, 0, 0, 0.019) " : "0px 1px 1px 1px rgba(255, 255, 255, 0.2)"}}>
            <div className='partner--top'>
                <div>
                    <h2>50,000</h2>
                    <p>Total Engagement</p>
                </div>
                <div>
                    <img src={engageIcon} alt='engage' />
                </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', marginBottom: '5px' }}>
                <p>0%</p>
                <p>{progress}%</p>
            </div>
            <div style={{ height: '7px', width: '100%', backgroundColor: '#DDDDDD', borderRadius: '3px' }}>
                <div style={{ height: '100%', width: `${progress}%`, backgroundColor: '#1748C5', borderRadius: '3px 0 0 3px' }} />
            </div>
        </div>
    )
};






  