import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import request from "../../utils/request";
import Post from "../post/Post";
import Share from "../share/Share";
import LoadingIcon from "../loadingIcon/loadingIcon";
import { getUser } from "../../utils/helper";
import "./feed.css";

export default function Feed({ userP }) {
  const API = process.env.REACT_APP_SERVER_API;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const user = getUser();
  const path = useLocation().pathname.slice(1);

  const fetchPosts = async () => {
    try {
      let res;
      if (path === "") {
        res = await request.get(`${API}/posts`);
      } else if (path === "Profile") {
        res = await request.get(`${API}/posts/user/${user?.id}`);
      }
      setPosts(res.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [path, API]);

  const handlePostAdded = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handlePostDeleted = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id_post !== postId));
  };

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share onPostAdded={handlePostAdded} />
        {loading ? (
          <LoadingIcon />
        ) : (
          posts?.map((p) => (
            <Post
              key={p.id_post}
              num={p?.comments?.length}
              userP={userP}
              post={p}
              onPostDeleted={handlePostDeleted}
            />
          ))
        )}
      </div>
    </div>
  );
}
