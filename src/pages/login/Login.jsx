import { useState, useCallback } from "react";
import request from "../../utils/request";
import "./login.css";

export default function Login() {
  const SERVER_API = process.env.REACT_APP_SERVER_API;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const response = await request.post(`${SERVER_API}/login`, {
          email,
          password,
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    [email, password, SERVER_API]
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
