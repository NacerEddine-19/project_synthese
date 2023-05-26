import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import MyDropdown from "../notification/Notification";
import { getUser } from "../../utils/helper";

export default function Post({ post, userP, num, onPostDeleted }) {
  const [connectedUser] = useState(getUser());
  const [user] = useState(post.user);
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);
  const [assetsPath, setAssetsPath] = useState('assets/');
  const path = useLocation().pathname;
  const postOptions = [
    'edit',
    'delete',
    'report'
  ];

  useEffect(() => {
    setAssetsPath(path === `/posts/${post?.id_post}` ? '../assets/' : 'assets/');
    return () => {
      setAssetsPath('');
    };
  }, [path, post?.id_post]);

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={userP ? userP?.pdp : user?.pdp}
              alt=""
            />
            <span className="postUsername">
              {userP ? userP.nom : user?.nom}
            </span>
            <span className="postDate">{post?.date}</span>
          </div>
          <div className="postTopRight">
            <MyDropdown icon={<MoreVert />} onPostDeleted={onPostDeleted} notif={postOptions} post={post} user={user} connectedUser={connectedUser} />
          </div>
        </div>
        <Link to={`/posts/${post?.id_post}`} className="link-wrapper">
          <div className="postCenter" style={{ display: path === '/Profile' ? 'flex' : 'block', flexDirection: 'column' }}>
            <span className="postText">{post?.post_desc}</span>
            {post.file && <img className="postImg" src={`${assetsPath}post/${post?.file}`} alt={post?.desc} />}
          </div>
        </Link>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={`${assetsPath}like.png`} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={`${assetsPath}heart.png`} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText"><h6 style={{ display: "inline" }}>{num}</h6> comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
