import React, { useEffect, useState } from 'react';
import './postCard.css';
import { ThemeContext } from '../context/ThemeProvider';
import { supabase } from '../../supabase/SupabaseConfig';
import { useRedirect } from 'react-admin';

const PostCard = (props) => {
    const { theme } = React.useContext(ThemeContext);

    const { thumbnail, title, subTitle, views, likes, comments, postId } = props;

    const redirect = useRedirect();

    const goToPost = (postId) => {
        redirect('show', postId?.split(":")[0], postId?.split(":")[1]);
    }

    const useSavedPosts = (postId) => {
        const [postData, setPostData] = useState(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);

        useEffect(() => {
            const fetchPostData = async () => {
                try {
                    setLoading(true);
                    const _postId = postId?.split(":").length === 2 ? (postId) : (null);

                    // Fetch the saved posts
                    let { data, error: savedError } = await supabase
                        .from(postId?.split(":")[0])
                        .select("*")
                        .match({ id: postId?.split(":")[1] });
                        if (savedError) throw savedError;                    
                    
                    let { data: likes, error: likesError } = await supabase
                        .from('likes')
                        .select("*")
                        .match({ postId: postId?.split(":")[1] });
                    if (likesError) throw likesError;

                    
                    let { data: views, error: viewsError } = await supabase
                        .from('viewers')
                        .select("*")
                        .match({ video_id: postId?.split(":")[1] });
                    if (viewsError) throw viewsError;

                    
                    let { data: comments, error: commentsError } = await supabase
                        .from('comments')
                        .select("*")
                        .match({ postId: postId?.split(":")[1] });
                    if (commentsError) throw commentsError;

                    

                    setPostData({...data[0], views: views.length, likes: likes.length, comments: comments.length});
                } catch (e) {
                    setError(e);
                } finally {
                    setLoading(false);
                }

            };

            fetchPostData();
        }, [postId]);

        return { postData, loading, error };
    };

    const { postData } = useSavedPosts(postId);

    

    const _thumbnail = postData?.posterUrl ? (postData?.posterUrl) : ("https://images.unsplash.com/photo-1598128558393-70ff21433be0?q=80&w=489&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");

    const _title = postData?.name ? (postData?.name) : ("Noteworthy technology");

    const _subTitle = postData?.body ? (postData?.body) : ("Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.");

    const _views = postData?.views ? (postData?.views) : ("1.2k");

    const _likes = postData?.likes ? (postData?.likes) : ("1.2k");

    const _comments = postData?.comments ? (postData?.comments) : ("1.2k");


    return (
        <>
            <div onClick={() => goToPost(postId)} className="max-w-[300px] mb-[10px] rounded-lg shadow-sm drop-shadow-xl shadow-zinc-500  flex h-[90px] overflow-hidden gap-x-3 items-center cursor-pointer" style={{ backgroundColor: theme === 'light' ? '#fff' : '#222', color: theme === 'light' ? '#222' : '#fff', }}>
                <a href="#">
                    <img className=" h-[90px] min-w-[80px]" src=
                        {_thumbnail} alt="" />
                </a>
                <div className="brand">
                    <a href="#">
                        <h5 className=" font-bold tracking-tight pb-[4 px]">{_title} </h5>
                    </a>
                    <p className="font-normal text-gray-400 body text-[12px]">{_subTitle}</p>
                    <div className='float-left text-[9px] my-[5px] text-[#d7d7d7] flex gap-x-2'>
                        <span>
                            {_views} Views
                        </span>

                        <span>
                            {_likes} Likes
                        </span>

                        <span>
                            {_comments} Comments
                        </span>
                    </div>

                </div>
            </div>
        </>
    )
};

export default PostCard