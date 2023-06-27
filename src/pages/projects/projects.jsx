import { memo, useEffect, useState } from "react";
import ProjectComponent from "../../components/projectComponent/projectComponent";
import request from "../../utils/request";
// import "./courses.css"
const MemoizedProjectComponent = memo(ProjectComponent);
const API = process.env.REACT_APP_SERVER_API;
export default function Projects() {
    const [data, setData] = useState([]);

    const deleteProject = (id) => {
        console.log(id);
        request.delete(`${API}/projects/${id}`)
            .then(res => {
                setData((prevData) => prevData.filter((user) => user.id !== id));
                alert('project deleted successfully')
            })
    }
    const fetchProjects = () => {
        request
            .get(`${API}/projects`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchProjects();
    }, []);
    return (
        <MemoizedProjectComponent data={data} deleteProject={deleteProject} fetchProjects={fetchProjects} />
    );
}
