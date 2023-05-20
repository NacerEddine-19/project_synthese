import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { Posts } from "../../dummyData";
import { useState } from "react";
import {getUser} from "../../utils/helper";
import { useEffect } from "react";
import request from "../../utils/request";
import { useLocation } from "react-router-dom";

export default function Feed() {
  const SERVER = process.env.REACT_APP_SERVER_API;
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [user] = useState(getUser());
  const path = useLocation().pathname.slice(1);

  useEffect(() => {
    if (path === '') {
      try {
        request.get(`${SERVER}/posts`).then(
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
        request.get(`${SERVER}/posts/user/${user?.id}`).then(
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

    return () => {
      setPosts();
      setError();
      setLoading();
    };
  }, [path, user, SERVER]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts?.map((p) => (
          <Post key={p.id_post} post={p} />
        ))}
      </div>
    </div>
  );
}
