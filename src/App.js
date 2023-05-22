import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Courses from './pages/courses/Courses';
import Projects from './pages/projects/projects';
import LogOut from './components/logOut/logOut';
import MainDash from './pages/adminPages/mainPage/mainPage';
import { UserRoutes, AdminRoutes } from './Routes/Routes';
import PageNotFound from './pages/page not found/pageNotFound';
import EventsPage from './pages/events/events';
import Test from './pages/testing/test';
import ViewPostPage from './pages/postPage/postPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route element={<UserRoutes />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Profile" element={<Profile />} />
          <Route exact path="/Courses" element={<Courses />} />
          <Route exact path="/Projects" element={<Projects />} />
          <Route exact path="/Events" element={<EventsPage />} />
          <Route exact path="/Logout" element={<LogOut />} />
          <Route exact path="/posts/:postId" element={<ViewPostPage />} />
        </Route>
        <Route element={<AdminRoutes />}>
          <Route exact path="/adminDash" element={<MainDash />} />
        </Route>
        <Route exact path="/test" element={<Test />} />
        <Route path='*' element={<PageNotFound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
