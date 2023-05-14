import { useState, useCallback } from "react";
import request from "../../utils/request";

import "./login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const history = useNavigate();

  const SERVER_API = process.env.REACT_APP_SERVER_API;

  const [email, setEmail] = useState("majid.nacereddine@ofppt-edu.ma");
  const [password, setPassword] = useState("123");

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const response = await request.post(`${SERVER_API}/login`, {
          email,
          password,
        });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        // Redirect the user to the appropriate route based on their role
        if (response.data.role === "admin" || response.data.role === "user") {
          history.push("/home");
        } else if (response.data.role === "superAdmin") {
          history.push("/adminDash");
        }
      } catch (error) {
        console.error(error);
      }
    },
    [email, password, SERVER_API, history]
  );


  const handleEmailChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const handlePasswordChange = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  return (
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
            <h2 className="active"> Sign In </h2>

            <div className="fadeIn first">
              <img src="/assets/ofppt-logo/png/logo-no-background.png" id="icon" alt="User Icon" />
            </div>

            <form onSubmit={handleSubmit}>
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
              <a className="underlineHover" href="something">Forgot Password?</a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
