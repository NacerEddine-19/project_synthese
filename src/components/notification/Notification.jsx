import './notif.css'
import { Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function MyDropdown({ item, notif, post }) {
    const isMoreVert = post;
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" className={`btnNotif ${isMoreVert ? 'moreVertStyle' : ''}`}>
                {item}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {notif?.map((content, index) => (
                    <LinkContainer
                        key={index}
                        to={
                            content === 'Profile' ? '/Profile' : content === 'Settings' ? '/Settings' :
                                content === 'Language' ? '/Language' : content === 'Log out' ? '/Logout' : ''
                        }
                    >
                        <Dropdown.Item>{content}</Dropdown.Item>
                    </LinkContainer>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}
