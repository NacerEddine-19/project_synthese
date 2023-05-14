import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Test from "./pages/testing/test";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainDash from "./pages/adminPages/mainPage/mainPage";
import Courses from "./pages/courses/Courses";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Test" element={<Test />} />
        <Route path="/adminDash" element={<MainDash />} />
        <Route path="/Courses" element={<Courses />} />
      </Routes>
    </Router>
  );
}

export default App;
