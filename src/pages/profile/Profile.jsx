import "./profile.css";
import { useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import TabProfile from "../../components/tabProfile/tabProfile";
import FriendsTable from "../../components/friendList/FriendList";
import Courses from "../../components/courses/courses";
import getUser from "../../utils/helper";
import Projects from "../projects/projects";

export default function Profile() {
  const [activeTab, setActiveTab] = useState('feed');
  const user = getUser();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
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
