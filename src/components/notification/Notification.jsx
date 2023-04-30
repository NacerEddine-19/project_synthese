import './notif.css'
import { Dropdown } from 'react-bootstrap';

const notification = [
    'Action',
    'Another action',
    'Something else here'
];

export default function MyDropdown({ item }) {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" className='btnNotif'>
                {item}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {notification.map((item, index) => (
                    <Dropdown.Item key={index}>{item}</Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}