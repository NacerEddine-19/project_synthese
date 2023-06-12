import AdminSideBar from "../../components/adminComponents/sideBar/sideBar";

export default function AdminLayout({ children }) {
    // const location = useLocation();

    // const isProfilePage = location.pathname === '/Profile';
    return (
        <div className={`main`}>
            <div className="area">
                {children}
            </div>
            <AdminSideBar />
        </div>
    )
}