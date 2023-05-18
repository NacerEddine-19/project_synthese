import { useLocation } from "react-router-dom";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";

export default function UserLayout({ children }) {
    const location = useLocation();

    const isProfilePage = location.pathname === '/Profile';
    return (
        <>
            <Topbar />
            <div className="homeContainer">
                <Sidebar />
                {children}
                {!isProfilePage && <Rightbar />}
            </div>
        </>
    )
}