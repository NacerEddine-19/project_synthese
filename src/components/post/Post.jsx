import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { Users } from "../../dummyData";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Post({ post }) {
  const [like, setLike] = useState(post.like)
  const [isLiked, setIsLiked] = useState(false)
  const [assetsPath, setAssetsPath] = useState('assets/');
  const path = useLocation().pathname;

  useEffect(() => {
    if (path === `/posts/${post.id_post}`) {
      setAssetsPath('../assets/')
    } else {
      setAssetsPath('assets/')
    }
    return () => {
      setAssetsPath()
    };
  }, [path]);
  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1)
    setIsLiked(!isLiked)
  }
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={`${Users.filter((u) => u.id === post?.user_id)[0].profilePicture}`}
              alt=""
            />
            <span className="postUsername">
              {Users.filter((u) => u.id === post?.user_id)[0].username}
            </span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter" style={{ display: path === '/Profile' ? 'flex' : 'block', flexDirection: 'column' }}>
          <span className="postText">{post?.post_desc}</span>
          {post.file && (<img className="postImg" src={`${assetsPath}post/${post.file}`} alt={post.desc} />)}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={`${assetsPath}like.png`} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={`${assetsPath}heart.png`} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
