import "./post.css";
import { Favorite, FavoriteBorderRounded, MoreVert } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import MyDropdown from "../notification/Notification";
import { getUser } from "../../utils/helper";
import request from "../../utils/request";

export default function Post({ post, userP, num, onPostDeleted }) {
  const [connectedUser] = useState(getUser());
  const [user, setUser] = useState(post?.user);
  const [like, setLike] = useState(post?.likes);
  const [isLiked, setIsLiked] = useState(false);
  const path = useLocation().pathname;
  const API = process.env.REACT_APP_SERVER_API
  const date = post?.created_at.slice(0, 10);
  const time = post?.created_at.slice(11, -11);
  const postOptions = [
    'edit',
    'delete',
    'report'
  ];
  useEffect(() => {
    setUser(post?.user);
  }, [post]);

  const likeHandler = async () => {

    try {
      if (isLiked) {
        // Remove like
        console.log('unlike');
        await request.post(`${API}/posts/${post?.id_post}/unlike`);
        setLike((prevLike) => prevLike - 1);
      } else {
        // Add like
        console.log('like');
        await request.post(`${API}/posts/${post?.id_post}/like`);
        setLike((prevLike) => prevLike + 1);
      }

      setIsLiked(!isLiked);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {post && <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <img
                loading="lazy"
                className="postProfileImg"
                src={userP ? userP?.pdp : user?.pdp}
                alt={`${user?.nom} ${user?.prenom}`}
              />
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span className="postUsername">
                  {userP ? userP.nom : user?.nom} {userP ? userP?.prenom : user?.prenom}
                </span>
                <span className="postDate"><div>{date}</div><div>{time}</div></span>
              </div>
            </div>
            <div className="postTopRight">
              <MyDropdown icon={<MoreVert />} isReported={post?.is_reported} onPostDeleted={onPostDeleted} notif={postOptions} post={post} user={user} connectedUser={connectedUser} />
            </div>
          </div>
          <Link to={`/posts/${post?.id_post}`} className="link-wrapper">
            <div className="postCenter" style={{ display: path === '/Profile' ? 'flex' : 'block', flexDirection: 'column' }}>
              <span className="postText">{post?.post_desc}</span>
              {post?.file && <img className="postImg" src={`${post?.file}`} alt={post?.desc} />}
            </div>
          </Link>
          <div className="postBottom">
            <div className="postBottomLeft">
              {isLiked ? (
                <Favorite style={{ color: 'red' }} className="likeIcon" onClick={likeHandler} />
              ) : (
                <FavoriteBorderRounded className="likeIcon" onClick={likeHandler} />
              )}
              <span className="postLikeCounter">
                {like === 0
                  ? 'No likes yet'
                  : `${like} ${like === 1 ? 'person' : 'people'} like it`}
              </span>
            </div>
            <div className="postBottomRight">
              <span className="postCommentText"><h6 style={{ display: "inline" }}>{num}</h6> comments</span>
            </div>
          </div>
        </div>
      </div>
      }
    </>
  );
}
