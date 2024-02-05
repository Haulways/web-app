import * as React from 'react'
import './review.css';
import { ThemeContext } from '../context/ThemeProvider';
import { Avatar, CircularProgress, Dialog } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import infoIcon from '../../assets/socials/info.png';
import { Rating } from './Rating';
import { v4 as uuidv4 } from "uuid";
import { supabase } from '../../supabase/SupabaseConfig';
import { toast } from 'react-toastify';

export const CreateReview = ({ createReview, mediaUrl, handleCloseCreateReview, url }) => {
    const { theme } = React.useContext(ThemeContext);
    const { currentUser } = React.useContext(AuthContext)
    const [videoFile, setVideoFile] = React.useState([]);
    const [dragging, setDragging] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [rating, setRating] = React.useState(0);
    const [message, setMessage] = React.useState('');
    const fileInputRef = React.useRef();


    // console.log(url);

    const onDivClick = () => {
        fileInputRef.current.click();
    };

    const onDragEnter = () => {
        setDragging(true);
    };

    const onDragLeave = () => {
        setDragging(false);
    };

    const closeIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M0.251763 0.251763C0.331366 0.171957 0.425932 0.10864 0.530044 0.0654386C0.634156 0.0222369 0.745768 0 0.858488 0C0.971207 0 1.08282 0.0222369 1.18693 0.0654386C1.29104 0.10864 1.38561 0.171957 1.46521 0.251763L6.00022 4.78849L10.5352 0.251763C10.6149 0.172086 10.7095 0.108884 10.8136 0.065763C10.9177 0.0226426 11.0293 0.000448674 11.142 0.000448674C11.2546 0.000448674 11.3662 0.0226426 11.4703 0.065763C11.5744 0.108884 11.669 0.172086 11.7487 0.251763C11.8284 0.331439 11.8916 0.426028 11.9347 0.53013C11.9778 0.634232 12 0.745808 12 0.858488C12 0.971167 11.9778 1.08274 11.9347 1.18685C11.8916 1.29095 11.8284 1.38554 11.7487 1.46521L7.21196 6.00022L11.7487 10.5352C11.8284 10.6149 11.8916 10.7095 11.9347 10.8136C11.9778 10.9177 12 11.0293 12 11.142C12 11.2546 11.9778 11.3662 11.9347 11.4703C11.8916 11.5744 11.8284 11.669 11.7487 11.7487C11.669 11.8284 11.5744 11.8916 11.4703 11.9347C11.3662 11.9778 11.2546 12 11.142 12C11.0293 12 10.9177 11.9778 10.8136 11.9347C10.7095 11.8916 10.6149 11.8284 10.5352 11.7487L6.00022 7.21196L1.46521 11.7487C1.38554 11.8284 1.29095 11.8916 1.18685 11.9347C1.08274 11.9778 0.971167 12 0.858488 12C0.745808 12 0.634232 11.9778 0.53013 11.9347C0.426028 11.8916 0.331439 11.8284 0.251763 11.7487C0.172086 11.669 0.108884 11.5744 0.065763 11.4703C0.0226426 11.3662 0.000448674 11.2546 0.000448674 11.142C0.000448674 11.0293 0.0226426 10.9177 0.065763 10.8136C0.108884 10.7095 0.172086 10.6149 0.251763 10.5352L4.78849 6.00022L0.251763 1.46521C0.171957 1.38561 0.10864 1.29104 0.0654386 1.18693C0.0222369 1.08282 0 0.971207 0 0.858488C0 0.745768 0.0222369 0.634156 0.0654386 0.530044C0.10864 0.425932 0.171957 0.331366 0.251763 0.251763Z" fill="black" />
        </svg>
    );
   
 
    const uploadIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M7 12V3.85L4.4 6.45L3 5L8 0L13 5L11.6 6.45L9 3.85V12H7ZM2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196666 15.0217 0.000666667 14.5507 0 14V11H2V14H14V11H16V14C16 14.55 15.8043 15.021 15.413 15.413C15.0217 15.805 14.5507 16.0007 14 16H2Z" fill="#7A7A7A" />
        </svg>
    );


    const onFileChange = (event) => {
        setVideoFile(Array.from(event.target.files));
    };

    const onFileDrop = (event) => {
        event.preventDefault();
        if (event.dataTransfer.items) {
            let droppedFiles = [];
            for (let i = 0; i < event.dataTransfer.items.length; i++) {
                if (event.dataTransfer.items[i].kind === 'file') {
                    droppedFiles.push(event.dataTransfer.items[i].getAsFile());
                }
            }
            setVideoFile(droppedFiles);
            setDragging(false);
        }
    };
     


    const onDragOver = (event) => {
        event.preventDefault();
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const uuid = uuidv4();
        setLoading(true);
        if (!Array.isArray(videoFile)) {
            setLoading(false);
            return;
        }
        const cloudinaryUploadTasks = videoFile?.map(async file => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'irpmtb9p'); // Replace with your Cloudinary upload preset

            const response = await fetch(`${import.meta.env.VITE_CLOUDINARY}`, {
                method: 'POST',
                body: formData,
            });

            const cloudinaryData = await response.json();
            // Modify the secure_url to include video optimization transformations
            let urlParts = cloudinaryData.secure_url.split("/");
            urlParts.splice(-2, 0, "q_auto:low,f_auto"); // Add any other transformations you need
            return urlParts.join("/");
        });

        // Wait for all Cloudinary upload tasks to complete
        const cloudinaryMediaUrls = await Promise.all(cloudinaryUploadTasks);
    
        // Create a new post in Supabase
        const { error } = await supabase
            .from(url)
            .insert({
                id: uuid,
                from_photoURL: currentUser.photoURL,
                from_name: currentUser.displayName,
                review_text: message,
                rating: rating,
                review_media: cloudinaryMediaUrls,
                product_id: mediaUrl.id,
                created_at: new Date(),
            });
    
        if (error) throw error;
        setMessage('');
        setVideoFile([]);
        setRating(0)
        setLoading(false);
        toast.success('You reivew sent. Thank you!')
    };

    return (
        <Dialog
            open={createReview}
            fullScreen
            onClose={handleCloseCreateReview}
            PaperProps={{ style: { backgroundColor: theme === "light" ? "#fff" : "#222", color: theme === "light" ? "#222" : "#fff", } }}
        // className='store__card'
        >
            <div className='absolute top-[2rem] left-[1rem] w-[12px] h-[12px]' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} onClick={handleCloseCreateReview}>
                {closeIcon}
            </div>

            <div className='flex  justify-end gap-x-[20px] mt-[18px] px-[16px]'>
                {url === 'product_review' && (
                    <div className="flex items-center gap-x-[20px]">
                        <div className='w-[40px] h-[40px] rounded-[8px] overflow-hidden'>
                            <img className='w-[40px] h-[40px]' src={mediaUrl?.thumbnail} alt='product' />
                        </div>
                        <div>
                            <h2 className='inline-block text-[14px] font-[500] capitalize'>{mediaUrl?.handle}:</h2> <span className='text-[14px] text-[#7A7A7A]'>Avenue store</span>
                            <p className='text-[10px]'>Ratings this product</p>
                        </div>
                    </div>
                )}
                <div className='text-[12px] mt-[3px]' onClick={handleSubmit}>Post</div>
            </div>

            <div className='mt-[30px] px-[16px]'>
                <div className='flex items-center gap-x-[5px]'>
                    <div>
                        <Avatar sx={{ width: '40px', height: "40px" }}
                            src={currentUser.photoURL}
                        />
                        
                    </div>
                    <div>
                        <h2 className='text-[12px]'>{currentUser.displayName}</h2>
                        <p className='text-[10px]'>Reviews are public and include your account info <img className='inline-block' src={infoIcon} alt='' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} /></p>
                    </div>
                </div>

                {/* Stars rating */}
               
                <Rating rating={rating} onRatingChange={setRating} />
             
                

                <div className='my-[30px]'>
                    <textarea type="text" placeholder="Give a review" value={message}
                        onChange={(e) => setMessage(e.target.value)} maxLength={800} className="reviewInput" rows={1} style={{ resize: "none" }} />
                    <p className='float-right text-[#7A7A7A] text-[10px] mt-[6px]'>
                        {message.length}/800
                    </p>
                </div>

                <div className={`fileUpload ${dragging || videoFile.length > 0 ? 'dragging' : ''}`} onClick={onDivClick} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onFileDrop} onDragOver={onDragOver} >
                  
                    {uploadIcon}
                    {videoFile.length > 0 ?
                        <p>Files Selected</p>
                        :
                        <p>Upload video review</p>
                    }
                    <input ref={fileInputRef} type='file' multiple accept='video/*' onChange={onFileChange} style={{ display: 'none' }} />
                
                </div>

            </div>


            {loading ?
                <CircularProgress sx={{ filter: theme === "light" ? "invert(0)" : "invert(1)", margin: '5rem auto' }} />
                :
                null
            }
      

        </Dialog>
    );
};

