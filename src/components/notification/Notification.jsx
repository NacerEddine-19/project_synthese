import './notif.css'
import { Dropdown } from 'react-bootstrap';



export default function MyDropdown({ item, notif }) {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" className='btnNotif'>
                {item}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {notif.map((item, index) => (
                    <Dropdown.Item key={index}>{item}</Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}