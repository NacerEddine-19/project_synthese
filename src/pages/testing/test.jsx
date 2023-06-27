import { Person } from "@material-ui/icons";
import ReportIcon from '@mui/icons-material/Report';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeFork, faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import './test.css'
import Card from "../../components/card/card";
import { useEffect, useState } from "react";
import request from "../../utils/request";

const API = process.env.REACT_APP_SERVER_API;
export default function Test() {
    const [users, setUsers] = useState();
    const [projects, setProjects] = useState();
    const [posts, setPosts] = useState();
    const [reports, setReports] = useState();
    const [usersPercentage, setUsersPercentage] = useState(0);
    const [projectsPercentage, setProjectsPercentage] = useState(0);
    const [postsPercentage, setPostsPercentage] = useState(0);
    const [reportsPercentage, setReportsPercentage] = useState(0);

    useEffect(() => {
        request.get(`${API}/users`)
            .then(res => setUsers(res?.data));
        request.get(`${API}/posts`)
            .then(res => setPosts(res?.data?.posts));
        request.get(`${API}/projects`)
            .then(res => setProjects(res?.data))
        request.get(`${API}/reports`)
            .then(res => setReports(res?.data))
        return () => {
            setUsers(0)
        };
    }, []);
    function calculateReportsPercentageDifference(data) {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1
        const currentYear = currentDate.getFullYear();
        let minus = false;

        const currentMonthReports = data?.filter((report) => {
            const reportDate = new Date(report.created_at);
            return (
                reportDate.getMonth() + 1 === currentMonth &&
                reportDate.getFullYear() === currentYear
            );
        });

        const previousMonthReports = data?.filter((report) => {
            const reportDate = new Date(report.created_at);
            const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
            const previousYear =
                currentMonth === 1 ? currentYear - 1 : currentYear;
            return (
                reportDate.getMonth() + 1 === previousMonth &&
                reportDate.getFullYear() === previousYear
            );
        });

        const currentMonthCount = currentMonthReports?.length;
        const previousMonthCount = previousMonthReports?.length;

        if (currentMonthCount < previousMonthCount) {
            minus = true;
        }

        const percentageDifference =
            ((currentMonthCount - previousMonthCount) / data?.length) * 100;

        return [percentageDifference === Infinity ? 100 : percentageDifference === -Infinity ? -100 : percentageDifference?.toFixed(2), minus];
    }
    useEffect(() => {
        setUsersPercentage(calculateReportsPercentageDifference(users))
        setPostsPercentage(calculateReportsPercentageDifference(posts))
        setProjectsPercentage(calculateReportsPercentageDifference(projects))
        setReportsPercentage(calculateReportsPercentageDifference(reports))
        return () => {
            setUsersPercentage(0)
            setPostsPercentage(0)
            setProjectsPercentage(0)
            setReportsPercentage(0)
        };
    }, [users, posts, projects, reports]);
    return (
        <>
            <div className={`data-cards`}>
                <Card title={`Utilisateurs`} icon={<Person />} percentage={usersPercentage} color={`linear-gradient(195deg, #0EB4C6, #35A2EB`} data={users?.length} />
                <Card title={`Projects`} icon={<FontAwesomeIcon icon={faCodeFork} />} percentage={projectsPercentage} data={projects?.length} />
                <Card title={`Posts`} icon={<FontAwesomeIcon icon={faPhotoFilm} />} color={`linear-gradient(195deg, rgb(102, 187, 106), rgb(67, 160, 71))`} percentage={postsPercentage} data={posts?.length} />
                <Card title={`Reports`} icon={<ReportIcon />} color={'linear-gradient(195deg, rgb(236, 64, 122), rgb(216, 27, 96))'} percentage={reportsPercentage} data={reports?.length} />
            </div>
            {/* <div className='users-chart'>
                <div className="angry-grid left-chart">
                    <AreaChart className="item-0" />
                    <UserPieChart className="item-1" />
                    <UserPieChart className="item-2" />
                    <UserPieChart className="item-3" />
                </div>
                <div className="angry-grid right-chart">
                    <LineChart className="item-0" />
                    <UserPieChart className="item-1" />
                    <UserPieChart className="item-2" />
                    <UserPieChart className="item-3" />
                </div>
            </div>
            <div className='users-chart'>
                <div className="angry-grid left-chart">
                    <AreaChart className="item-0" />
                    <UserPieChart className="item-1" />
                    <UserPieChart className="item-2" />
                    <UserPieChart className="item-3" />
                </div>
                <div className="angry-grid right-chart">
                    <LineChart className="item-0" />
                    <UserPieChart className="item-1" />
                    <UserPieChart className="item-2" />
                    <UserPieChart className="item-3" />
                </div>
            </div> */}
        </>
    );
}