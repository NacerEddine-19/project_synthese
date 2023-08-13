import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";

export default function UserLayout({ children }) {
    const pathname = window.location.pathname;

    const isProfilePage = pathname.includes('/Profile');
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