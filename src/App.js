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
import Group from './pages/groupPage/groupPage';
import UsersManage from './pages/adminPages/manageUsers/manageUsers';
import PostManage from './pages/adminPages/managePosts/managePosts';
import ProjectsManage from './pages/adminPages/manageProjects/manageProjects';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/Logout" element={<LogOut />} />
        <Route element={<UserRoutes />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Profile" element={<Profile />} />
          <Route exact path="/Courses" element={<Courses />} />
          <Route exact path="/Projects" element={<Projects />} />
          <Route exact path="/Events" element={<EventsPage />} />
          <Route exact path="/Group" element={<Group />} />
          <Route exact path="/posts/:postId" element={<ViewPostPage />} />
        </Route>
        <Route element={<AdminRoutes />}>
          <Route exact path="/adminDash" element={<MainDash />} />
          <Route exact path="/ManageUsers" element={<UsersManage />} />
          <Route exact path="/ManagePosts" element={<PostManage />} />
          <Route exact path="/ManageProjects" element={<ProjectsManage />} />
        </Route>
        <Route exact path="/test" element={<Test />} />
        <Route path='*' element={<PageNotFound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
