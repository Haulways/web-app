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

    

    const _thumbnail = postData?.posterUrl ? (postData?.posterUrl) : ("https://cdn.pixabay.com/photo/2022/01/11/21/48/link-6931554_640.png");

    const _title = postData?.name ? (postData?.name) : ("Shared Link");

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

export const ProductCard = (props) => {
    const { theme } = React.useContext(ThemeContext);

    const { thumbnail, title, subTitle, views, likes, comments, postId } = props;

    const redirect = useRedirect();

    const goToPost = (postId) => {
        redirect('show', postId?.split(":")[0], postId?.split(":")[1]);
    }

    const useProduct = (postId) => {
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

    const { postData } = useProduct(postId);



    const _thumbnail = postData?.posterUrl ? (postData?.posterUrl) : ("https://cdn.pixabay.com/photo/2022/01/11/21/48/link-6931554_640.png");

    const _title = postData?.name ? (postData?.name) : ("Shared Product Link");

    const _subTitle = postData?.body ? (postData?.body) : ("Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.");

    const _views = postData?.views ? (postData?.views) : ("1.2k");

    const _likes = postData?.likes ? (postData?.likes) : ("1.2k");

    const _comments = postData?.comments ? (postData?.comments) : ("1.2k");

    const starLightSmall = (
        <svg width="12.639" height="12.639" viewBox="0 0 34 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.1074 4.76135L17.3964 2.64304L16.6854 4.76135L14.0739 12.5418H5.60672H3.23662L5.17527 13.9053L12.0041 18.7081L9.39897 26.4695L8.67152 28.6368L10.5414 27.3217L17.3964 22.5005L24.2514 27.3217L26.1213 28.6368L25.3939 26.4695L22.7887 18.7081L29.6176 13.9053L31.5562 12.5418H29.1861H20.719L18.1074 4.76135Z" stroke="#D9D9D9" />
        </svg>
    );

    const starYellow = (
        <svg width="12.639" height="12.639" viewBox="0 0 34 31" fill="#FF8C31" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.1074 4.76135L17.3964 2.64304L16.6854 4.76135L14.0739 12.5418H5.60672H3.23662L5.17527 13.9053L12.0041 18.7081L9.39897 26.4695L8.67152 28.6368L10.5414 27.3217L17.3964 22.5005L24.2514 27.3217L26.1213 28.6368L25.3939 26.4695L22.7887 18.7081L29.6176 13.9053L31.5562 12.5418H29.1861H20.719L18.1074 4.76135Z" stroke="#D9D9D9" />
        </svg>
    );

    const starHalf = (
        <svg width="12.639" height="12.639" viewBox="0 0 34 31" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="half-fill" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="50%" style={{ stopColor: "#FF8C31", stopOpacity: "1" }} />
                    <stop offset="50%" style={{ stopColor: "#FF8C31", stopOpacity: "0" }} />
                </linearGradient>
            </defs>
            <path fill="url(#half-fill)" d="M18.1074 4.76135L17.3964 2.64304L16.6854 4.76135L14.0739 12.5418H5.60672H3.23662L5.17527 13.9053L12.0041 18.7081L9.39897 26.4695L8.67152 28.6368L10.5414 27.3217L17.3964 22.5005L24.2514 27.3217L26.1213 28.6368L25.3939 26.4695L22.7887 18.7081L29.6176 13.9053L31.5562 12.5418H29.1861H20.719L18.1074 4.76135Z" stroke="#D9D9D9" />
        </svg>

    );

    return (
        <>
            <div onClick={() => goToPost(postId)} className="max-w-[300px] mb-[10px] rounded-lg shadow-sm drop-shadow-xl shadow-zinc-500   overflow-hidden gap-x-3  cursor-pointer p-[16px]" style={{ backgroundColor: theme === 'light' ? '#fff' : '#222', color: theme === 'light' ? '#222' : '#fff', }}>
                <div className='w-full rounded-lg mb-[10px]'>
                    <img className=" h-[90px] min-w-[100%] rounded-lg object-cover" src=
                        {_thumbnail} alt="" />
                </div>
                <div className="brand">
                   
                        <h5 className=" font-bold tracking-tight pb-[4px]">{_title} </h5>
                    
                    <div className="flex items-center">
                        <span>{starYellow}</span>
                        <span>{starYellow}</span>
                        <span>{starYellow}</span>
                        <span>{starYellow}</span>
                        <span>{starLightSmall}</span>
                        <span className='p-[4px] text-[9px] rounded-md ml-2 font-[500]' style={{ backgroundColor: theme === 'light' ? '#222' : '#fff', color: theme === 'light' ? '#fff' : '#222', }}>4.0</span>
                    </div>
                    <div className='float-left text-[15px] mt-[15px] font-[600]'>
                        <span>
                            $150.00
                        </span>
                    </div>

                    <div className='float-right text-[15px] mt-[15px] font-[600]  p-[4px] px-[10px] rounded-lg' style={{ backgroundColor: theme === 'light' ? '#222' : '#fff', color: theme === 'light' ? '#fff' : '#222', }}>
                        <span>
                            view
                        </span>
                    </div>

                </div>
            </div>
        </>
    )
};