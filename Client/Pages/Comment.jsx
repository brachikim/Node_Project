import { useNavigate } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { userContext } from '../components/App';
import { commmentContext } from './Comments';
import '../css/Post.css';

function Comment() {
    const { updateComment, setUpdateModalOpen, comments, setComments } = useContext(commmentContext);
    const { user } = useContext(userContext);
    const navigate = useNavigate();
    const [updateCommentData, setUpdateCommentData] = useState({ postId: updateComment.postId, id: updateComment.id, name: updateComment.name, email: updateComment.email, body: updateComment.body });

    const handleInputCommentChange = (e) => {
        const { name, value } = e.target;
        setUpdateCommentData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleCancelUpdate = () => {
        setUpdateModalOpen(false);
    };


    const handleSaveUpdate = () => {
        fetch(`http://localhost:3000/comments/${updateCommentData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateCommentData),
        })
            .then(response => {
                if (response.ok) {
                    const updatedComments = comments.map(comment => {
                        return comment.id === updateCommentData.id ? updateCommentData : comment;
                    });
                    setComments(updatedComments);
                    setUpdateModalOpen(false);
                    navigate(`/home/users/${user.id}/posts/${updateCommentData.postId}/comments`);
                } else {
                    console.error('Error updating comment:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error updating comment:', error.message);
            });
    };



    return (
        <div className='update-comment-modal'>
            <div className='modal-content'>
                <div className='comment-label'>
                    <label > <strong>Post id:</strong> {updateCommentData.postId}</label>
                    <br />
                    <label ><strong>Id:</strong> {updateCommentData.id}</label>
                    <br />
                    <label ><strong>Email:</strong> {updateCommentData.email}</label>
                    <br />
                    <label ><strong>Name:</strong>
                        <input type="text" name="name" value={updateCommentData.name} onChange={handleInputCommentChange} />
                    </label>
                    <br />
                    <textarea
                        name="body"
                        value={updateCommentData.body}
                        onChange={handleInputCommentChange}
                        rows={6}
                        cols={60}
                    />
                </div>
                <br />
                <div >
                    <button className='button-comment' onClick={handleSaveUpdate}>Save Comment</button>
                    <button className='button-comment' onClick={handleCancelUpdate}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default Comment