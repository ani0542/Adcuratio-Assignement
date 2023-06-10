import React, { useState } from 'react';
import Comment from './Comment';

const CommentBox = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleCommentChange = (e:any) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e:any) => {
    e.preventDefault();
    if (comment.trim() !== '') {
      const newComment = {
        id: Date.now(),
        text: comment,
        replies: [],
      };
      setComments((prevComments):any => [...prevComments, newComment]);
      setComment('');
    }
  };

  const handleReplySubmit = (commentId:any, replyText:any) => {
    const newReply = {
      id: Date.now(),
      text: replyText,
    };
    setComments((prevComments):any =>
      prevComments.map((c:any) => {
        if (c.id === commentId) {
          return {
            ...c,
            replies: [...c.replies, newReply],
          };
        }
        return c;
      })
    );
  };

  const handleEditComment = (commentId:any) => {
    const editedText = prompt('Edit your comment:', getCommentText(commentId));
    if (editedText !== null) {
      setComments((prevComments):any =>
        prevComments.map((c:any) => {
          if (c.id === commentId) {
            return {
              ...c,
              text: editedText,
            };
          }
          return c;
        })
      );
    }
  };

  const getCommentText = (commentId:any) => {
    const comment:any = comments.find((c:any) => c.id === commentId);
    return comment ? comment.text : '';
  };

  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Write a comment..."
          rows={4}
          cols={50}
        />
        <br />
        <button type="submit">Post Comment</button>
      </form>
      <br />
      <div>
        {comments.map((comment:any) => (
          <Comment
            key={comment.id}
            comment={comment}
            onEditComment={handleEditComment}
            onReplySubmit={handleReplySubmit}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentBox;
