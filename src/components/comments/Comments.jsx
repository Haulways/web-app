import React, {  useContext, useEffect, useState } from 'react';
import './comment.css';
import { v4 as uuidv4 } from "uuid";
import Comment from './Comment';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import close from "../../assets/closeIcon.png";
import { supabase } from '../../supabase/SupabaseConfig';
import useSupabaseRealtime from '../../supabase/realTime';


const Comments = ({ setShowComment, showComment, postId, comments, setComments }) => {

  const { currentUser } = useContext(AuthContext)
  const [newCommentText, setNewCommentText] = useState('');
  const [editModeCommentId, setEditModeCommentId] = useState('');


  // toggle comment section on mobile view 
  const revealComment = () => {
    setShowComment(!showComment);
  }

  
  
 
  useEffect(() => {
 

    const commentsSubscription = supabase
      .channel('room1')
      .on('postgres_changes', { event: '*', schema: '*', table: 'comments', filter: `postId=eq.${postId}` }, payload => {
        console.log('Change received!', payload);
        // If new comment is added
        if (payload.new) {
          setComments(prevComments => {
            if (!prevComments.some(comment => comment.id === payload.new.id)) {
              return [...prevComments, payload.new];
            } else {
              return prevComments;
            }
          });
        }
        // If comment is removed
        else if (payload.old) {
          setComments(prevComments => prevComments.filter(comment => comment.id !== payload.old.id));
        }
      })
      .subscribe();

    // ... rest of your code
    return () => {
      supabase.removeChannel(commentsSubscription);
    }

  }, [comments]);

      
  



  const uuid = uuidv4();
  
  // upload the comments to the database 
  const handleAddComment = async () => {
    if (newCommentText.trim() !== '') {
      const newComment = {
        id: uuid,
        postId: postId,
        uid: currentUser.uid,
        authorId: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        commentText: newCommentText,
        publishedAt: new Date(),
      };

      try {
        await supabase.from('comments').insert([newComment]);
        setNewCommentText('');
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  // handle the edit comment functionality 
  const handleEditComment = async (commentId, updatedText) => {
    try {
      await supabase.from('comments').update({ commentText: updatedText }).eq('id', commentId);
      setEditModeCommentId('');
    } catch (error) {
      toast.error(error.message);
    }
  };


  // handle delete functionality of comments 
  const handleDeleteComment = async (commentId) => {
    try {
      await supabase.from('comments').delete().eq('id', commentId);
    } catch (error) {
      toast.error(error.message);
    }
  }

 


  return (
    <>
      {/* desktop comments  */}
      <div className='desktop__comments'>
        <>
          <div className='comment__box'>
            <textarea type="text" placeholder="Add a comment" className="commentInput" rows={1} style={{ resize: "none" }} value={newCommentText} onChange={(e) => setNewCommentText(e.target.value)} />

            <button onClick={handleAddComment}>Post</button>
          </div>

          <div className='comment__hr'></div>
          <div className='desktop__comment__box'>
            {comments && comments?.sort((a, b) => b.publishedAt - a.publishedAt).map((comment) =>
              <Comment key={comment?.id} comment={comment} postId={postId} editMode={editModeCommentId === comment?.id} handleEditComment={handleEditComment} handleDeleteComment={handleDeleteComment} />
            )}
          </div>
        </>
      </div>

      {/* mobile comments  */}
      <div className='mobile__comments'>
        <div className='mobile__comment__divider' >
          <p>{comments?.length || 0}  Comments</p>
          
        </div>
        <>
          {comments && comments?.sort((a, b) => b.publishedAt - a.publishedAt).map((comment) =>
            <Comment setShowComment={setShowComment} showComment={showComment} key={comment?.id} comment={comment} postId={postId} editMode={editModeCommentId === comment?.id} handleEditComment={handleEditComment} handleDeleteComment={handleDeleteComment} />
          )}
          <div className='comment__box'>
            <textarea type="text" placeholder="Add a comment" className="commentInput" rows={1} style={{ resize: "none" }} value={newCommentText} onChange={(e) => setNewCommentText(e.target.value)} />
            <button onClick={handleAddComment}>Post</button>
          </div>
        </>
      </div>
    </>
  )
};

export default Comments