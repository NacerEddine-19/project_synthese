import "./profile.css";
import { useState } from "react";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import TabProfile from "../../components/tabProfile/tabProfile";
import FriendsTable from "../../components/friendList/FriendList";
import Courses from "../../components/courses/courses";
// import Projects from "../projects/projects";
import { useLocation } from "react-router-dom";
import { getUser } from "../../utils/helper";

export default function Profile() {
  const locat = useLocation().hash.slice(1);
  const [activeTab, setActiveTab] = useState(locat ? locat : 'feed');
  const [user] = useState(getUser());

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
                src={`${user?.pdc}`}
                alt=""
              />
              <img
                className="profileUserImg"
                src={`${user?.pdp}`}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{`${user?.nom}`} {`${user?.prenom}`}</h4>
              <span className="profileInfoDesc">{`${user?.bio}`}</span>
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
