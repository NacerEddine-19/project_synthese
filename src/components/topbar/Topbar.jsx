import "./topbar.css";
import MyDropdown from "../notification/Notification";
import ThemeSwitch from "../theme_switch/themeSwitch";
import {
  Search,
  Person,
  Chat,
  Notifications,
  HomeRounded,
  School
} from "@material-ui/icons";
import SourceRoundedIcon from '@mui/icons-material/SourceRounded';
import { Link } from "react-router-dom";

const notification = [
  'Action',
  'Another action',
  'Something else here'
];

export default function Topbar() {
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
            <MyDropdown item={<Person />} notif={notification} />
            <span className="topbarIconBadge">{notification.length}</span>
          </div>
          <div className="topbarIconItem">
            <MyDropdown item={<Chat />} notif={notification} />
            <span className="topbarIconBadge">{notification.length}</span>
          </div>
          <div className="topbarIconItem">
            <MyDropdown item={<Notifications />} notif={notification} />
            <span className="topbarIconBadge">{notification.length}</span>
          </div>
        </div>
        <Link to={`/Profile`}><img src="/assets/person/1.jpeg" alt="" className="topbarImg" /></Link>
        <ThemeSwitch />
      </div>
    </div>
  );
}
