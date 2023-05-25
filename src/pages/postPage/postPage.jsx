import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import request from '../../utils/request';
import Post from '../../components/post/Post';
import './postPage.css'
import { getUser } from '../../utils/helper';

export default function ViewPostPage() {
    const { postId } = useParams();
    const API = process.env.REACT_APP_SERVER_API;
    const user = getUser();
    const [post, setPost] = useState(null);
    const [content, setContent] = useState('');
    const [comments, setComments] = useState([]);

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    useEffect(() => {
        // Fetch post and comments
        request.get(`${API}/posts/${postId}`)
            .then(({ data }) => {
                setPost(data[0]);
                setComments(data[1]);
            })
            .catch(error => {
                console.error(error);
            });
    }, [postId, API]);

    const handleAddComment = () => {
        // Send new comment to the server
        request.post(`${API}/comments/add`, {
            user_id: user.id,
            post_id: postId,
            content: content
        })
            .then(({ data }) => {
                // Add the new comment to the existing comments list
                const newComment = data[0];
                setComments(prevComments => [...prevComments, newComment]);
                setContent('');
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className='post-page'>
            {post && <Post post={post} num={comments.length} />}

            <h3>Comments</h3>
            {comments.length === 0 ? (
                <p>No comments yet.</p>
            ) : (
                <ul>
                    {comments.map(comment => (
                        <li className='comment' key={comment.id}>
                            <div className="profile-pic">
                                <img
                                    className="postProfileImg"
                                    src={`${comment.user.pdp}`}
                                    alt={`${comment.user.nom}`}
                                />
                            </div>
                            <div className="comment-info">
                                <h5>{comment.user.nom}</h5>
                                <p>{comment.content}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <div className='post-input'>
                <textarea
                    value={content}
                    onChange={handleContentChange}
                    placeholder="Add a comment..."
                />
                <button onClick={handleAddComment}>Add Comment</button>
            </div>
        </div>
    );
};
