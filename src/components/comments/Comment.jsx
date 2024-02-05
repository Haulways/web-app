import './comment.css';
import { useContext, useEffect, useState} from 'react';
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import close from '../../assets/RoundClose.png';
import { v4 as uuidv4 } from "uuid";
import { supabase } from '../../supabase/SupabaseConfig';


const Comment = ({ comment, postId }) => {
    const { currentUser } = useContext(AuthContext);
    const [replyText, setReplyText] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [updatedText, setUpdatedText] = useState(comment.commentText);
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [replies, setReplies] = useState([]);
    const [showReplies, setShowReplies] = useState(false);
    const [selectedReply, setSelectedReply] = useState(null);
    const [options, setOptions] = useState(false);
    const [option1, setOption1] = useState(false);

    

    // getting the replies from supabase
   

    // using the useEffect hook to get the replies
    useEffect(() => {
        // fetch comments from the 
        const loadReplies = async () => {
            const reply = await supabase
                .from('replies')
                .select('*')
                .eq('commentId', comment.id)
                .order('publishedAt', { ascending: false });
            setReplies(reply.data);
        };
        loadReplies();
    
        const repliesSubscription = supabase
          .channel('room1')
          .on('postgres_changes', { event: '*', schema: '*', table: 'replies', filter: `commentId=eq.${comment.id}` }, payload => {
            console.log('Change received!', payload);
            // If new comment is added
            if (payload.new) {
              setReplies(prevReplies => {
                if (!prevReplies.some(reply => reply.id === payload.new.id)) {
                  return [...prevReplies, payload.new];
                } else {
                  return prevReplies;
                }
              });
            }
            // If reply is removed
            else if (payload.old) {
              setReplies(prevReplies => prevReplies.filter(reply => reply.id !== payload.old.id));
            }
          })
          .subscribe();
    
        // ... rest of your code
        loadReplies();
        return () => {
          supabase.removeChannel(repliesSubscription);
        }
    
      }, [replies, comment]);
    
    const uuid = uuidv4();
    
    // Handle users reply inputs by post request to supabase
    const handleReply = async () => {
        if (replyText.trim() !== '') {
            const newReply = {
                postId: postId,
                id: uuid,
                commentId: comment.id,
                uid: currentUser.uid,
                authorId: currentUser.uid,
                replyText: replyText,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
                publishedAt: new Date(),
            };

            try {
                await supabase.from('replies').insert(newReply);
                setReplyText('');
                setShowReplies(true);
                setShowReplyInput(false);
            } catch (error) {
                toast.error(error.message);
            }
        }
    };
    

    // Handle the edit functionality for the comments
    const handleEdit = async () => {
        if (updatedText.trim() !== '') {
            if (currentUser.uid === comment.uid) {
                await supabase.from('comments').update({ commentText: updatedText }).eq('id', comment.id);
                setEditMode(false);
                setOptions(false);
            } else {
                setEditMode(false);
            }
        }
    };

    // delete functionality of comments for only the user that made the comment
    const handleDelete = async () => {
        if (currentUser.uid === comment.uid) {
            await supabase.from('comments').delete().eq('id', comment.id);
        } else {
            toast.warning('You don\'t have permission to delete');
        }
        setOptions(!options)

    };

    // delete functionality of reply made by the currentUser
    const handleDeleteReply = async (replyId) => {
    
        const selectedReply = replies.find((reply) => reply.id === replyId);

        if (selectedReply && currentUser.uid === selectedReply.authorId) {
            try {
                const { error } = await supabase
                    .from('replies')
                    .delete()
                    .eq('id', replyId);
      
                if (error) {
                    toast.error(error.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
        setOption1(!option1)

    };

    const toggleReplyInput = () => {
        setShowReplyInput(!showReplyInput);
    }
    const deleteIcon = (replyId) => {
        setSelectedReply((prevSelectedReplyId) =>
            prevSelectedReplyId === replyId ? null : replyId
        );
    }

    const checkOptions = () => {
        setOptions(!options)
    }

    const checkOption1 = () => {
        setOption1(!option1)
    }

    function timeDifference(current, previous) {
        const msPerMinute = 60 * 1000;
        const msPerHour = msPerMinute * 60;
        const msPerDay = msPerHour * 24;
        const msPerWeek = msPerDay * 7;
        const msPerMonth = msPerDay * 30;
    
        const elapsed = current - previous;
    
        if (elapsed < msPerMinute) {
            return Math.round(elapsed / 1000) + 's';
        }
    
        else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + 'm';
        }
    
        else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + 'h';
        }
    
        else if (elapsed < msPerWeek) {
            return Math.round(elapsed / msPerDay) + 'd';
        }
    
        else if (elapsed < msPerMonth) {
            return Math.round(elapsed / msPerWeek) + 'w';
        }
    
        else {
            return Math.round(elapsed / msPerMonth) + 'M';
        }
    }
    
    
    return (
        <>
            <div className='comments__section' >
              
                <div>
                    <ul className='users__comment'>
                        <li className='users__img'><Link to={`/users/${comment.authorId}/show`}><img src={comment.photoURL} alt='' /></Link></li>
                        <li className='comment__details'>
                            <p>
                                <span className='user__name'>
                                    <Link to={`/users/${comment.authorId}/show`}>
                                        {currentUser.uid === comment.uid ? "You" : (comment.displayName)}
                                    </Link>
                                    <span className='ml-[1rem] font-[600] text-[14px]'>
                                        {timeDifference(new Date(), new Date(comment?.publishedAt))}
                                    </span>
                                </span>
                                <span className='comment__text'>{comment.commentText}</span>
                            </p>
                          
                                    
                            {!editMode ? (
                                <ul className='comment__components'>
                                    

                                    {/* Toggle reply input */}
                                    <button type="button" onClick={toggleReplyInput}>
                                        Reply
                                    </button>

                                    <li>
                                        <AiOutlineHeart className='like' style={{ fontSize: '1.2rem', cursor: 'pointer' }} />
                                    </li>
                                    {currentUser.uid === comment.authorId && !editMode && (
                                        <>
                                            <li className='dots'>
                                                <BsThreeDots style={{ fontSize: '1.8rem', cursor: 'pointer' }} onClick={checkOptions} />
                                                {options && (
                                                    <>
                                                        <div className='option__buttons'>
                                                            <img onClick={checkOptions} src={close} alt='close' />
                                                            <button type='button' onClick={() => setEditMode(true)}>
                                                                Edit
                                                            </button>
                
                                                            <button type='button' onClick={handleDelete}>
                                                                Delete
                                                            </button>
                                                        </div>
                                                        <div onClick={checkOptions} className='options--overlay'></div>
                                                    </>
                                                )}
                                            </li>
                                        </>
                                    )}
                                </ul>
                          
                            ) : (
                                <>
                                    <input className='editInput' type='text' value={updatedText} onChange={(e) => setUpdatedText(e.target.value)} />
                                    <div className='option__buttons'>
                                        {currentUser.uid === comment.authorId && !editMode ? (
                                            <button type='button' onClick={() => setEditMode(true)}>
                                                Edit
                                            </button>
                                        ) : currentUser.uid === comment.authorId && (
                                            <button className='save__btn' type='button' onClick={handleEdit}>
                                                Save
                                            </button>
                                        )}
                                                  
                                    </div>
                                </>
                            )}
                            {/* Toggle  replies */}
                            {!showReplies ? (
                                <button className='view__reply' type="button" onClick={() => { setShowReplies(true); setShowReplyInput(false) }}>
                                    <TfiLayoutLineSolid size={30} />
                                    View {replies?.length || 0} reply
                                </button>
                            ) : (
                                <button className='view__reply' type='button' onClick={() => { setShowReplyInput(false); setShowReplies(false) }}>
                                    <TfiLayoutLineSolid size={30} />
                                    Hide {replies?.length || 0} reply
                                </button>
                            )}

                            {/* Reply form */}
                            {showReplyInput && (
                                <form className='reply__form'>
                                    <input type='text' value={replyText} placeholder='Add a reply' onChange={(e) => setReplyText(e.target.value)} />
                                    <button className='reply__btn' type='button' onClick={handleReply}>
                                        Reply
                                    </button>
                                </form>
                            )}

                            {/* Display replies  */}
                            {showReplies && replies?.map((reply) => (
                                <div key={reply.id} className='user__replies'>
                                    <ul>
                                        <li className='users__img'>
                                            <Link to={`/users/${reply.authorId}/show`}>
                                                <img src={reply.photoURL} alt='' />
                                            </Link>
                                        </li>

                                        <li>
                                            <p>
                                                <span className='user__name'>
                                                    <Link to={`/users/${reply.authorId}/show`}>
                                                        {currentUser.uid === reply.uid ? "You" : (reply.displayName)}
                                                      
                                                    </Link>
                                                    <span className='ml-[1rem] font-[600] text-[14px]'>
                                                        {timeDifference(new Date(), new Date(reply?.publishedAt))}
                                                    </span>
                                                </span>
                                                  
                                                <span className='comment__text'>
                                                    {reply.replyText}
                                                </span>
                                            </p>
                                    
                                            <ul className='comment__components'>
                                                
                                                {/* Toggle reply input */}
                                                <button type="button" onClick={() => { setShowReplyInput(true) }}>
                                                    Reply
                                                </button>

                                                <li>
                                                    <AiOutlineHeart className='like' style={{ fontSize: '1.2rem', cursor: 'pointer' }} />
                                                </li>

                                                {currentUser.uid === reply.authorId && (
                                                    <>
                                                        <li className='cursor-pointer dots' ><BsThreeDots style={{ fontSize: '1.8rem', cursor: 'pointer' }} onClick={checkOption1} />
                                                            
                                                            {option1 && (
                                                                <>
                                                                    <div className='option__button1'>
                                                                        <img onClick={checkOption1} src={close} alt='close' />
                                                            
                
                                                                        <button type='button' onClick={() => handleDeleteReply(reply.id)}>
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                    <div onClick={checkOption1}  className='options--overlay'></div>
                                                                </>
                                                            )}
                                                        </li>
                                                    </>
                                                )}
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            ))}
            
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Comment