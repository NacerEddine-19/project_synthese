import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home } from "@mui/icons-material";
import PrimarySearchAppBar from "../../components/adminComponents/adminTopBar/adminTopBar";
import AdminSideBar from "../../components/adminComponents/sideBar/sideBar";
import './adminLayout.css'
export default function AdminLayout({ children }) {
    const location = useLocation();
    const [path, setPath] = useState(location.pathname.slice(1));
    useEffect(() => {
        setPath(location.pathname.slice(1))
        return () => {
            setPath(null);
        };
    }, [location]);
    return (
        <>
            <AdminSideBar />
            <div className="area">
                <PrimarySearchAppBar />
                <div style={{ marginBottom: 80 }}><Link to={`/adminDash`}> {/*style={{ marginTop: 100 }}*/}
                    <Home />
                </Link> / {path}</div>
                {children}
            </div>
        </>
    )
}