import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import request from "../../utils/request";
import Post from "../post/Post";
import Share from "../share/Share";
import LoadingIcon from "../loadingIcon/loadingIcon";
import { getUser } from "../../utils/helper";
import "./feed.css";

export default function Feed({ userP, group }) {
  const API = process.env.REACT_APP_SERVER_API;
  const user = getUser();
  const path = useLocation().pathname.slice(1) || '/';
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [offset, setOffset] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [total, setTotal] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [groupName, setGroupName] = useState('');

  const fetchPosts = useCallback(async () => {
    try {
      let res;
      if (path === "/") {
        res = await request.get(`${API}/posts`, {
          params: {
            limit: 5,
            offset: offset,
          },
        });
      } else if (path === "Profile") {
        res = await request.get(`${API}/posts/user/${user?.id}`, {
          params: {
            limit: 5,
            offset: offset,
          },
        });
      } else if (path === "Group") {
        res = await request.get(`${API}/posts/group/${user?.group}`, {
          params: {
            limit: 5,
            offset: offset,
          },
        });
      }
      const { posts, total } = res?.data;
      console.log(res);
      setPosts((prev) => [...prev, ...posts]);
      setTotal(total);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  }, [path, API, offset, user?.id, user?.group]);

  useEffect(() => {
    if (posts?.length >= total && posts?.length !== 0) {
      setIsEnd(true);
    } else {
      setIsEnd(false);
    }
  }, [posts?.length, total]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const currentHeight = scrollTop + clientHeight;
      if (!isFetching && currentHeight + 1 >= scrollHeight && !isEnd) {
        setIsFetching(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFetching, isEnd]);

  useEffect(() => {
    if (isFetching) {
      setOffset((prev) => prev + 5);
    }
  }, [isFetching]);

  useEffect(() => {
    console.log(group);
    if (group) {
      request.get(`${API}/groups/${user?.group}`)
        .then(({ data }) => {
          console.log(data);
          setGroupName(data.name)
        });
    }
    return () => {
      setGroupName('')
    };
  }, [user?.group, group, API]);

  useEffect(() => {
    setLoading(true);
    fetchPosts();
  }, [path, API, offset, fetchPosts]);

  const handlePostAdded = (newPost) => {
    console.log(newPost);
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handlePostDeleted = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post?.id_post !== postId));
  };

  return (
    <div className="feed">
      {group && <h1 style={{ textAlign: 'center' }}>Group : {groupName}</h1>}
      {error ? error : ''}
      <div className="feedWrapper">
        <Share onPostAdded={handlePostAdded} />
        {loading && !isFetching ? (
          <LoadingIcon />
        ) : (
          posts?.map((p, idx) => (
            <Post
              key={idx}
              num={p?.comments?.length}
              userP={userP}
              post={p}
              onPostDeleted={handlePostDeleted}
              group={group}
            />
          ))
        )}
        {isFetching ? (
          <LoadingIcon />
        ) : isEnd ? (
          <div>Feeling inspired? Create your own post!</div>
        ) : ''}
      </div>
    </div>
  );
}
