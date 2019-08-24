import React, { Component } from "react";
import { Bar } from 'react-chartjs-2';
import { toThousand } from './utils.js';

class ProfitGraph extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const rev_data = this.props.data.reverse();
        const profits = rev_data.map(item => toThousand([parseFloat(item.operative_profit)]));
        const incomes = rev_data.map(item => toThousand([parseFloat(item.incomes)]));
        const labels = rev_data.map(item => [parseFloat(item.year)]);

        const data = {
            datasets: [{
                label: 'Przychody (tys. PLN)',
                type: 'line',
                data: incomes,
                fill: false,
                borderColor: 'rgba(165, 105, 189, 0.65)',
                backgroundColor: 'rgba(165, 105, 189, 0.65)  ',
                pointBorderColor: 'rgba(165, 105, 189, 0.65)',
                pointBackgroundColor: '#D2B4DE',
                pointHoverBackgroundColor: '#BB8FCE',
                pointHoverBorderColor: '#BB8FCE',
                yAxisID: 'y-axis-2'
            }, {
                type: 'bar',
                label: 'Zysk operacyjny (tys. PLN)',
                data: profits,
                fill: false,
                backgroundColor: 'rgba(133, 193, 233  ,0.65)',
                borderColor: 'rgba(133, 193, 233  ,0.65)',
                hoverBackgroundColor: 'rgba(93, 173, 226, 0.75)',
                hoverBorderColor: 'rgba(93, 173, 226, 0.75)',
                yAxisID: 'y-axis-1'
            }]
        };

        const options = {
            responsive: true,
            tooltips: {
                mode: 'label'
            },
            elements: {
                line: {
                    fill: false
                }
            },
            maintainAspectRatio: false,
            scales: {
                xAxes: [
                    {
                        display: true,
                        gridLines: {
                            display: false
                        },
                        labels: labels,
                    },
                ],
                yAxes: [
                    {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        id: 'y-axis-1',
                        gridLines: {
                            display: true
                        },
                        labels: {
                            show: true
                        }
                    },
                    {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        id: 'y-axis-2',
                        gridLines: {
                            display: false
                        },
                        labels: {
                            show: true
                        }
                    }
                ]
            }
        };
        return (<div>
            <h2>Przychody do zysku operacyjnego</h2>
            <div style={{ width: '100%', height: '100%' }}>
                <Bar
                    data={data}
                    options={options}
                    height={300}

                />
            </div>
        </div>
        )
    };

}

export { ProfitGraph };