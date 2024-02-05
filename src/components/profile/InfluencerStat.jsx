import React, { useContext, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './stat.css';
import { Doughnut } from 'react-chartjs-2';
import { Card, Grid } from '@mui/material';
import CartG from '../../assets/stat/cartG.png';
import CartR from '../../assets/stat/cartR.png';
import CartP from '../../assets/stat/cartP.png';
import CartW from '../../assets/stat/cartW.png';
import dotG from '../../assets/stat/dotG.png';
import dotP from '../../assets/stat/dotP.png';
import dotR from '../../assets/stat/dotR.png';
import dotW from '../../assets/stat/dotW.png';
import lineG from '../../assets/stat/lineG.png';
import lineP from '../../assets/stat/lineP.png';
import lineR from '../../assets/stat/lineR.png';
import lineW from '../../assets/stat/lineW.png';
import { InfiniteList, ListBase, WithListContext } from 'react-admin';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeProvider';

ChartJS.register(ArcElement, Tooltip, Legend);



const getData = (theme) => ({
    labels: ['Total orders', 'Delivered orders', 'Pending orders', 'Percentage increase'],
    datasets: [
        {
            data: [90, 60, 60, 40],
            backgroundColor: ['#FF2C91', '#FFD52C', '#1748C5', '#37C8AE'],
            hoverBackgroundColor: ['#FF2C91', '#FFD52C', '#1748C5', '#37C8AE'],
            borderWidth: 0,
        }
    ]
});
  
const prevStats = [
    { label: 'Total orders', value: 28 },
    { label: 'Delivered orders', value: 70 },
    { label: 'Pending orders', value: 70 },
    { label: 'Percentage increase', value: 40 }
];
  
const stats = [
    { label: 'Total orders', value: 20, change: '0.0%', color: '#FF2C91' },
    { label: 'Delivered orders', value: 60, change: '0.0%', color: '#FFD52C' },
    { label: 'Pending orders', value: 70, change: '0.0%', color: '#1748C5' },
    { label: 'Percentage increase', value: 60, change: '0.0%', color: '#37C8AE' }
];

  function formatCount(count) {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K+';
    } else {
      return count;
    }
};

const UserStat = (theme) => {
    const data = getData(theme);
    const totalValue = data.datasets[0].data.reduce((a, b) => a + b, 0);
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
                    <div className="Doughnut relative">
                        <Doughnut data={data} theme={theme} options={{ plugins: { legend: { display: false } }, cutout: '60%' }} />
                        <div className='absolute top-[50%] left-[50%] text-center' style={{transform: 'translate(-50%, -50%)'}}>
                            <div className='text-[10px]  font-[600]'>{totalValue}</div>
                            <div className='text-[7px]  font-[500] leading-none'>Product Sales</div>
                        </div>
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

// Total views
const TotalViews = () => {
    return (
        <div className='totalViews--container  h-[99px]' >
            <div className='views--top  mb-[5px]'>
                <div>
                    <img src={CartW} alt='views' />
                </div>
                <div>
                    <img src={dotW} alt='views' />
                </div>
            </div>
            
            <div className='h-fit items-center' style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', marginBottom: '5px' }}>
                <div>
                    <p className='text-[10px] font-[500]'>Total sales</p>
                    <p className='text-[14px] font-[600]'>$4,000</p>
                </div>
                
                <div>
                    <p className='text-right pb-[2px]'>+61%</p>
                    <img src={lineW} alt='trend' />
                </div>
            </div>
            
        </div>
    )
};

// Partnership
const Partnership = () => {
    const { theme } = useContext(ThemeContext);
    
    return (
        <div className='partners--container h-[99px]' style={{backgroundColor: theme === "light" ? "#fff " : "", boxShadow: theme === 'light' ? "0px 2px 2px 0px rgba(0, 0, 0, 0.1), 2px 0px 2px 0px rgba(0, 0, 0, 0.019) " : "0px 1px 1px 1px rgba(255, 255, 255, 0.2)"}}>
            <div className='partner--top mb-[5px]'>
            <div>
                    <img src={CartG} alt='views' />
                </div>
                <div>
                    <img src={dotG} alt='views' />
                </div>
            </div>
            
            <div className='h-fit items-center' style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', marginBottom: '5px' }}>
                <div>
                    <p className='text-[10px] font-[500]'>Total order</p>
                    <p className='text-[14px] font-[600]'>$4,000</p>
                </div>
                
                <div>
                    <p className='text-right pb-[2px] text-[#37C868]'>+61%</p>
                    <img src={lineG} alt='trend' />
                </div>
            </div>
        </div>
    )
};

// Total earned
const TotalEarned = () => {
    const { theme } = useContext(ThemeContext);
    
    return (
        <div className='partners--container h-[99px]' style={{backgroundColor: theme === "light" ? "#fff " : "", boxShadow: theme === 'light' ? "0px 2px 2px 0px rgba(0, 0, 0, 0.1), 2px 0px 2px 0px rgba(0, 0, 0, 0.019) " : "0px 1px 1px 1px rgba(255, 255, 255, 0.2)"}}>
            <div className='partner--top mb-[5px]'>
            <div>
                    <img src={CartP} alt='views' />
                </div>
                <div>
                    <img src={dotP} alt='views' />
                </div>
            </div>
            
            <div className='h-fit items-center' style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', marginBottom: '5px' }}>
                <div>
                    <p className='text-[10px] font-[500]'>Total visitors</p>
                    <p className='text-[14px] font-[600]'>$4,000</p>
                </div>
                
                <div>
                    <p className='text-right pb-[2px] text-[#892CFF]'>+61%</p>
                    <img src={lineP} alt='trend' />
                </div>
            </div>
        </div>
    )
};

// Total content 
const TotalContent = () => {
    const { theme } = useContext(ThemeContext);
    
    return (
        <div className='partners--container h-[99px]' style={{backgroundColor: theme === "light" ? "#fff " : "", boxShadow: theme === 'light' ? "0px 2px 2px 0px rgba(0, 0, 0, 0.1), 2px 0px 2px 0px rgba(0, 0, 0, 0.019) " : "0px 1px 1px 1px rgba(255, 255, 255, 0.2)"}}>
            <div className='partner--top mb-[5px]'>
            <div>
                    <img src={CartR} alt='views' />
                </div>
                <div>
                    <img src={dotR} alt='views' />
                </div>
            </div>
            
            <div className='h-fit items-center' style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', marginBottom: '5px' }}>
                <div>
                    <p className='text-[10px] font-[500]'>Total revenue</p>
                    <p className='text-[14px] font-[600]'>$2,700</p>
                </div>
                
                <div>
                    <p className='text-right pb-[2px] text-[#FF3939]'>+61%</p>
                    <img src={lineR} alt='trend' />
                </div>
            </div>
        </div>
    )
};




export const VendorsStat = ({theme}) => {
    return (
        <>
            <div className='feed--page'>
                <UserStat theme={theme} />
                <div className='mt-[31px] flex overflow-x-scroll store__card  gap-x-6 pb-[5px] px-[.5rem]'>

                    <TotalViews />
                    <Partnership />
                    <TotalEarned />
                    <TotalContent />
                </div>

                {/* Trending Post */}
                <div className='mt-[20px]'>
                    <h2 className='text-[12px] font-[600]  mt-[20px] laptop:text-[18px]'>Trending Products</h2>

                    <ListBase title=' ' resource='product'>
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

                                            {data && data.map((product) => {
                                                
                                                return (
                                                    <div key={product.id} className="flex flex-col items-center justify-center gap-y-[10px]">
                                                        <div className="w-[80px] h-[80px] flex-shrink-0 rounded-full overflow-hidden laptop:w-[100px] laptop:h-[100px]">
                                                            
                                                            <Link to={`/product/${product.id}/show`}>
                                                                <img src={product?.thumbnail} alt='user-post' className="object-cover w-full h-full" />
                                                            </Link>
                                                        </div>
                                                        <div className='text-center'>
                                                            <h2 className='text-[10px] font-[600] '>{product?.handle}</h2>
                                                            <p className='text-[9px] text-[#7A7A7A] mt-[2px]'>400 sold</p>
                                                            <p className='text-[9px] text-[#7A7A7A]'>14k views</p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </>
                                ) : (
                                    <p className='font-[500] text-[#222] flex items-center justify-center mt-[1rem]'>Loading...</p>
                                )
                            )} />
                        </InfiniteList>
                    </ListBase>
                </div>
            </div>
        </>
    );
};


  