import "./topbar.css";
import MyDropdown from "../notification/Notification";
import ThemeSwitch from "../theme_switch/themeSwitch";
import {
  Search,
  Person,
  Chat,
  Notifications,
  HomeRounded,
  School,
} from "@material-ui/icons";
import SourceRoundedIcon from '@mui/icons-material/SourceRounded';
import { Link } from "react-router-dom";
import { useState } from "react";
import { getUser } from "../../utils/helper";

const notification = [
  'Action',
  'Another action',
  'Something else'
];

const inviteNotif=[
  'Ryad a envoyer un invitation',
  'Imran a envoyer un invitation',
  'Anass a envoyer un invitation',
];

const userProfileNotif = [
  'Profile',
  'Settings',
  'Language',
  'Log out'
];

export default function Topbar() {
  const [user] = useState(getUser());
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo"><Link to={`/`}><img src="/assets/ofppt-logo/png/logo-no-background.png" alt="logo" className="logo-img" /></Link></span>
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarCenter">
        <span className="topbarLink"><Link to={`/`}>
          <HomeRounded />
        </Link></span>
        <span className="topbarLink"><Link to={`/Projects`}>
          <SourceRoundedIcon />
        </Link></span>
        <span className="topbarLink"><Link to={`/Courses`}>
          <School />
        </Link></span>

      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <MyDropdown icon={<Person />} notif={inviteNotif} invite />
            <span className="topbarIconBadge">{notification.length}</span>
          </div>
          <div className="topbarIconItem">
            <MyDropdown icon={<Chat />} notif={notification} />
            <span className="topbarIconBadge">{notification.length}</span>
          </div>
          <div className="topbarIconItem">
            <MyDropdown icon={<Notifications />} notif={notification} />
            <span className="topbarIconBadge">{notification.length}</span>
          </div>
        </div>
        <MyDropdown icon={<img src={`${user?.pdp}`} alt={`${user.nom}`} className="topbarImg" />} notif={userProfileNotif} />
        <ThemeSwitch />
      </div>
    </div>
  );
}
