import { AreaChart } from "../../../components/CHARTS/exampleAriaChart";
import { LineChart } from "../../../components/CHARTS/exampleLineChart";
import { UserPieChart } from "../../../components/CHARTS/usersPieChart";
import '../adminStyle.css'
export default function MainDash() {
    return (
        <>
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