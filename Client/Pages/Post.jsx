import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { userContext } from '../components/App';
import '../css/Post.css';


function Post() {
  const [post, setPost] = useState([]);
  const [formData, setFormData] = useState({ userId: '', id: '', title: '', body: '' });
  const [showComments, setShowComments] = useState(false);
  const { user } = useContext(userContext);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${params.postId}`)
      .then(res => res.json())
      .then(data => setPost(data))
  }, [params.id]);

  //זה מה שגורם לכך שעל המסך יוצגו הפרטים של מי/ה שלחצתי
  useEffect(() => {
    if (post) {
      setFormData({
        userId: user.id,
        id: post.id,
        title: post.title,
        body: post.body
      });
    }
  }, [post]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleDeletePost = () => {
    fetch(`http://localhost:3000/posts/${params.postId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          navigate(`/home/users/${user.id}/posts`);
        } else {
          console.error('Error deleting post:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error deleting post:', error.message);
      });
  };

  const handleUpdatePost = () => {
    fetch(`http://localhost:3000/posts/${params.postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...post,
        ...formData,
      }),
    })
      .then(response => {
        if (response.ok) {
          navigate(`/home/users/${user.id}/posts`);
        } else {
          console.error('Error updating post:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error updating post:', error.message);
      });
  };

  const handleCommentsPost = () => {
    setShowComments(true);
    navigate(`/home/users/${user.id}/posts/${params.postId}/comments`);
  }



  return (
    <>
      {post ? (
        <>
          <div className="post-detail-container">
            <div className="post-detail">
              <label className='post-id'>User id:</label>
              <label className='post-id-data'> {formData.userId}</label>
              <br />
              <label className='post-id'>Id:</label>
              <label className='post-id-data'> {formData.id}</label>
              <br />
              <label className='label-post'>
                Title:
              </label>
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} />

              <br />
              <label className='label-post'>
                Body:
              </label>
              <textarea name="body" value={formData.body} onChange={handleInputChange} rows={6} cols={51} />

              <br />
              <div className='post-div'>
                <button className='post-button' onClick={handleUpdatePost}>Update</button>
                <button className='post-button' onClick={handleDeletePost}>Delete</button>
              </div>
              <button className='comments-button' onClick={handleCommentsPost}>Comments</button>
            </div>
          </div>
          {showComments && <Outlet />}

        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  )
}

export default Post