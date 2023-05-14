import React, { useState } from 'react';
import './freindstable.css';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

const FriendsTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const friendsList = [
        {
            id: 1,
            name: 'Alice',
            email: 'alice@example.com',
            connected: true,
            image: 'https://randomuser.me/api/portraits/women/17.jpg',
        },
        {
            id: 2,
            name: 'Bob',
            email: 'bob@example.com',
            connected: false,
            image: 'https://randomuser.me/api/portraits/men/94.jpg',
        },
        {
            id: 3,
            name: 'Charlie',
            email: 'charlie@example.com',
            connected: true,
            image: 'https://randomuser.me/api/portraits/men/57.jpg',
        },
        {
            id: 4,
            name: 'Dave',
            email: 'dave@example.com',
            connected: true,
            image: 'https://randomuser.me/api/portraits/men/37.jpg',
        },
        {
            id: 5,
            name: 'Eve',
            email: 'eve@example.com',
            connected: false,
            image: 'https://randomuser.me/api/portraits/women/42.jpg',
        },
        {
            id: 6,
            name: 'Frank',
            email: 'frank@example.com',
            connected: true,
            image: 'https://randomuser.me/api/portraits/men/11.jpg',
        },
        {
            id: 7,
            name: 'Gina',
            email: 'gina@example.com',
            connected: false,
            image: 'https://randomuser.me/api/portraits/women/7.jpg',
        },
        {
            id: 8,
            name: 'Harry',
            email: 'harry@example.com',
            connected: true,
            image: 'https://randomuser.me/api/portraits/men/83.jpg',
        },
        {
            id: 9,
            name: 'Isabel',
            email: 'isabel@example.com',
            connected: false,
            image: 'https://randomuser.me/api/portraits/women/25.jpg',
        },
        {
            id: 10,
            name: 'Jack',
            email: 'jack@example.com',
            connected: true,
            image: 'https://randomuser.me/api/portraits/men/29.jpg',
        },
    ];


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredFriends = friendsList.filter((friend) =>
        friend.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddFriend = (friendName) => {
        alert(`${friendName} is removed from your friend list.`);
    };

    return (
        <div className='friend-list'>
            <input
                type="text"
                placeholder="Search friends"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <table>
                <tbody>
                    {filteredFriends.map((friend) => (
                        <tr key={friend.id}>
                            <td className="small">
                                <img className='friend-img' src={friend.image} alt={friend.name} />
                            </td>
                            <td className="small">
                                {friend.name}
                            </td>
                            <td className="small">
                                {friend.connected ? (
                                    <span className="connected">Connected</span>
                                ) : (
                                    <span className="not-connected">Not Connected</span>
                                )}
                                {!friend.connected && <span className="red-dot"></span>}
                            </td>
                            <td className="small" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}>
                                <button
                                    className="add-friend"
                                    onClick={() => handleAddFriend(friend.name)}

                                >
                                    {<PersonRemoveIcon />}<span>Remove</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FriendsTable;