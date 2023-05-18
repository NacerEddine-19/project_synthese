import "./profile.css";
import { useState } from "react";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import TabProfile from "../../components/tabProfile/tabProfile";
import FriendsTable from "../../components/friendList/FriendList";
import Courses from "../../components/courses/courses";
// import Projects from "../projects/projects";
import { useLocation } from "react-router-dom";

export default function Profile() {
  const locat = useLocation().hash.slice(1);
  const [activeTab, setActiveTab] = useState(locat ? locat : 'feed');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="profile">
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="assets/post/3.jpeg"
                alt=""
              />
              <img
                className="profileUserImg"
                src="assets/person/7.jpeg"
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">Safak Kocaoglu</h4>
              <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <TabProfile content={
              <>
                {activeTab === 'feed' && <Feed />}
                {activeTab === 'friends' && <FriendsTable />}
                {activeTab === 'courses' && <Courses />}
                {/* {activeTab === 'projects' && <Projects />} */}
                {/* {activeTab === 'favorites' && <Favorites />} */}
              </>
            }
              activeTab={activeTab}
              handleTabClick={handleTabClick}
            />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  );
}
