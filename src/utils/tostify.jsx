
import { useCallback, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Toast({ text, type }) {
    const theme = localStorage.getItem('theme');
    const notify = useCallback(() => toast(text, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme,
        type: type
    }), [type, theme, text]);
    useEffect(() => {
        notify();
    }, [text, type, notify]);
    return (
        <>
            <div>
                <ToastContainer />
            </div>
        </>
    );
}
