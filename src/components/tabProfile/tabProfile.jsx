import { RssFeed, School } from '@material-ui/icons';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SourceRoundedIcon from '@mui/icons-material/SourceRounded';
import StarIcon from '@mui/icons-material/Star';
import './tabProfile.css';

export default function TabProfile({ content, activeTab, handleTabClick }) {


    return (
        <div className="col-md-8">
            <div className="tab-block">
                <ul className="nav nav-tabs">
                    <li className={activeTab === 'feed' ? 'active' : ''}>
                        <a href="#feed" data-toggle="feed" onClick={() => handleTabClick('feed')}>
                            <RssFeed style={{fontSize : 20}} />
                            My Feed
                        </a>
                    </li>
                    <li className={activeTab === 'friends' ? 'active' : ''}>
                        <a href="#friends" data-toggle="friends" onClick={() => handleTabClick('friends')}>
                            <PeopleOutlineIcon style={{fontSize : 20}} />
                            Friends
                        </a>
                    </li>
                    <li className={activeTab === 'projects' ? 'active' : ''}>
                        <a href="#projects" data-toggle="projects" onClick={() => handleTabClick('projects')}>
                            <SourceRoundedIcon style={{fontSize : 20}} />
                            Projects
                        </a>
                    </li>
                    <li className={activeTab === 'courses' ? 'active' : ''}>
                        <a href="#courses" data-toggle="courses" onClick={() => handleTabClick('courses')}>
                            <School style={{fontSize : 20}} />
                            Courses
                        </a>
                    </li>
                    <li className={activeTab === 'favorites' ? 'active' : ''}>
                        <a href="#favorites" data-toggle="favorites" onClick={() => handleTabClick('favorites')}>
                            <StarIcon style={{fontSize : 20}} />
                            Favorites
                        </a>
                    </li>
                </ul>
                <div className="tab-content p30">{content}</div>
            </div>
        </div>
    );
}