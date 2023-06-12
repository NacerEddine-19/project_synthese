import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { getUser } from "../../utils/helper";
import { useState } from "react";
import events from "../../event.json";

export default function Rightbar({ profile }) {
  const [user] = useState(getUser());
  const HomeRightbar = () => {
    return (
      <>
        <div className="events-bar">

          {events.events.map((event, index) => {
            if (event.categorie === 'Marrakech') {
              if (index < 3) {
                return (
                  <div key={index} className="event-card">
                    <img className="event-img" src={'../' + event.img} alt="event" />
                    <span className="eventText">
                      <b>{event.date}</b> {event.title}
                    </span>
                  </div>
                )
              }
              return null;
            }
            return null;
          })}
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
        <h4 className="rightbarTitle">User Top friends</h4>
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
