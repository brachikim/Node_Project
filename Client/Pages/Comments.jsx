import { useParams, useNavigate, Outlet } from 'react-router-dom';
import React, { useEffect, useState, useContext, createContext } from 'react';
import { userContext } from '../components/App';
import '../css/Post.css';

export const commmentContext = createContext();

function Comments() {
  const params = useParams();
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [newCommentData, setNewCommentData] = useState({ postId: '', id: '', name: '', email: '', body: '' });
  const [updateComment, setUpdateComment] = useState({ postId: '', id: '', name: '', email: '', body: '' });
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/comments?postId=${params.postId}`)
      .then(res => res.json())
      .then(comments => setComments(comments))
      .catch(error => console.error('Error fetching comments:', error));
  }, [params.id]);

  const handleInputCommentChange = (e) => {
    const { name, value } = e.target;
    setNewCommentData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddComment = () => {
    fetch('http://localhost:3000/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postId: params.postId,
        id: '',
        name: newCommentData.name,
        email: newCommentData.email,
        body: newCommentData.body
      }),
    })
      .then(response => response.json())
      .then(newComment => {
        setComments([...comments, newComment]);
        setNewCommentData({ postId: '', id: '', name: '', email: '', body: '' });
      })
      .catch(error => console.error('Error adding comment:', error));
  }

  const handleUpdateComment = (comment) => {
    setUpdateComment(comment);
    setUpdateModalOpen(true);
    navigate(`/home/users/${user.id}/posts/${params.postId}/comments/${comment.id}`);
  };

  const handleDeleteComment = (commentId) => {
    fetch(`http://localhost:3000/comments/${commentId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          const updatedComments = comments.filter(comment => comment.id !== commentId);
          setComments(updatedComments);
        } else {
          console.error('Error deleting comment:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error deleting comment:', error.message);
      });
  };

  return (
    <div className='form-comment' >
      <input className='input-comment' placeholder='Email' type="email" name="email" value={newCommentData.email} onChange={handleInputCommentChange} />
      <input className='input-comment' placeholder='Name' type="text" name="name" value={newCommentData.name} onChange={handleInputCommentChange} />
      <textarea name="body" placeholder='Comment' value={newCommentData.body} onChange={handleInputCommentChange} rows={6} cols={75} />
      <br />
      <button className='button-comment' onClick={handleAddComment}>Send</button>
      <br />
      <div className='comments-section'>
        <ul>
          {comments.map(comment => (
            <li key={comment.id} className='comment-container' style={{ border: `1px solid ${comment.email === user.email ? 'rgb(29, 207, 148)' : 'lightgray'}` }}>
              <div className='comment-header' style={{ backgroundColor: comment.email === user.email ? ' rgb(29, 207, 148)' : 'rgb(127, 205, 179)', alignSelf: comment.email === user.email ? 'flex-end' : 'flex-start' }}>
                {comment.email}
              </div>
              <div className='comment-body'>
                <strong>{comment.name}</strong>
                <br />
                {comment.body}
              </div>
              {comment.email === user.email && (
                <div className='comment-actions'>
                  <button className='comment-action' onClick={() => handleUpdateComment(comment)}>Update</button>
                  <button className='comment-action' onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                </div>
              )}
            </li>

          ))}

          {isUpdateModalOpen &&
            <commmentContext.Provider value={{ updateComment, setUpdateModalOpen, comments, setComments }}>
              <Outlet />
            </commmentContext.Provider>

          }
        </ul>
      </div>
    </div>
  )
}

export default Comments