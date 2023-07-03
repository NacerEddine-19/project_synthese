import { useEffect, useState } from "react";
import UsersTable from "../../../components/adminComponents/tables/usersTable";
import request from "../../../utils/request";

const API = process.env.REACT_APP_SERVER_API;
export default function UsersManage() {
    const [data, setData] = useState([]);

    const deleteUser = (id) => {
        request.delete(`${API}/users/${id}`)
            .then(res => {
                console.log(res)
                setData((prevData) => prevData.filter((user) => user.id !== id));
                alert('user deleted successfully')
            })
    }

    const updateUserStatus = (id, isBanned, status) => {

        request.patch(`${API}/users/${id}/${status}`)
            .then(res => {
                console.log(res);
                const updatedData = data.map(user => {
                    if (user.id === id) {
                        return { ...user, is_banned: isBanned };
                    }
                    return user;
                });
                setData(updatedData);
            });
    };

    const banUser = (id) => {
        updateUserStatus(id, true, 'ban');
    };

    const unbanUser = (id) => {
        updateUserStatus(id, false, 'unban');
    };

    useEffect(() => {
        request.get(`${API}/users`)
            .then(res => {
                setData(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    return (
        <>
            {data && <UsersTable banUser={banUser} unbanUser={unbanUser} deleteUser={deleteUser} data={data} />}
        </>
    );
}