import { memo, useEffect, useState } from "react";
import ProjectComponent from "../../components/projectComponent/projectComponent";
import request from "../../utils/request";
// import "./courses.css"
const MemoizedProjectComponent = memo(ProjectComponent);
const API = process.env.REACT_APP_SERVER_API;
export default function Projects() {
    const [data, setData] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [total, setTotal] = useState(0);
    const [isEnd, setIsEnd] = useState(false);
    console.log({data});

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
            .get(`${API}/projects`, {
                params: {
                    limit: 5,
                    offset: offset,
                },
            })
            .then((res) => {
                // setData(response.data);
                const { projects, total } = res?.data;
                console.log(res);
                setData((prev) => [...prev, ...projects]);
                setTotal(total);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
                setIsFetching(false);
            });
    };

    useEffect(() => {
        if (data?.length >= total && data?.length !== 0) {
            setIsEnd(true);
        } else {
            setIsEnd(false);
        }
    }, [data?.length, total]);
    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            const currentHeight = scrollTop + clientHeight;
            if (!isFetching && currentHeight + 1 >= scrollHeight && !isEnd) {
                setIsFetching(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isFetching, isEnd]);
    useEffect(() => {
        if (isFetching) {
            setOffset((prev) => prev + 5);
        }
    }, [isFetching]);

    useEffect(() => {
        setLoading(true);
        fetchProjects();
    }, [offset]);
    return (
        <MemoizedProjectComponent
            loading={loading}
            isFetching={isFetching}
            isEnd={isEnd}
            data={data}
            deleteProject={deleteProject}
            fetchProjects={fetchProjects}
        />
    );
}
