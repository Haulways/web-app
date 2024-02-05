import React, { useContext, useState } from 'react'
import './createAd.css';
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
import { CircularProgress, Dialog } from '@mui/material';



const AdContainer = ({ closeSendPost, collectionName, taggedData, theme, selectedTab, openSendPost }) => {
    const { currentUser } = useContext(AuthContext);
    const [caption, setCaption] = useState('');
    const [uploading, setUploading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const navigate = useNavigate();


    const handlePost = async (e) => {
        e.preventDefault();
    
        try {
            setUploading(true);

            const uuid = uuidv4();
    
            // Create a new post in Supabase
            const { data: postData, error: postError } = await supabase
                .from(collectionName)
                .insert({
                    id: uuid,
                    post_id: taggedData?.id,
                    store_id: null,
                    ad_type: selectedTab,
                    price: null, // Use the Cloudinary URL for the thumbnail
                    paid: null,
                    ad_status: null,
                    created_at: new Date()
                });
    
            if (postError) throw postError;
    
            setUploading(false);
            navigate('/ads');
            toast.success("Ad Uploaded");
        } catch (error) {
            setUploading(false);
            toast.error(error.message);
        }
    
        // Reset the form inputs
        setCaption('');
    };
    


    return (
        <Dialog
            open={openSendPost}
            onClose={closeSendPost}
            fullScreen
            PaperProps={{ style: { backgroundColor: theme === "light" ? "#fff" : "#222", color: theme === 'light' ? '#222' : '#fff' } }}>
            
            {uploading ? (
                <div className='spinner feed--page'>
                    <CircularProgress />
                    Uploading...
                </div>
            ) : (
                <div className='post__container feed--page'>
                    <button className='absolute top-[3rem] left-[2rem] mobile:top-[2rem] mobile:left-4 w-[40px] h-[40px] invert'
                        onClick={closeSendPost}
                    >
                        <img src={backIcon} alt='back' style={{ filter: theme === "light" ? "invert(1)" : "invert(1)" }} />
                    </button>


                    
                    <div className='create__post__contents'>
                            
                        <>
                            {taggedData?.media && (
                                <div className='Dcreate__post__files feed--page'>
                                    {taggedData?.media[0] instanceof Blob || taggedData?.media[0] instanceof File ? (
                                        <video src={window.URL && window.URL.createObjectURL ? window.URL.createObjectURL(taggedData?.media[0]) : ''} className="shareVideo" muted controlsList="nodownload" />
                                    ) : (
                                        <video src={taggedData?.media[0]} className="shareVideo" muted controlsList="nodownload" />
                                    )}
                                </div>
                            )}


                            <div className='create__post__form feed--page'>
                                <form onSubmit={handlePost}>
                                    <div className='submit__post__button text-right' >
                                        <button type='submit' style={{ backgroundColor: theme === "light" ? "#222" : "#fff", color: theme === "light" ? "#fff" : "#222" }}>Post Ad</button>
                                    </div>
                                    {/* input section  */}
                                    <div className='caption__container' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
                                        <div className='userImage'>
                                            <img src={currentUser.photoURL} alt='userImage' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }} />
                                        </div>
                                        <textarea type='text' placeholder='Add caption (optional)' rows={2} style={{ resize: "none", backgroundColor: theme === "light" ? "" : "#fff", color: theme === "light" ? "" : "#222" }} value={caption} onChange={(e) => setCaption(e.target.value)} />

                                        <div className='Mcreate__post__files'>
                                            {taggedData?.media && (
                                                <div className='mobile__postImg__container' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
                                                    {taggedData?.media[0] instanceof Blob || taggedData?.media[0] instanceof File ? (
                                                        <video src={window.URL && window.URL.createObjectURL ? window.URL.createObjectURL(taggedData?.media[0]) : ''} className="shareVideo" muted controlsList="nodownload" />
                                                    ) : (
                                                        <video src={taggedData?.media[0]} className="shareVideo" muted controlsList="nodownload" />
                                                    )}
                                                </div>
                                            )}

                                        </div>
                                    
                                    </div>
                                    {/* other buttons */}
                                    {/* <div className='location__tags' style={{ filter: theme === "light" ? "invert(0)" : "invert(1)" }}>
                                        <p>Add Location <img src={location} alt='location'  /></p>
                                            
                                        <p>Add music <img src={music} alt='music' /></p>
                                            
                                        <p>Tag people <img src={tag} alt='tag' /></p>
                                    </div>
                                    <Categories theme={theme} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} /> */}
                                </form>
                            </div>
                        </>
                                
                    </div>
                </div>
            )}
          
        </Dialog>
    );
};

export default AdContainer