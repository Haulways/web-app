import React, { useEffect, useState } from 'react';
import './exploreCard.css';
import { ThemeContext } from '../context/ThemeProvider';
import { supabase } from '../../supabase/SupabaseConfig';
import { useRedirect } from 'react-admin';

const ExploreCard = (props) => {
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



                    setPostData({ ...data[0], views: views.length, likes: likes.length, comments: comments.length });
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



    const _thumbnail = postData?.posterUrl ? (postData?.posterUrl) : ("https://cdn.pixabay.com/photo/2022/01/11/21/48/link-6931554_640.png");

    const _title = postData?.name ? (postData?.name) : ("Post Link");

    const _subTitle = postData?.body ? (postData?.body) : ("lorem ipsum lorem ipsum lorem ipsum lorem ipsum");

    const _views = postData?.views ? (postData?.views) : ("0");

    const _likes = postData?.likes ? (postData?.likes) : ("0");

    const _comments = postData?.comments ? (postData?.comments) : ("0");


    return (
        <>
            <div onClick={() => goToPost(postId)} className="max-w-[300px] mb-[10px] rounded-lg shadow-sm drop-shadow-xl shadow-zinc-500   overflow-hidden gap-x-3  cursor-pointer p-[16px]" style={{ backgroundColor: theme === 'light' ? '#fff' : '#222', color: theme === 'light' ? '#222' : '#fff', }}>
                <div className='w-full rounded-lg mb-[10px]'>
                    <img className="  w-[200px] min-w-[100%] rounded-lg object-cover" src=
                        {_thumbnail} alt="" />
                </div>
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

export default ExploreCard
