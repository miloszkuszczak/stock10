
import React, { Component } from "react";
import { capitalFirst } from './utils.js'



class StockInfo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<>
      <table>
        <tbody>
          {this.props.info.map((event, index) => <tr key={index}><td><p>{capitalFirst(event)}</p></td></tr>)}
        </tbody>
      </table>
    </>)
  }
}




export { StockInfo };