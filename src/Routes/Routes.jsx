import { useNavigate, Outlet } from "react-router-dom";
import Login from "../pages/login/Login";
import { useEffect } from "react";

export const UserRoutes = () => {
    const Navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('user');

    const userRole = localStorage.getItem("role"); // Get the user's role
    useEffect(() => {
        if (!isAuthenticated) {
            Navigate("/login");
        }
    }, [Navigate, isAuthenticated]);
    const isStagier = userRole === "stagier";
    const isAdmin = userRole === "admin";
    return isStagier || isAdmin ? <Outlet /> : <Login />;
};
export const AdminRoutes = () => {
    const Navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('user');

    const userRole = localStorage.getItem("role"); // Get the user's role
    useEffect(() => {
        if (!isAuthenticated) {
            Navigate("/login");
        }
    }, [Navigate, isAuthenticated]);
    const isSuperAdmin = userRole === "superAdmin";
    return isSuperAdmin ? <Outlet /> : <Login />;
};
