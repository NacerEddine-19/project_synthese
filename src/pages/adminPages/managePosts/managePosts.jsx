import { useEffect, useState } from "react";
import PostsTable from "../../../components/adminComponents/tables/postTable";
import request from "../../../utils/request";

const API = process.env.REACT_APP_SERVER_API;
export default function PostManage() {
    const [data, setData] = useState([]);

    const deletePost = (id) => {
        console.log(id);
        request.delete(`${API}/posts/${id}`)
            .then(res => {
                console.log(res)
                setData((prevData) => prevData.filter((user) => user.id !== id));
                alert('post deleted successfully')
            })
    }
    useEffect(() => {
        request.get(`${API}/posts`)
            .then(res => {
                setData(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    return (
        <>
            {data && <PostsTable deletePost={deletePost} data={data} />}
        </>
    );
}