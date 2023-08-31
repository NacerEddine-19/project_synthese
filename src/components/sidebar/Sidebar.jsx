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
import SettingsIcon from '@mui/icons-material/Settings';
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import ShieldIcon from '@mui/icons-material/Shield';
import Socials from "../socials/socials";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const pathname = window.location.pathname;
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        {pathname.includes('/Profile') && pathname.includes('/edit') ? (
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <Link to={`/Profile/edit?tab=general`}>
                <SettingsIcon className="sidebarIcon" />
                <span className="sidebarListItemText">generale</span>
              </Link>
            </li>
            <li className="sidebarListItem">
              <Link to={`/Profile/edit?tab=socials`}>
                <Chat className="sidebarIcon" />
                <span className="sidebarListItemText">socials</span>
              </Link>
            </li>
            <li className="sidebarListItem">
              <Link to={`/Profile/edit?tab=security`}>
                <ShieldIcon className="sidebarIcon" />
                <span className="sidebarListItemText">security</span>
              </Link>
            </li>

          </ul>
        ) : <ul className="sidebarList">
          <li className="sidebarListItem">
            <Link to={`/`}>
              <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">Feed</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link to={`/Chats`}>
              <Chat className="sidebarIcon" />
              <span className="sidebarListItemText">Chats</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link to={`/Projects`}>
              <SourceRoundedIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Projects</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link to={`/Courses`}>
              <School className="sidebarIcon" />
              <span className="sidebarListItemText">Courses</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link to={`/Group`}>
              <Group className="sidebarIcon" />
              <span className="sidebarListItemText">Group</span>
            </Link>
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
        }
        <button className="sidebarButton">Show More</button>
        {pathname.includes('/Profile') && !pathname.includes('/edit') ? (< Socials />) : ''}
        <hr className="sidebarHr" />
        {!pathname.includes('/Profile') ? <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul> : ''}
      </div>
    </div>
  );
}
