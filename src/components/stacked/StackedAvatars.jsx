
import './stacked.css';



export const StackedAvatars = ({title, post}) => {
    
    
    return (
        <>
            <div className='stacked--container'>

                <div className="stacked-avatar-container relative">
                    <div className="absolute w-[50px] h-[50px] z-[10] right-[0px]  bg-[#3d3d3d] rounded-full"></div>
                    <div className="absolute w-[50px] h-[50px]  right-[-2px]  bg-[#D9D9D9] rounded-full"></div>
                    {post?.media && post?.media.map((mediaUrl, index) => {
                        return (
                            <div key={index} className="min-w-[50px] h-[50px] z-[15] overflow-hidden rounded-full relative">
                                <video className='w-full h-full object-cover' src={mediaUrl} autoPlay={false} controls={false} playsInline={true} nodownload='true' />
                             
                            </div>

                        )
                    })}
                </div>
                <div className='stacked--name'>{title}</div>
            </div>
        </>
    );
};