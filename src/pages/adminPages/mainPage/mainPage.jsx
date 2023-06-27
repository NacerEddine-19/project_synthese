import { Person } from "@material-ui/icons";
import { AreaChart } from "../../../components/CHARTS/exampleAriaChart";
import { LineChart } from "../../../components/CHARTS/exampleLineChart";
import { UserPieChart } from "../../../components/CHARTS/usersPieChart";
import Card from "../../../components/card/card";
import '../adminStyle.css'
export default function MainDash() {
    return (
        <>
            <div className={`data-cards`}>
                <Card title={`title1`} icon={<Person />} percentage={50} data={555} />
                <Card title={`title1`} icon={<Person />} percentage={50} data={555} />
                <Card title={`title1`} icon={<Person />} percentage={50} data={555} />
                <Card title={`title1`} icon={<Person />} percentage={50} data={555} />
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
            </div>
        </>
    );
}