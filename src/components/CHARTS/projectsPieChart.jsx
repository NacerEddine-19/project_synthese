import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import request from '../../utils/request';

ChartJS.register(ArcElement, Tooltip, Legend);

export function UserPieChart({ className }) {
    const API = process.env.REACT_APP_SERVER_API;
    const [fetchedData, setFetchedData] = useState();
    const labels = ['Admin', 'Stagier', 'Super Admin'];
    const [dataChart, setData] = useState();
    const [admins, setAdmins] = useState(0);
    const [stagiers, setStagiers] = useState(0);
    const [superAdmins, setSuperAdmins] = useState(0);

    useEffect(() => {
        request.get(`${API}/Projects`)
            .then(res => {
                setFetchedData(res.data);
                return res.data;
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

                setAdmins(adminCount);
                setStagiers(stagierCount);
                setSuperAdmins(superAdminCount);
            })
            .catch(error => {
                console.log(error);
            });
    }, [API]);

    useEffect(() => {
        setData({
            labels: labels,
            datasets: [
                {
                    label: ' COUNT ',
                    data: [admins, stagiers, superAdmins],
                    backgroundColor: [
                        '#C4B0FF',
                        '#4942E4',
                        '#8696FE',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        });
    }, [admins, stagiers, superAdmins]);

    return (
        <>
            {dataChart && <div className={`${className} pie-chart`}>
                <Pie data={dataChart} />
            </div>}
        </>
    );
}
