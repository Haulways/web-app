import * as React from 'react'
import { useLocation } from 'react-router-dom';
import { ThemeContext } from '../../../components/context/ThemeProvider';
import { CardMedia, Skeleton } from '@mui/material';
import { SFooter } from '../../../components';
import { useGetList } from 'react-admin';

const History = () => {
    const location = useLocation();
    const { theme } = React.useContext(ThemeContext);
    

    const data = location?.state?.data
    
    return (
        <>
            <div className='my-[1.2rem] px-[.5rem]'>
                <h2 className='font-[500] text-[17px] pb-[.5rem]'>Watch History ({data.length})</h2>

                <div className='pb-[1.5rem] pt-[10px]  feed--page   mx-auto' style={{ boxSizing: 'border-box' }}>
                    {data && data?.map((product) => {
                        const mediaUrl = product.media[0]; // Get the URL of the single media file
                        const isImage = mediaUrl.includes('.jpg') || mediaUrl.includes('.jpeg') || mediaUrl.includes('.png');

                        return (
                            <AllDownload isImage={isImage} theme={theme} mediaUrl={mediaUrl} product={product} />

                        )
                    })
                    }
                </div>
            </div>
            <SFooter />
        </>
    );
};

export default History


const AllDownload = ({ product, isImage, mediaUrl, theme }) => {
    const [isReady, setIsReady] = React.useState(false);
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
    const handleCanPlay = () => {
        setIsReady(true);
    };

    const ReadMore = ({ children, maxCharCnt = 200 }) => {
        const text = children;
        const [isTruncated, setIsTruncated] = React.useState(true);
      
        const resultString = isTruncated ? text.slice(0, maxCharCnt) : text;
      
        
      
        return (
            <p className='w-[100%] text-[12px] leading-[1.2]'>
                {resultString}
                <span style={{ color: '#D9D9D9', cursor: 'pointer' }}>
                    {isTruncated ? '...' : ''}
                </span>
            </p>
        );
    };
    return (
        <div key={product.id} className="flex mb-[1rem] flex-shrink-0 justify-between" >
            <div className='flex gap-x-2'>
                <div className="w-[130px] h-[90px] laptop:w-[250px] laptop:h-[250px] rounded-[5.374px] overflow-hidden relative">
             
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
                                muted={true}
                                controls={false}
                                poster={product.posterUrl ? product.posterUrl : null}
                                onCanPlay={handleCanPlay}
                                style={{ display: isReady ? 'block' : 'none' }}
                            />
                          
                        </>
                    )}
                    <div className='absolute bottom-[6.34px] left-[5.93px] text-[6.374px] text-white'>
                        {formatFollowers(totalViews)} views
                    </div>
                </div>

                <div className='  flex flex-col justify-around'>
                    <p className='text-[14px]'>{product.name}</p>
                    <ReadMore maxCharCnt={25}>
                        {product.body}
                    </ReadMore>
                                    
                    <p className='text-[11px]'>3.5K downloads</p>
                </div>
            </div>
                                               
            <div className=' w-[4px] h-[15px]' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="4" height="15" viewBox="0 0 4 15" fill="none">
                    <path d="M2 11C2.53043 11 3.03914 11.1844 3.41421 11.5126C3.78929 11.8408 4 12.2859 4 12.75C4 13.2141 3.78929 13.6592 3.41421 13.9874C3.03914 14.3156 2.53043 14.5 2 14.5C1.46957 14.5 0.96086 14.3156 0.585787 13.9874C0.210714 13.6592 0 13.2141 0 12.75C0 12.2859 0.210714 11.8408 0.585787 11.5126C0.96086 11.1844 1.46957 11 2 11ZM2 5.75C2.53043 5.75 3.03914 5.93437 3.41421 6.26256C3.78929 6.59075 4 7.03587 4 7.5C4 7.96413 3.78929 8.40925 3.41421 8.73744C3.03914 9.06563 2.53043 9.25 2 9.25C1.46957 9.25 0.96086 9.06563 0.585787 8.73744C0.210714 8.40925 0 7.96413 0 7.5C0 7.03587 0.210714 6.59075 0.585787 6.26256C0.96086 5.93437 1.46957 5.75 2 5.75ZM2 0.5C2.53043 0.5 3.03914 0.684374 3.41421 1.01256C3.78929 1.34075 4 1.78587 4 2.25C4 2.71413 3.78929 3.15925 3.41421 3.48744C3.03914 3.81563 2.53043 4 2 4C1.46957 4 0.96086 3.81563 0.585787 3.48744C0.210714 3.15925 0 2.71413 0 2.25C0 1.78587 0.210714 1.34075 0.585787 1.01256C0.96086 0.684374 1.46957 0.5 2 0.5Z" fill="black" />
                </svg>
            </div>
                            
                                             
        </div>
    );
};