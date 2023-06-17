import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LogOut() {
    const navigate = useNavigate();
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    useEffect(() => {
        navigate('/login')
        return () => {
            navigate('/login')
        };
    });
}