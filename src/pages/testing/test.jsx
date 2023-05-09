// import { useState, useCallback } from "react";
// import request from "../../utils/request";
// import './test.css'
function Test() {
    // const SERVER_API = process.env.REACT_APP_SERVER_API;

    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    // const handleSubmit = useCallback(
    //     async (event) => {
    //         event.preventDefault();
    //         try {
    //             const response = await request.post(`${SERVER_API}/login`, {
    //                 email,
    //                 password,
    //             });
    //             console.log(response.data);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     },
    //     [email, password, SERVER_API]
    // );

    // const handleEmailChange = useCallback((event) => {
    //     setEmail(event.target.value);
    // }, []);

    // const handlePasswordChange = useCallback((event) => {
    //     setPassword(event.target.value);
    // }, []);


    return (
        <div className="wrapper fadeInDown">
            {/* <div id="formContent">
                <h2 className="active"> Sign In </h2>

                <div className="fadeIn first">
                    <img src="/assets/ofppt-logo/png/logo-color.png" id="icon" alt="User Icon" />
                </div>

                <form>
                    <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="fadeIn second" />
                    <input
                        type="text"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="fadeIn third"
                    />
                    <input
                        type="submit"
                        className="fadeIn fourth"
                        value={`Login`}
                    />
                </form>

                <div id="formFooter">
                    <a className="underlineHover" href="#">Forgot Password?</a>
                </div>

            </div> */}
        </div>
    );
}

export default Test;
