import { useLocation } from "react-router-dom";
import "./online.css";
import { useEffect } from "react";
import { useState } from "react";

export default function Online({ user }) {
  const path = useLocation().pathname;

  const [assetsPath, setAssetsPath] = useState('');
  useEffect(() => {
    setAssetsPath(path.includes(`posts`) ? '../' : '');
    return () => {
      setAssetsPath('');
    };
  }, [path]);
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" src={`${assetsPath}${user.profilePicture}`} alt="" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  );
}
