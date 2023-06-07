import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LogOut() {
    const navigate = useNavigate();
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('role')
    useEffect(() => {
        navigate('/login')
        return () => {
            navigate('/login')
        };
    });
}