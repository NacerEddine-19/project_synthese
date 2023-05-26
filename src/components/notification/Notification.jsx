import './notif.css'
import { Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import request from '../../utils/request';

export default function MyDropdown({ icon, notif, post, user, connectedUser, onPostDeleted }) {
    const API = process.env.REACT_APP_SERVER_API;
    const isPost = post;

    const handleCommand = async (command) => {
        let response;
        if (command === 'delete') {
            try {
                response = await request.delete(`${API}/posts/${post?.id_post}`);
                if (response?.status === 200) {
                    // Call the onPostDeleted callback function if provided
                    if (typeof onPostDeleted === 'function') {
                        onPostDeleted(post?.id_post);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        } else if (command === 'edit') {
            // try {
            //      response = await request.put(`${API}/${post?.id_post}`);
            // } catch (error) {
            //     console.log(error);
            // }
        } else if (command === 'report') {
            if (connectedUser?.role === 'admin') {
                try {
                    response = await request.post(`${API}/reports/add`, {
                        reported_id: post?.user?.id,
                        reporter_id: connectedUser?.id,
                        type: 'user'
                    });
                } catch (error) {
                    console.log(error);
                }
            } else {

                try {
                    response = await request.post(`${API}/reports/add`, {
                        reported_id: post?.id_post,
                        reporter_id: connectedUser?.id,
                        type: 'post'
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }
        console.log(response?.data);
    };
    const renderOption = () => {
        if (!isPost) {
            return (
                notif?.map((content, index) => (

                    <LinkContainer
                        key={index}
                        to={
                            content === 'Profile' ? '/Profile' : content === 'Settings' ? '/Settings' :
                                content === 'Language' ? '/Language' : content === 'Log out' ? '/Logout' : ''
                        }
                    >
                        <Dropdown.Item>{content}</Dropdown.Item>
                    </LinkContainer>
                ))
            );

        } else {
            return notif?.map((content, index) => {
                if (content === 'delete' && (user?.id === connectedUser?.id || connectedUser?.role === 'admin')) {
                    return (
                        <Dropdown.Item key={index} onClick={() => handleCommand(content)}>{content} </Dropdown.Item>
                    );
                } else if (content === 'edit' && user?.id === connectedUser?.id) {
                    return (
                        <Dropdown.Item key={index} onClick={() => handleCommand(content)}>{content}</Dropdown.Item>
                    );
                } else if (content === 'report' && user?.id !== connectedUser?.id) {
                    return (
                        //to={connectedUser?.role === 'admin' ? `/adminreportPost` : `/reportPost`}
                        <Dropdown.Item key={index} onClick={() => handleCommand(content)}>{content}</Dropdown.Item>
                    );
                }
                return null;
            });
        }
    }
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" className={`btnNotif ${isPost ? 'moreVertStyle' : ''}`}>
                {icon}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {renderOption()}
            </Dropdown.Menu>
        </Dropdown>
    );
}
