import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sideBar.css';
import { getUser } from '../../../utils/helper';

export default function AdminSideBar() {
    const path = useLocation().pathname;
    const [user] = useState(getUser());
    useEffect(() => {
        const visitedLinks = document.querySelectorAll('.main-menu a');
        visitedLinks.forEach((link) => {
            if (link.pathname === path) {
                link.classList.add('visited')
            }
        })
    }, [path]);
    return (
        <nav className="main-menu">
            <ul>
                <li>
                    <Link to="/adminDash/Profile">
                        <div className="fa"><img className='profil-img' src={user?.pdp} alt={user?.nom} /></div>
                        <span className="nav-text">
                            Profile
                        </span>

                    </Link>

                </li>
                <li>
                    <Link to="/adminDash">
                        <i className="fa fa-home fa-2x"></i>
                        <span className="nav-text">
                            Dashboard
                        </span>
                    </Link>

                </li>
                <li className="has-subnav">
                    <Link to="/">
                        <i className="fa fa-globe fa-2x"></i>
                        <span className="nav-text">
                            Global Surveyors
                        </span>
                    </Link>

                </li>
                <li className="has-subnav">
                    <Link to="/">
                        <i className="fa fa-comments fa-2x"></i>
                        <span className="nav-text">
                            Group Hub Forums
                        </span>
                    </Link>

                </li>
                <li className="has-subnav">
                    <Link to="/">
                        <i className="fa fa-camera-retro fa-2x"></i>
                        <span className="nav-text">
                            Survey Photos
                        </span>
                    </Link>

                </li>
                <li>
                    <Link to="/">
                        <i className="fa fa-film fa-2x"></i>
                        <span className="nav-text">
                            Surveying Tutorials
                        </span>
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        <i className="fa fa-book fa-2x"></i>
                        <span className="nav-text">
                            Surveying Jobs
                        </span>
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        <i className="fa fa-cogs fa-2x"></i>
                        <span className="nav-text">
                            Tools & Resources
                        </span>
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        <i className="fa fa-map-marker fa-2x"></i>
                        <span className="nav-text">
                            Member Map
                        </span>
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        <i className="fa fa-info fa-2x"></i>
                        <span className="nav-text">
                            Documentation
                        </span>
                    </Link>
                </li>
            </ul>

            <ul className="logout">
                <li>
                    <Link to="/logout">
                        <i className="fa fa-power-off fa-2x"></i>
                        <span className="nav-text">
                            Logout
                        </span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
