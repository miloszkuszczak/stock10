import React, { Component } from "react";
import { addSpace } from './utils.js';
import { toThousand } from './utils.js';


class Results extends Component {
    constructor() {
        super();
    }
    render() {

        return (<><h2>Wyniki finansowe</h2>
            <table>
                <thead>
                    <tr>
                        <th>Wynik</th>
                        <th>Wartość</th>
                        <th>Dynamika</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Przychody</th>
                        <td>{addSpace(toThousand(this.props.actualYear.incomes))} tys. PLN</td>
                        <td>{((this.props.actualYear.incomes - this.props.previousYear.incomes) / this.props.previousYear.incomes * 100).toFixed(2) + '%'}</td>
                    </tr>
                    <tr>
                        <th>Zysk operacyjny</th>
                        <td>{addSpace(toThousand(this.props.actualYear.operative_profit))} tys. PLN</td>
                        <td>{((this.props.actualYear.operative_profit - this.props.previousYear.operative_profit) / this.props.previousYear.operative_profit * 100).toFixed(2) + '%'}</td>
                    </tr>
                    <tr>
                        <th>Zysk netto</th>
                        <td>{addSpace(toThousand(this.props.actualYear.net_profit))} tys. PLN</td>
                        <td>{((this.props.actualYear.net_profit - this.props.previousYear.net_profit) / this.props.previousYear.net_profit * 100).toFixed(2) + '%'}</td>
                    </tr>
                    <tr>
                        <th>Zobowiązania</th>
                        <td>{addSpace(toThousand(this.props.actualYear.debts))} tys. PLN</td>
                        <td>{((this.props.actualYear.debts - this.props.previousYear.debts) / this.props.previousYear.debts * 100).toFixed(2) + '%'}</td>
                    </tr>
                    <tr>
                        <th>Koszty zarządu</th>
                        <td>{addSpace(toThousand(this.props.actualYear.cost_of_board))} tys. PLN</td>
                        <td>{((this.props.actualYear.cost_of_board - this.props.previousYear.cost_of_board) / this.props.previousYear.cost_of_board * 100).toFixed(2) + '%'}</td>
                    </tr>
                </tbody>
            </table>
        </>)
    }
}

export { Results };