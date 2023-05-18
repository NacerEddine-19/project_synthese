import './notif.css'
import { Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function MyDropdown({ item, notif }) {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" className='btnNotif'>
                {item}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {notif.map((item, index) => (
                    <LinkContainer
                        key={index}
                        to={
                            item === 'Profile' ? '/Profile' : item === 'Settings' ? '/Settings' :
                                item === 'Language' ? '/Language' : item === 'Log out' ? '/Logout' : ''
                        }
                    >
                        <Dropdown.Item>{item}</Dropdown.Item>
                    </LinkContainer>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}
