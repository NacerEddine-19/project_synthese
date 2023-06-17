import { useState, useCallback, useEffect } from "react";
import request from "../../utils/request";

import "./login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const SERVER_API = process.env.REACT_APP_SERVER_API;

  const [email, setEmail] = useState("admin@admin.com"); // majid.nacereddine@ofppt-edu.ma  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [password, setPassword] = useState("123");
  const [user, setUser] = useState(localStorage.getItem('user') || null);

  useEffect(() => {
    if (user) {
      const userStr = JSON.stringify(user);
      const role = user.role;
      if (!localStorage.getItem('user')) {
        localStorage.setItem("user", userStr);
      }
      if (!localStorage.getItem('role')) {
        localStorage.setItem("role", role);
      }
    }
    if (["admin", "stagier"].includes(localStorage.getItem('role')) && user) {
      try {
        navigate("/");
      } catch (ex) {
        console.log(ex);
        // window.location.reload(true)
      }
    } else if (localStorage.getItem('role') === "super_admin" && user) {
      try {
        navigate("/adminDash");
      } catch (ex) {
        console.log(ex);
        // window.location.reload(true)
      }
    }
    return () => {
    };
  }, [user, navigate]);

  async function handleSubmit(event) {

    event.preventDefault();
    try {
      await request.post(`${SERVER_API}/login`, {
        email,
        password,
      })
        .then(response => {
          if (response.status === 200) {
            const data = response.data;
            return data;
          } else {
            console.error('Error occurred during login');
          }
        }
        ).then(data => {
          if (data) {
            return data[0];
          }
        }).then(data => {
          setUser(data);
        }
        );


    } catch (error) {
      console.error(error);
    }

  };


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
            <h2 className="active h2"> Sign In </h2>

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
    </div>
  );
}
