import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { getUser } from "../../utils/helper";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Rightbar({ profile }) {
  const [user] = useState(getUser());
  const path = useLocation().pathname;

  const [assetsPath, setAssetsPath] = useState('');
  useEffect(() => {
    setAssetsPath(path.includes(`posts`) ? '../' : '');
    return () => {
      setAssetsPath('');
    };
  }, [path]);
  const HomeRightbar = () => {
    return (
      <>
        <div className="events-bar">
          <div className="event-card">
            <img className="event-img" src={`${assetsPath}assets/ofppt e.png`} alt="event" />
            <span className="eventText">
              <b>Mercredi 26 avril 2023</b> Forum International de l'Etudiant - Casablanca
            </span>
          </div>
          <div className="event-card">
            <img className="event-img" src={`${assetsPath}assets/ofppt e.png`} alt="event" />
            <span className="eventText">
              <b>Mercredi 26 avril 2023</b> Forum International de l'Etudiant - Casablanca
            </span>
          </div>
          <div className="event-card">
            <img className="event-img" src={`${assetsPath}assets/ofppt e.png`} alt="event" />
            <span className="eventText">
              <b>Mercredi 26 avril 2023</b> Forum International de l'Etudiant - Casablanca
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{`${user?.city}`}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">School:</span>
            <span className="rightbarInfoValue">{`${user?.school}`}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src="assets/person/1.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/2.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/3.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/4.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/5.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="assets/person/6.jpeg"
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">John Carter</span>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
