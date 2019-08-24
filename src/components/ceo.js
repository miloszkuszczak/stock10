import React, { Component } from "react";



class Ceo extends Component {
    constructor() {
        super();
    }
    render() {

        return (<><h2>Władze spółki</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Prezes</th>
                        <td>{this.props.board[0]}</td>
                    </tr>
                    <tr>
                        <th>Wiceprezes</th>
                        <td>{this.props.board[1]}</td>
                    </tr>
                    {this.props.board[2] != null ? <tr>
                        <th>2-gi Wiceprezes</th>
                        <td>{this.props.board[2]}</td>
                    </tr> : null}
                </tbody>
            </table>
        </>)
    }
}

export { Ceo };