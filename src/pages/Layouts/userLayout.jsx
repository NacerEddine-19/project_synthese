import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";

export default function UserLayout({ children }) {
    const pathname = window.location.pathname;

    const isProfilePage = pathname.includes('/Profile');
    const isChats = pathname.includes('/Chats');
    return (
        <>
            <Topbar />
            <div className="homeContainer">
                {!isChats && <Sidebar />}
                {children}
                {!isProfilePage && !isChats && <Rightbar />}
            </div>
        </>
    )
}