import './notif.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const notification = [
    'Action',
    'Another action',
    'Something else here'
]

export default function DropdownNotif({ item }) {
    return (
        <div className="dropdown">
            <button
                className="btnNotif"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {item}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {notification.map((item, index) => (
                    <li key={index}>
                        <p className="dropdown-item" href="#">
                            {item}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}