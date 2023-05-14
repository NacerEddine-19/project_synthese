import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import CoursesComponent from "../../components/courses/courses";
import "./courses.css"

export default function Courses() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <CoursesComponent />
        <Rightbar />
      </div>
    </>
  );
}
