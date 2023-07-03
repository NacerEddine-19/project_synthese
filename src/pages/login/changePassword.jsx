import { useCallback, useState } from "react";
import request from "../../utils/request";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SERVER_API = process.env.REACT_APP_SERVER_API;
export default function ChangePass() {
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [user, setUser] = useState();
    
    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
        }else{
            navigate("/login");
        }
        return () => {
            setUser()
        };
    }, [navigate]);

    const handleSubmit = useCallback(
        async (event) => {
            event.preventDefault();
            try {
                const response = await request.put(`${SERVER_API}/login/pass/${user?.id}`, {
                    oldPassword,
                    newPassword,
                });

                if (response.status === 200) {
                    console.log(response);
                    localStorage.removeItem('user')
                    alert('Your password has been changed successfully');
                    navigate("/login");
                } else {
                    console.error("Error occurred during login");
                }
            } catch (error) {
                console.error(error);
            }
        },
        [newPassword, navigate, oldPassword, user?.id]
    );
    const handleOldPasswordChange = useCallback((event) => {
        setOldPassword(event.target.value);
    }, []);
    const handleNewPasswordChange = useCallback((event) => {
        setNewPassword(event.target.value);
    }, []);
    return (
        <>
            <div className="login">
                <div className="loginWrapper">
                    <div className="loginLeft">
                        <h3 className="loginLogo">The OFPPT Social Network</h3>
                        <span className="loginDesc">
                            Connect, Learn, Grow
                        </span>
                    </div>
                    <div className="wrapper fadeInDown">
                        <div id="formContent">
                            <h2 className="active h2"> Change Password </h2>
                            <div className="fadeIn first">
                                <img src="/assets/ofppt-logo/png/logo-no-background.png" id="icon" alt="User Icon" />
                            </div>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="password"
                                    placeholder="Old Password"
                                    name="old_pass"
                                    value={oldPassword}

                                    onChange={handleOldPasswordChange}
                                    className="fadeIn second" />
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    name="new_pass"
                                    value={newPassword}
                                    onChange={handleNewPasswordChange}
                                    className="fadeIn third"
                                />
                                <input
                                    type="submit"
                                    className="fadeIn fourth"
                                    value={`Procéder a l'accueil`}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}