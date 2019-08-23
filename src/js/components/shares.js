
import React, { Component } from "react";
import { Doughnut } from 'react-chartjs-2';

class Shares extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const chartData = {
            labels: this.props.holders,
            datasets: [
                {
                    data: this.props.shares,
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#867ADD',
                        '#FFF8DD',
                        '#5FBA7D',
                        '#B4B5C6'
                    ]
                }]
        }
        return (<div>
            <h2>Akcjonariat</h2>
            <div style={{ width: '100%', height: '100%' }}>
                <Doughnut height={200}
                    options={{ maintainAspectRatio: true }}
                    data={chartData} />
            </div>
        </div>
        )
    }
}

export { Shares };