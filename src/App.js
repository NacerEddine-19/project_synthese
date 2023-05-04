import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Test from "./pages/testing/test";
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import MainDash from "./pages/adminPages/mainPage/mainPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Test" element={<Test />} />
        <Route path="/adminDash" element={<MainDash />} />
      </Routes>
    </Router>
  );
}

export default App;
