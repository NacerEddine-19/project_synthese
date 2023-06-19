import { useEffect, useState } from "react";
import request from "../../utils/request";
import ProjectsTable from "../../components/adminComponents/tables/projectsTable";

const API = process.env.REACT_APP_SERVER_API;
export default function Test() {
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
        request.get(`${API}/projects`)
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    return (
        <>
            {/* {data && <ProjectsTable data={data} />} */}
            <div></div>
        </>
    );
}