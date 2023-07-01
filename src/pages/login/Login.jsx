import { useState, useCallback, useEffect, useRef } from "react";
import request from "../../utils/request";

import "./login.css";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "../../components/loadingIcon/loadingIcon";

const SERVER_API = process.env.REACT_APP_SERVER_API;
export default function Login() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  useEffect(() => {
    const checkUser = async () => {
      setLoading(true);
      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    checkUser();
  }, [navigate]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const response = await request.post(`${SERVER_API}/login`, {
          email,
          password,
        });

        if (response.status === 200) {
          const data = response.data;
          console.log(data);
          if (data && data.length > 0) {
            const user = data[0];
            setUser(user);
          } else {
            console.error("No user found");
          }
        } else {
          console.error("Error occurred during login");
        }
      } catch (error) {
        console.error({ error });
      }
    },
    [email, password]
  );

  const handleEmailChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const handlePasswordChange = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      if (user.first_time === 1) {
        navigate("/changePassword");
      } else {
        const role = user.role;
        localStorage.setItem("role", role);

        if (["admin", "stagier"].includes(role)) {
          navigate("/");
        } else if (role === "super_admin") {
          navigate("/adminDash");
        }
      }
    }
  }, [user, navigate]);
  return (
    <>
      {loading ? <LoadingIcon /> :
        !user && <div className="login">
          <div className="loginWrapper">
            <div className="loginLeft">
              <h3 className="loginLogo">The OFPPT Social Network</h3>
              <span className="loginDesc">
                Connect, Learn, Grow
              </span>
            </div>
            <div className="wrapper fadeInDown">
              <div id="formContent">
                <h2 className="active h2"> Sign In </h2>
                <div className="fadeIn first">
                  <img src="/assets/ofppt-logo/png/logo-no-background.png" id="icon" alt="User Icon" />
                </div>
                <form onSubmit={handleSubmit}>
                  <input
                    autoFocus
                    ref={inputRef}
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="fadeIn second" />
                  <input
                    type="password"
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
        </div>}
    </>
  );
}
