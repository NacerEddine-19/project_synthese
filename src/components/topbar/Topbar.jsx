import "./topbar.css";
import DropdownNotif from "../notification/Notification";
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
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <DropdownNotif item={<Notifications />} />
            <span className="topbarIconBadge">1</span>
          </div>
          <Link to={`/Profile`}><img src="/assets/person/1.jpeg" alt="" className="topbarImg" /></Link>
        </div>
      </div>
    </div>
  );
}
