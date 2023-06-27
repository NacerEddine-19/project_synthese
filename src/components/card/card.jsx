import CountUp from 'react-countup';
import './card.css'

export default function Card({ title, icon, percentage, data, color }) {
    return (
        <div className={`parent-wraper`}>
            <div className={`sec-wraper`}>
                <div className="card">
                    <div className={`up-part`}>
                        <div className={`icon-part`} style={{ background: color }}>
                            {icon}
                        </div>
                        <div className={`info-part`}>
                            <span>{title}</span>
                            <CountUp end={data}>
                                {({ countUpRef }) => (
                                    <h4 ref={countUpRef}></h4>
                                )}
                            </CountUp>
                        </div>
                    </div>
                    <hr className="hr"></hr>
                    <div className={`down-part`}>
                        <p>
                            <span style={{ color: percentage[1] ? 'red' : 'rgb(76, 175, 80)' }}>{percentage[1] ? '-' : '+'}<CountUp end={percentage[0]} />% &nbsp;</span>
                            than last month
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}