
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Test() {
    const theme = localStorage.getItem('theme');
    const notify = () => toast('🦄 Wow so easy!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme,
        type: "warning"
    });
    return (
        <>
            <div>
                <button onClick={notify}>Notify!</button>
                <ToastContainer />
            </div>
        </>
    );
}
