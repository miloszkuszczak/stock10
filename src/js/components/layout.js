import React, { Component } from "react";
import Select from 'react-select';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCompany: '',
            clearable: true,
            searchable: true,
        }
    }
    render() {
        return <Select
            className='selector inHeader'
            name="companyNameSelector"
            placeholder='Wybierz spółkę'
            value=''
            onChange={this.props.handler}
            clearable={this.state.clearable}
            searchable={this.state.searchable}
            options={this.props.options}
        />
    }
}



class Header extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<>
            <h1>{this.props.stock.name}</h1>
            <h2>Ticker: {this.props.stock.ticker}</h2>
            <h3>Cena debiutu: {this.props.stock.price_IPO}</h3>
            <h3>Data debiutu: {this.props.stock.date_IPO}</h3>
            <Search options={this.props.options} handler={this.props.handler} /></>)
    }

}

class Cites extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<><h2><cite>{this.props.cite}</cite></h2> <h3>{this.props.author}</h3></>)
    }
}

export { Search, Header, Cites };