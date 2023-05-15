import './notif.css'
import { Dropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";





export default function MyDropdown({ item, notif }) {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" className='btnNotif'>
                {item}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {notif.map((item, index) => (
                    <Dropdown.Item key={index}>
                        {notif.length < 4 ?
                            <>{item}</>
                            :

                            <> {item === 'Profile' ? <Link to={`/Profile`}>{item}</Link> : ''}
                                {item === 'Settings' ? <Link to={`/Settings`}>{item}</Link> : ''}
                                {item === 'Language' ? <Link to={`/Language`}>{item}</Link> : ''}
                                {item === 'Log out' ? <Link to={`/Logout`}>{item}</Link> : ''}
                            </>
                        }


                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}