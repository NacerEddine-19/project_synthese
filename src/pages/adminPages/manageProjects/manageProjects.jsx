import { useEffect, useState } from "react";
import request from "../../../utils/request";
import ProjectsTable from "../../../components/adminComponents/tables/projectsTable";

const API = process.env.REACT_APP_SERVER_API;
export default function ProjectsManage() {
    const [data, setData] = useState([]);

    const deleteProject = (id) => {
        console.log(id);
        request.delete(`${API}/projects/${id}`)
            .then(res => {
                setData((prevData) => prevData.filter((user) => user.id !== id));
                alert('project deleted successfully')
            })
    }

    useEffect(() => {
        request.get(`${API}/projects`)
            .then(res => {
                console.log(res);
                setData(res.data)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    return (
        <>
            {data && <ProjectsTable deleteProject={deleteProject} data={data} />}
        </>
    );
}