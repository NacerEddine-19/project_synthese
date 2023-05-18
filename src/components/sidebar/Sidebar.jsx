import "./sidebar.css";
import {
  RssFeed,
  Chat,
  Group,
  Bookmark,
  Event,
  School,
} from "@material-ui/icons";
import SourceRoundedIcon from '@mui/icons-material/SourceRounded';
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import Socials from "../socials/socials";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const pathname = window.location.pathname;
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Link to={`/`}>
              <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">Feed</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <Link to={`/projects`}>
              <SourceRoundedIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Projects</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link to={`/courses`}>
              <School className="sidebarIcon" />
              <span className="sidebarListItemText">Courses</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Group</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <Link to={`/events`}>
              <Event className="sidebarIcon" />
              <span className="sidebarListItemText">Events</span>
            </Link>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        {pathname === '/Profile' ? (< Socials />) : ''}
        <hr className="sidebarHr" />
        {pathname !== '/Profile' ? <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul> : ''}
      </div>
    </div>
  );
}
