import React, { Component } from "react";
import { addSpace, toThousand } from "./utils.js";

class FinFactor extends Component {
    constructor() {
        super();
    }
    render() {
        const currCapital = (parseFloat(this.props.actualYear.equites) * this.props.actualYear.price.map(x => x.value)[11]).toFixed(2);
        const prevCapital = (parseFloat(this.props.previousYear.equites) * this.props.previousYear.price.map(x => x.value)[11]).toFixed(2);
        const currAccVal = (parseFloat(this.props.actualYear.acc_value) * this.props.actualYear.equites);
        const prevAccVal = (parseFloat(this.props.previousYear.acc_value) * this.props.previousYear.equites);
        const lastPrice = this.props.actualYear.price.map(x => x.value)[11];
        const yearBeforePrice = this.props.previousYear.price.map(x => x.value)[11];
        const priceToProfit = parseFloat(lastPrice / (currAccVal / this.props.actualYear.equites)).toFixed(2);
        const priceToValue = parseFloat(lastPrice / (this.props.actualYear.net_profit / this.props.actualYear.equites)).toFixed(2);
        const prevPriceToProfit = parseFloat(yearBeforePrice / (prevAccVal / this.props.previousYear.equites)).toFixed(2);
        const prevPriceToValue = parseFloat(yearBeforePrice / (this.props.previousYear.net_profit / this.props.previousYear.equites)).toFixed(2);

        return (<><h2>Wskaźniki finansowe</h2>
            <table>
                <thead>
                    <tr>
                        <th>Wskaźnik</th>
                        <th>Wartość</th>
                        <th>Zmiana r / r</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Kapitalizacja</th>
                        <td>{addSpace(toThousand(currCapital))} tys. PLN</td>
                        <td>{((currCapital - prevCapital) / prevCapital * 100).toFixed(2) + '%'}</td>
                    </tr>
                    <tr>
                        <th>C/Z</th>
                        <td>{priceToProfit}</td>
                        <td>{(Math.abs(priceToProfit - prevPriceToProfit) / prevPriceToProfit * 100).toFixed(2) + '%'}</td>
                    </tr>
                    <tr>
                        <th>C/WK</th>
                        <td>{priceToValue}</td>
                        <td>{(Math.abs(priceToValue - prevPriceToValue) / prevPriceToValue * 100).toFixed(2) + '%'}</td>
                    </tr>
                    <tr>
                        <th>Wskaźnik W. Buffeta</th>
                        <td>{(priceToProfit * priceToValue).toFixed(2) > 20 || (priceToProfit * priceToValue).toFixed(2) < 0 ? <span style={{ color: 'orange' }}>{(priceToProfit * priceToValue).toFixed(2)}</span> : <span style={{ color: 'green' }}>{(priceToProfit * priceToValue).toFixed(2)}</span>}</td>
                        <td>{(Math.abs((prevPriceToProfit * prevPriceToValue) - (priceToProfit * priceToValue)) / (prevPriceToProfit * prevPriceToValue) * 100).toFixed(2) + '%'}</td>
                    </tr>
                    <tr>
                        <th>Liczba akcji</th>
                        <td>{addSpace(toThousand(this.props.actualYear.equites))} tys. szt.</td>
                        <td>{(this.props.actualYear.equites - this.props.previousYear.equites) / 1000} tys. szt.</td>
                    </tr>
                </tbody>
            </table>
        </>)
    }
}
export { FinFactor };  