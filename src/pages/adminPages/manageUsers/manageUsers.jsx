import { useEffect, useState } from "react";
import UsersTable from "../../../components/adminComponents/tables/usersTable";
import request from "../../../utils/request";

const API = process.env.REACT_APP_SERVER_API;
export default function UsersManage() {
    const [data, setData] = useState([]);

    const deleteUser = (id) => {
        console.log(id);
        request.delete(`${API}/users/${id}`)
            .then(res => {
                console.log(res)
                setData((prevData) => prevData.filter((user) => user.id !== id));
                alert('user deleted successfully')
            })
    }
    
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
            {data && <UsersTable deleteUser={deleteUser} data={data} />}
        </>
    );
}