import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { Posts } from "../../dummyData";
import { useState } from "react";
import { getUser } from "../../utils/helper";
import { useEffect } from "react";
import request from "../../utils/request";
import { Link, useLocation } from "react-router-dom";
import LoadingIcon from '../loadingIcon/loadingIcon';

export default function Feed() {
  const API = process.env.REACT_APP_SERVER_API;
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [user] = useState(getUser());
  const path = useLocation().pathname.slice(1);

  const fetchPosts = () => {
    if (path === '') {
      try {
        request.get(`${API}/posts`).then(
          (res) => {
            setPosts(res.data);
            setLoading(false);
          },
          (error) => {
            setError(error);
            setLoading(false);
          }
        );

      } catch (error) {
        setError(true);
        setLoading(false);
      }
    } else if (path === 'Profile') {
      try {
        console.log(user?.id);
        request.get(`${API}/posts/user/${user?.id}`).then(
          (res) => {
            console.log(res)
            setPosts(res.data);
            setLoading(false);
          },
          (error) => {
            setError(error);
            setLoading(false);
          });

      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
  }
  useEffect(() => {
    fetchPosts();

    return () => {
      setPosts();
      setError();
      setLoading();
    };
  }, [path, user, API]);

  const handlePostAdded = (newPost) => {
    // Update the posts array with the new post
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share onPostAdded={handlePostAdded} />
        {loading ?
          <LoadingIcon /> :
          <>{posts?.map((p) => (
            <Link key={p.id_post} to={`/posts/${p.id_post}`} className="link-wrapper">
              <Post post={p} />
            </Link>
          ))}</>}
      </div>
    </div>
  );
}
