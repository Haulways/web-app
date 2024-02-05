import React, { useContext, useState } from 'react'
import './createPost.css';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Categories from './Categories';
import { useNavigate } from 'react-router-dom';
import backIcon from "../../assets/postImg-Icons/backIcon.png";
import location from "../../assets/postImg-Icons/location.png";
import music from "../../assets/postImg-Icons/music.png";
import tag from "../../assets/postImg-Icons/tag.png";
import { supabase } from '../../supabase/SupabaseConfig';
import { v4 as uuidv4 } from "uuid";
import { CircularProgress } from '@mui/material';



const PostContainer = ({ selectedFiles, closeSendPost, collectionName, trimmedVideoFile, inputVideoFile, taggedData, currentThumbnail, URL, theme }) => {
    const { currentUser } = useContext(AuthContext);
    const [caption, setCaption] = useState('');
    const [uploading, setUploading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const navigate = useNavigate();

    const watermarkId = `${import.meta.env.VITE_WATERMARK}`;

    console.log(selectedFiles)

    const handlePost = async (e) => {
        e.preventDefault();
    
        try {
            setUploading(true);

            // Upload to Cloudinary
            const cloudinaryUploadTasks = selectedFiles.map(async file => {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'irpmtb9p'); // Replace with your Cloudinary upload preset
    
                const response = await fetch(`${import.meta.env.VITE_CLOUDINARY}`, {
                    method: 'POST',
                    body: formData,
                });
    
                const cloudinaryData = await response.json();
    
                // Get the public ID of the uploaded asset
                let publicId = cloudinaryData.public_id;
                console.log(cloudinaryData, publicId);

    
                // Construct the URL for the video with watermark
                let videoSource = `${import.meta.env.VITE_VIDEOSOURCE}`;

                // Automatically adjust the quality and set the video to be responsive
                videoSource += "/q_auto:low,f_auto";

                // For watermarks, replace folder slashes with colons
                const watermark = `l_${watermarkId.replace(/\//g, ":")}`;

                // Add the watermark to the bottom-right of the video, 100px wide, offset 20px from the edges
                videoSource += `/${watermark},g_north_east,w_100,x_25,y_25`;

                // Set the publicId to display the video as an MP4
                videoSource += `/${publicId}.mp4`;

                return videoSource;
            });

            // Wait for all Cloudinary upload tasks to complete
            const cloudinaryMediaUrls = await Promise.all(cloudinaryUploadTasks);

            console.log(cloudinaryMediaUrls);

            // Upload thumbnail to Cloudinary
            const thumbnailFormData = new FormData();
            thumbnailFormData.append('file', currentThumbnail);
            thumbnailFormData.append('upload_preset', 'irpmtb9p'); // Replace with your Cloudinary upload preset

            const thumbnailResponse = await fetch(`${import.meta.env.VITE_CLOUDINARY}`, {
                method: 'POST',
                body: thumbnailFormData,
            });

            const thumbnailCloudinaryData = await thumbnailResponse.json();
            const cloudinaryThumbnailUrl = thumbnailCloudinaryData.secure_url;

            console.log(cloudinaryThumbnailUrl);

            const uuid = uuidv4();
    
            // Create a new post in Supabase
            const { data: postData, error: postError } = await supabase
                .from(collectionName)
                .insert({
                    id: uuid,
                    postId: uuid,
                    uid: currentUser.id,
                    photoURL: currentUser.photoURL,
                    name: currentUser.displayName,
                    body: caption,
                    categories: selectedCategory,
                    media: cloudinaryMediaUrls,
                    taggedProducts: taggedData,
                    timestamp: new Date(),
                    posterUrl: cloudinaryThumbnailUrl, // Use the Cloudinary URL for the thumbnail
                    URL: collectionName
                });
    
            if (postError) throw postError;
    
            setUploading(false);
            navigate('/dashboard');
            toast.success("Post Uploaded");
        } catch (error) {
            setUploading(false);
            toast.error(error.message);
        }
    
        // Reset the form inputs
        setCaption('');
    };
    


    return (
        <>
            
            {uploading ? (
                <div className='spinner feed--page'>
                    <CircularProgress  />
                    Uploading...
                </div>
            ) : (
                <div className='post__container feed--page'>
                    <button className='absolute top-[3rem] left-[2rem] mobile:top-[2rem] mobile:left-4 w-[40px] h-[40px] invert'
                        onClick={closeSendPost}
                    >
                        <img src={backIcon} alt='back' style={{filter: theme === "light" ? "invert(1)" : "invert(1)" }}/>
                    </button>


                    
                    <div className='create__post__contents'>
                            
                        <>
                            {selectedFiles && (
                                <div className='Dcreate__post__files feed--page'>
                                    {selectedFiles[0] instanceof Blob || selectedFiles[0] instanceof File ? (
                                        <video src={window.URL && window.URL.createObjectURL ? window.URL.createObjectURL(selectedFiles[0]) : ''} className="shareVideo" muted controlsList="nodownload" />
                                    ) : (
                                        <video src={selectedFiles[0]} className="shareVideo" muted controlsList="nodownload" />
                                    )}
                                </div>
                            )}


                            <div className='create__post__form feed--page'>
                                <form onSubmit={handlePost}>
                                    <div className='submit__post__button text-right' >
                                        <button type='submit' style={{backgroundColor: theme === "light" ? "#222" : "#fff", color: theme === "light" ? "#fff" : "#222"}}>Post</button>
                                    </div>
                                    {/* input section  */}
                                    <div className='caption__container' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
                                        <div className='userImage'>
                                            <img src={currentUser.photoURL} alt='userImage' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                                        </div>
                                        <textarea type='text' placeholder='Add caption (optional)' rows={2} style={{ resize: "none", backgroundColor: theme === "light" ? "" : "#fff", color: theme === "light" ? "" : "#222" }} value={caption} onChange={(e) => setCaption(e.target.value)} />

                                        <div className='Mcreate__post__files'>
                                            {selectedFiles && (
                                                <div className='mobile__postImg__container' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
                                                    {selectedFiles[0] instanceof Blob || selectedFiles[0] instanceof File ? (
                                                        <video src={window.URL && window.URL.createObjectURL ? window.URL.createObjectURL(selectedFiles[0]) : ''} className="shareVideo" muted controlsList="nodownload" />
                                                    ) : (
                                                        <video src={selectedFiles[0]} className="shareVideo" muted controlsList="nodownload" />
                                                    )}
                                                </div>
                                            )}

                                        </div>
                                    
                                    </div>
                                    {/* other buttons */}
                                    <div className='location__tags' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
                                        <p>Add Location <img src={location} alt='location'  /></p>
                                            
                                        <p>Add music <img src={music} alt='music' /></p>
                                            
                                        <p>Tag people <img src={tag} alt='tag' /></p>
                                    </div>
                                    <Categories theme={theme} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
                                </form>
                            </div>
                        </>
                                
                    </div>
                </div>
            )}
          
        </>
    );
};

export default PostContainer