import { useState } from "react";
import { Person } from "@material-ui/icons";
import ReportIcon from '@mui/icons-material/Report';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeFork, faPhotoFilm } from "@fortawesome/free-solid-svg-icons";

import { PieChart } from "../../../components/CHARTS/usersPieChart";
import Card from "../../../components/card/card";
import '../adminStyle.css'
import { useEffect } from "react";
import request from "../../../utils/request";
import { AreaChart } from "../../../components/CHARTS/ariaChart";
import { LineChart } from "../../../components/CHARTS/exampleLineChart";

const API = process.env.REACT_APP_SERVER_API;
export default function MainDash() {
    // ** GLOBAL vars **/
    // Get the start and end dates for the last year
    const endDate = new Date(); // Current date
    const startDate = new Date(endDate.getFullYear(), -1); // January of the current year
    // ** DATA vars **/
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [posts, setPosts] = useState([]);
    const [reports, setReports] = useState([]);
    // ** Card vars **/
    const [usersPercentage, setUsersPercentage] = useState([]);
    const [projectsPercentage, setProjectsPercentage] = useState([]);
    const [postsPercentage, setPostsPercentage] = useState([]);
    const [reportsPercentage, setReportsPercentage] = useState([]);
    // ** Pie vars **/
    // users count
    const [adminsCount, setAdminsCount] = useState(0);
    const [stagiersCount, setStagiersCount] = useState(0);
    const [superAdminsCount, setSuperAdminsCount] = useState(0);
    // ** Line vars **/
    const [usersCountPerMonth, setUsersCountPerMonth] = useState([]);
    const [projectsCountPerMonth, setProjectsCountPerMonth] = useState([]);
    const [postsCountPerMonth, setPostsCountPerMonth] = useState([]);
    const [reportsCountPerMonth, setReportsCountPerMonth] = useState([]);

    // array from all groups available
    const groups = [];
    users?.forEach(user => {
        if (!groups.includes(`${user?.group}`) && user?.group !== null) {
            groups.push(`${user?.group}`)
        }
    })
    //sort users by groups
    const userCountsByGroup = groups?.map((group) => {
        const userInGroup = users?.filter((user) => {
            return `${user?.group}` === group;
        });
        return userInGroup.length;
    })
    // array from all cities available
    const cities = [];
    users?.forEach(user => {
        if (!cities.includes(user?.city)) {
            cities.push(user?.city)
        }
    })
    //sort users by cities 
    const userCountsByCity = cities?.map((city) => {
        const userInCity = users?.filter((user) => {
            return user?.city === city;
        });
        return userInCity.length;
    })
    // console.log(projects);
    // Create an array to store unique language names
    const languages = [];
    projects?.forEach(project => project.languages.forEach(language => {
        if (!languages.includes(language.name)) {
            languages.push(language.name);
        }
    })
    );
    // Create an array to store the project counts for each language
    const projectCountsByLanguage = languages.map(language => {
        // Filter the projects array to get projects associated with the current language
        const projectsInLanguage = projects.filter(project => {
            return project.languages.some(lang => lang.name === language);
        });

        // Return the count of projects for the current language
        return projectsInLanguage.length;
    });
    const combinedData = languages.map((language, index) => {
        return {
            language: language,
            count: projectCountsByLanguage[index]
        };
    });

    // Sort the combined data array by count in descending order
    combinedData.sort((a, b) => b.count - a.count);
    // Separate the combined data into separate arrays for languages and counts
    const sortedLanguages = combinedData.map(item => item.language);
    const sortedCounts = combinedData.map(item => item.count);
    // Generate an array of months between the start and end dates
    const months = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
        months.push(currentDate?.toLocaleString('en-us', { month: 'long' }));
        currentDate?.setMonth(currentDate?.getMonth() + 1);
    };

    function getItemsCountPerMonth(dataset) {
        // Sort the dataset by the "created_at" field in ascending order
        const sortedDataset = dataset?.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        // Count the number of users for each month
        const itemCounts = months?.map((month) => {
            const monthStart = new Date(month + ' 1, ' + startDate.getFullYear());
            const monthEnd = new Date(month + ' 31, ' + startDate.getFullYear());

            const itemsInMonth = sortedDataset?.filter((item) => {
                const createdAt = new Date(item?.created_at);
                return createdAt >= monthStart && createdAt <= monthEnd;
            });

            return itemsInMonth?.length;
        });
        return itemCounts;
    }

    function calculateReportsPercentageDifference(data) {
        if (data.length > 0) {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1
            const currentYear = currentDate.getFullYear();
            let minus = false;


            const currentMonthData = data?.filter((item) => {
                const dataDate = new Date(item.created_at);
                return (
                    dataDate.getMonth() + 1 === currentMonth &&
                    dataDate.getFullYear() === currentYear
                );
            });

            const previousMonthData = data?.filter((item) => {
                const dataDate = new Date(item.created_at);
                const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
                const previousYear =
                    currentMonth === 1 ? currentYear - 1 : currentYear;
                return (
                    dataDate.getMonth() + 1 === previousMonth &&
                    dataDate.getFullYear() === previousYear
                );
            });

            const currentMonthCount = currentMonthData?.length;
            const previousMonthCount = previousMonthData?.length;
            // console.log({ currentMonthCount, previousMonthCount });

            if (currentMonthCount < previousMonthCount) {
                minus = true;
            }

            const percentageDifference =
                ((currentMonthCount - previousMonthCount) / data?.length) * 100;

            return [percentageDifference === Infinity ? 100 : percentageDifference === -Infinity ? -100 : percentageDifference?.toFixed(2), minus];
        }
    }

    useEffect(() => {
        request.get(`${API}/users`)
            .then(res => {
                setUsers(res?.data)
                return res?.data;
            })
            .then(data => {
                let adminCount = 0;
                let stagierCount = 0;
                let superAdminCount = 0;

                data.forEach(user => {
                    if (user.role === 'admin') {
                        adminCount++;
                    } else if (user.role === 'stagier') {
                        stagierCount++;
                    } else if (user.role === 'super_admin') {
                        superAdminCount++;
                    }
                });

                setAdminsCount(adminCount);
                setStagiersCount(stagierCount);
                setSuperAdminsCount(superAdminCount);
            })
            .catch(error => {
                console.log(error);
            });
        request.get(`${API}/posts`)
            .then(res => setPosts(res?.data?.posts));
        request.get(`${API}/projects`)
            .then(res => setProjects(res?.data))
        request.get(`${API}/reports`)
            .then(res => setReports(res?.data))
        return () => {
            setUsers([])
            setPosts([])
            setProjects([])
            setReports([])
        };
    }, []);
    useEffect(() => {
        if (users.length > 0 && posts.length > 0 && projects.length > 0 && reports.length > 0) {
            setUsersPercentage(calculateReportsPercentageDifference(users))
            setPostsPercentage(calculateReportsPercentageDifference(posts))
            setProjectsPercentage(calculateReportsPercentageDifference(projects))
            setReportsPercentage(calculateReportsPercentageDifference(reports))
        }
        return () => {
            setUsersPercentage([])
            setPostsPercentage([])
            setProjectsPercentage([])
            setReportsPercentage([])
        };
    }, [users, posts, projects, reports]);
    useEffect(() => {
        if (users.length > 0 && posts.length > 0 && projects.length > 0 && reports.length > 0) {
            setUsersCountPerMonth(getItemsCountPerMonth(users))
            setProjectsCountPerMonth(getItemsCountPerMonth(projects))
            setPostsCountPerMonth(getItemsCountPerMonth(posts))
            setReportsCountPerMonth(getItemsCountPerMonth(reports))
        }
        return () => {
            setUsersCountPerMonth([])
            setProjectsCountPerMonth([])
            setPostsCountPerMonth([])
            setReportsCountPerMonth([])
        };
    }, [users, posts, projects, reports]);
    return (
        <>
            <div className={`data-cards`}>
                <Card
                    title={`Utilisateurs`}
                    icon={<Person />}
                    percentage={usersPercentage}
                    data={users?.length}
                    color={`linear-gradient(195deg, #0EB4C6, #35A2EB`}
                />
                <Card
                    title={`Projects`}
                    icon={<FontAwesomeIcon icon={faCodeFork} />}
                    percentage={projectsPercentage}
                    data={projects?.length}
                />
                <Card
                    title={`Posts`}
                    icon={<FontAwesomeIcon icon={faPhotoFilm} />}
                    percentage={postsPercentage}
                    data={posts?.length}
                    color={`linear-gradient(195deg, rgb(102, 187, 106), rgb(67, 160, 71))`}
                />
                <Card
                    title={`Reports`}
                    icon={<ReportIcon />}
                    percentage={reportsPercentage}
                    data={reports?.length}
                    color={'linear-gradient(195deg, rgb(236, 64, 122), rgb(216, 27, 96))'}
                />
            </div>
            <div className='users-chart'>
                <div className="angry-grid left-chart">
                    <AreaChart
                        className="item-0"
                        months={months}
                        itemCountsPerMonth={usersCountPerMonth}
                        title={'Users Count by Month for this year'}
                    />
                    <PieChart
                        className="item-1"
                        data={[adminsCount, stagiersCount, superAdminsCount]}
                        labels={['Admin', 'Stagier', 'Super Admin']}
                        title={`users by roles`} />
                    <PieChart
                        className="item-2"
                        data={userCountsByGroup}
                        labels={groups}
                        title={`users by groups`} />
                    <PieChart
                        className="item-3"
                        data={userCountsByCity}
                        labels={cities}
                        title={`users by roles`} />
                </div>
                <div className="angry-grid right-chart">
                    <LineChart
                        className="item-0"
                        months={months}
                        itemCountsPerMonth={postsCountPerMonth}
                        label={`posts`}
                        itemCountsPerMonth2={projectsCountPerMonth}
                        label2={`project`}
                        title={'Projects count by months for this year'}
                    />
                    <PieChart
                        className="item-1"
                        data={sortedCounts.splice(0, 5)}
                        labels={sortedLanguages.splice(0, 5)}
                        title={`Top 5 most used Languages`} />
                    <PieChart
                        className="item-2"
                        data={[adminsCount, stagiersCount, superAdminsCount]}
                        labels={['Admin', 'Stagier', 'Super Admin']}
                        title={`users by roles`} />
                    <PieChart
                        className="item-3"
                        data={[adminsCount, stagiersCount, superAdminsCount]}
                        labels={['Admin', 'Stagier', 'Super Admin']}
                        title={`users by roles`} />
                </div>
            </div>
        </>
    );
}