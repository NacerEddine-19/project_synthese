import { Person } from "@material-ui/icons";
import './test.css'
import Card from "../../components/card/card";

export default function Test() {
    return (
        <>
            <div className={`test`}>
                <Card title={`title1`} icon={<Person />} percentage={50} data={555} />
                <Card title={`title1`} icon={<Person />} percentage={50} data={555} />
                <Card title={`title1`} icon={<Person />} percentage={50} data={555} />
                <Card title={`title1`} icon={<Person />} percentage={50} data={555} />
            </div>
        </>
    );
}