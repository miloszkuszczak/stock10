
import React, { Component } from "react";
import { Line } from 'react-chartjs-2';

class LineGraph extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const chartData = this.props.data.map(x => [x.value]);
        const chartLabel = this.props.data.map(x => [x.month]);
        const data = {
            labels: chartLabel,
            datasets: [
                {
                    label: 'Kurs akcji',
                    fill: true,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 3,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: chartData,
                }
            ]
        };


        return (<>
            <Line data={data} width={90} options={{ legend: { display: false }, maintainAspectRatio: false }} />

        </>
        )
    }
}

export { LineGraph };