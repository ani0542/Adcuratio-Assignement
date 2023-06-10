import React, { useState } from 'react';

const Comment = ({ comment, onEditComment, onReplySubmit }:any) => {
  const [reply, setReply] = useState('');

  const handleReplyChange = (e:any) => {
    setReply(e.target.value);
  };

  const handleReplySubmit = (e:any) => {
    e.preventDefault();
    if (reply.trim() !== '') {
      onReplySubmit(comment.id, reply);
      setReply('');
    }
  };

  return (
    <div>
      <p>{comment.text}</p>
      <button onClick={() => onEditComment(comment.id)}>Edit</button>
      <form onSubmit={handleReplySubmit}>
        <input
          type="text"
          value={reply}
          onChange={handleReplyChange}
          placeholder="Write a reply..."
        />
        <button type="submit">Reply</button>
      </form>
      {comment.replies.map((reply:any) => (
        <div key={reply.id} style={{ marginLeft: '20px' }}>
          <p>{reply.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Comment;
