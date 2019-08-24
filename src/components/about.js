
import React, { Component } from "react";



class About extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<>
            <table>
                <tbody>
                    <tr><td><p>{this.props.about}</p></td></tr>
                </tbody>
            </table>
        </>)
    }
}




export { About };