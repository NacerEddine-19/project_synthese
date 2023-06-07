import { useNavigate, Outlet } from "react-router-dom";
import Login from "../pages/login/Login";
import { useEffect } from "react";
import UserLayout from "../pages/userLayout/userLayout";

export const UserRoutes = () => {
    const Navigate = useNavigate();
    const isAuthenticated = sessionStorage.getItem('user');

    const userRole = sessionStorage.getItem("role"); // Get the user's role
    useEffect(() => {
        if (!isAuthenticated) {
            Navigate("/login");
        }
    }, [Navigate, isAuthenticated]);
    const isStagier = userRole === "stagier";
    const isAdmin = userRole === "admin";
    return isStagier || isAdmin ?
        (<UserLayout>
            <Outlet />
        </UserLayout>)
        :
        (<Login />);
};
export const AdminRoutes = () => {
    const Navigate = useNavigate();
    const isAuthenticated = sessionStorage.getItem('user');

    const userRole = sessionStorage.getItem("role"); // Get the user's role
    useEffect(() => {
        if (!isAuthenticated) {
            Navigate("/login");
        }
    }, [Navigate, isAuthenticated]);
    const isSuperAdmin = userRole === "super_admin";
    return isSuperAdmin ? <Outlet /> : <Login />;
};
