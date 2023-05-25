import { useEffect, useState } from "react";
import "./closeFriend.css";
import { useLocation } from "react-router-dom";

export default function CloseFriend({ user }) {

  const path = useLocation().pathname;

  const [assetsPath, setAssetsPath] = useState('');
  useEffect(() => {
    setAssetsPath(path.includes(`posts`) ? '../' : '');
    return () => {
      setAssetsPath('');
    };
  }, [path]);
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={`${assetsPath}${user.profilePicture}`} alt="" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}
