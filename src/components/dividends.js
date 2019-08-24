
import React, { Component } from "react";
import { Bar } from 'react-chartjs-2';


class Dividends extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        const data = {
            labels: ['Dywidendy', 'Cena debiutu'],
            datasets: [
                {
                    label: 'Zwrot z inwestycji',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: [this.props.dividend, this.props.price]
                }
            ]
        };

        return (<><h2 style={{ paddingBottom: '5px' }}>Historia dywidendowa</h2><div style={{ height: '40%' }}><Bar data={data} width={50} options={{ legend: { display: false }, maintainAspectRatio: false, scales: { yAxes: [{ ticks: { beginAtZero: true } }] } }} /></div>
            <div style={{ height: '55%' }}>
                <table className="striped">

                    <tbody>
                        <tr>
                            <td>Dywidenda</td>
                            <td>{(this.props.actualYear.dividend)} PLN</td>
                        </tr>
                        <tr>
                            <td>Stopa dywidendy</td>
                            <td><strong>{((this.props.actualYear.dividend / this.props.actualYear.price.map(x => x.value)[3]) * 100).toFixed(2) + '%'}</strong></td>
                        </tr>
                        <tr>
                            <td>Suma dywidend od debiutu</td>
                            <td>{this.props.dividend.toFixed(2)} PLN</td>
                        </tr>
                        <tr>
                            <td>Stopa zwrotu od debiutu</td>
                            <td><strong>{((this.props.dividend / this.props.price) * 100).toFixed(2) + '%'}</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>);
    }
}

export { Dividends };