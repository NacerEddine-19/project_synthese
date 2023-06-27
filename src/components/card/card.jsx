import './card.css'

export default function Card({ title, icon, percentage,data }) {
    return (
        <div className={`parent-wraper`}>
            <div className={`sec-wraper`}>
                <div className="card">
                    <div className={`up-part`}>
                        <div className={`icon-part`}>
                            {icon}
                        </div>
                        <div className={`info-part`}>
                            <span>{title}</span>
                            <h4>{data}</h4>
                        </div>
                    </div>
                    <hr className="hr"></hr>
                    <div className={`down-part`}>
                        <p>
                            <span>+{percentage}% &nbsp;</span>
                            leriumzxcvbjvnnvbcfnc
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}