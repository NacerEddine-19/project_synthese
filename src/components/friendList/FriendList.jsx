import React, { useState } from 'react';
import './freindstable.css';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import request from '../../utils/request';
import { useEffect } from 'react';
import {getUser} from '../../utils/helper';
import LoadingIcon from '../loadingIcon/loadingIcon';

const FriendsTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [user] = useState(getUser());
    const [friends, setFriends] = useState()
    const [user_id, setUser_id] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const SERVER_API = process.env.REACT_APP_SERVER_API;
    useEffect(() => {
        setUser_id(user.id);
        return () => {
            setUser_id(null);
        };
    }, [user, SERVER_API]);

    useEffect(() => {
        setIsLoading(true);
        request.post(`${SERVER_API}/friends`, {
            user_id
        })
            .then(response => {
                if (response.status === 200) {
                    const data = response.data;
                    return data;
                } else {
                    console.error('Error occurred during login');
                }
            }
            ).then(data => {
                setFriends(data);
            }
            )
            .finally(() => { setIsLoading(false); });
        return () => {
            setFriends(null);
        };
    }, [user_id, SERVER_API]);

    // const friendsList = [
    //     {
    //         id: 1,
    //         name: 'Alice',
    //         email: 'alice@example.com',
    //         connected: true,
    //         image: 'https://randomuser.me/api/portraits/women/17.jpg',
    //     },
    //     {
    //         id: 2,
    //         name: 'Bob',
    //         email: 'bob@example.com',
    //         connected: false,
    //         image: 'https://randomuser.me/api/portraits/men/94.jpg',
    //     },
    //     {
    //         id: 3,
    //         name: 'Charlie',
    //         email: 'charlie@example.com',
    //         connected: true,
    //         image: 'https://randomuser.me/api/portraits/men/57.jpg',
    //     },
    //     {
    //         id: 4,
    //         name: 'Dave',
    //         email: 'dave@example.com',
    //         connected: true,
    //         image: 'https://randomuser.me/api/portraits/men/37.jpg',
    //     },
    //     {
    //         id: 5,
    //         name: 'Eve',
    //         email: 'eve@example.com',
    //         connected: false,
    //         image: 'https://randomuser.me/api/portraits/women/42.jpg',
    //     },
    //     {
    //         id: 6,
    //         name: 'Frank',
    //         email: 'frank@example.com',
    //         connected: true,
    //         image: 'https://randomuser.me/api/portraits/men/11.jpg',
    //     },
    //     {
    //         id: 7,
    //         name: 'Gina',
    //         email: 'gina@example.com',
    //         connected: false,
    //         image: 'https://randomuser.me/api/portraits/women/7.jpg',
    //     },
    //     {
    //         id: 8,
    //         name: 'Harry',
    //         email: 'harry@example.com',
    //         connected: true,
    //         image: 'https://randomuser.me/api/portraits/men/83.jpg',
    //     },
    //     {
    //         id: 9,
    //         name: 'Isabel',
    //         email: 'isabel@example.com',
    //         connected: false,
    //         image: 'https://randomuser.me/api/portraits/women/25.jpg',
    //     },
    //     {
    //         id: 10,
    //         name: 'Jack',
    //         email: 'jack@example.com',
    //         connected: true,
    //         image: 'https://randomuser.me/api/portraits/men/29.jpg',
    //     },
    // ];


    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredFriends = friends?.filter((friend) =>
        friend.nom.toLowerCase().includes(searchTerm.toLowerCase())
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
            {isLoading ?
                <LoadingIcon />
                :
                <table>
                    <tbody>
                        {filteredFriends?.map((friend) => (
                            <tr key={friend.id}>
                                <td className="small">
                                    <img className='friend-img' src={friend.pdp} alt={friend.nom} />
                                </td>
                                <td className="small">
                                    {friend.nom}
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
                                        onClick={() => handleAddFriend(friend.nom)}

                                    >
                                        {<PersonRemoveIcon />}<span>Remove</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>}
        </div>
    );
};

export default FriendsTable;