import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import request from '../../utils/request';
import Post from '../../components/post/Post';
import './postPage.css'

export default function ViewPostPage() {
    const { postId } = useParams();
    const API = process.env.REACT_APP_SERVER_API;
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        // Fetch post and comments
        request.get(`${API}/posts/${postId}`)
            .then(response => {
                const data = response.data;
                return data;
            }).then(data => {
                setPost(data[0])
                setComments(data[1]);
            }
            )
            .catch(error => {
                console.error(error);
            });
    }, [postId, API]);
    const handleAddComment = () => {
        // // Send new comment to the server
        // request.post(`/api/comments`, {
        //     post_id: postId,
        //     content: newComment
        // })
        //     .then(response => {
        //         // Add the new comment to the existing comments list
        //         const newComment = response.data;
        //         setComments(prevComments => [...prevComments, newComment]);
        //         setNewComment('');
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });
    };

    return (
        <div className='post-page'>
            {post && <Post post={post} />}

            <h3>Comments</h3>
            {comments?.length === 0 ? (
                <p>No comments yet.</p>
            ) : (
                <ul>
                    {comments?.map(comment => (
                        <li key={comment.id}>
                            <p>{comment.content}</p>
                        </li>
                    ))}
                </ul>
            )}

            <div>
                <textarea
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                />
                <button onClick={handleAddComment}>Add Comment</button>
            </div>
        </div>
    );
};
