import './tabProfile.css';

export default function TabProfile({ content, activeTab, handleTabClick }) {


    return (
        <div className="col-md-8">
            <div className="tab-block">
                <ul className="nav nav-tabs">
                    <li className={activeTab === 'feed' ? 'active' : ''}>
                        <a href="#feed" data-toggle="feed" onClick={() => handleTabClick('feed')}>
                            Feed
                        </a>
                    </li>
                    <li className={activeTab === 'friends' ? 'active' : ''}>
                        <a href="#friends" data-toggle="friends" onClick={() => handleTabClick('friends')}>
                            Friends
                        </a>
                    </li>
                    <li className={activeTab === 'projects' ? 'active' : ''}>
                        <a href="#projects" data-toggle="projects" onClick={() => handleTabClick('projects')}>
                            Projects
                        </a>
                    </li>
                    <li className={activeTab === 'corses' ? 'active' : ''}>
                        <a href="#corses" data-toggle="corses" onClick={() => handleTabClick('corses')}>
                            Courses
                        </a>
                    </li>
                    <li className={activeTab === 'favorites' ? 'active' : ''}>
                        <a href="#favorites" data-toggle="favorites" onClick={() => handleTabClick('favorites')}>
                            Favorites
                        </a>
                    </li>
                </ul>
                <div className="tab-content p30">{content}</div>
            </div>
        </div>
    );
}