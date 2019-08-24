import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  HashRouter,
  Route,
} from 'react-router-dom';
import Select from 'react-select';
import { Lines } from 'react-preloaders';
import { Cites, Header } from './components/layout.js';
import { randomCite } from './components/utils.js';
import { Main } from './components/main.js';

import './scss/main.scss';



class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this)
    this.state = {
      changeSite: false,
      author: '',
      cite: '',
      stockData: '',
      selectedStockData: '',
      selectedCompany: '',
      stockNames: [],
      clearable: true,
      searchable: true,
    }
  }

  handler(searchCompany) {
    sessionStorage.setItem("sessionSelectedCompany", searchCompany.value);
    let selectedStockData = "";
    if (searchCompany.value) {
      selectedStockData = this.state.stockData.stocks.filter(x => x.name === searchCompany.value);
    }
    this.setState({
      selectedCompany: searchCompany.value,
      selectedStockData: selectedStockData ? selectedStockData : "",

    })
  }



  componentDidMount() {
    const rand = randomCite();
    fetch(`https://api.myjson.com/bins/1eqaph`)  //https://api.myjson.com/bins/ak3a5
      .then(res => res.json())
      .then(data => {
        let stockNames = data.stocks.map(x => x.name);
        let sessionCompany = sessionStorage.getItem("sessionSelectedCompany");
        let selectedStockData = "";
        let randomCite = rand;
        if (sessionCompany) {
          selectedStockData = data.stocks.filter(x => x.name === sessionCompany);
        }

        this.setState({
          stockNames,
          stockData: data,
          selectedCompany: sessionCompany ? sessionCompany : "",
          selectedStockData: selectedStockData ? selectedStockData : "",
          author: randomCite.author,
          cite: randomCite.cite,
        });
      });
  }
  handleClick(e) {
    const rand = randomCite();
    this.setState({
      author: rand.author,
      cite: rand.cite,
    })
  }


  handleChange = selectedCompany => {
    sessionStorage.setItem('sessionSelectedCompany', selectedCompany.value);
    let selectedStockData = this.state.stockData.stocks.filter(x => x.name === selectedCompany.value);
    this.setState({ selectedCompany: selectedCompany.value, selectedStockData });
  };

  render() {
    if (!this.state.stockData) {
      return (<><Lines /></>);
    } else {
      let options = this.state.stockNames.map(function (stockName) {
        return { value: stockName, label: stockName };
      })

      if (!this.state.selectedCompany && !this.state.selectedStockData) {
        return (<>
          <div className="entryImg">
            <div className='centerDiv'>
              <div className="blackBack"></div>
              <div style={{ display: "flex" }}>
                <Select
                  className='selector'
                  name="companyNameSelector"
                  placeholder='Wybierz spółkę'
                  value={this.state.selectedCompany.value}
                  onChange={this.handleChange}
                  clearable={this.state.clearable}
                  searchable={this.state.searchable}
                  options={options}
                />
              </div>
              <Cites author={this.state.author} cite={this.state.cite} />
              <a className="cite" onClick={e => this.handleClick(e)}><i className="material-icons">autorenew</i>Losuj inny cytat</a>
            </div>

          </div>
        </>);
      } else {
        let currOptions = options.filter(item => { return item.value != sessionStorage.getItem('sessionSelectedCompany') })
        return (<><div className="stick-header"><header><Header stock={this.state.selectedStockData[0]} options={currOptions} handler={this.handler} /></header></div>
          <Main stock={this.state.selectedCompany} stockData={this.state.selectedStockData} />
        </>)
      }
    }
  }
}



class App extends Component {

  render() {
    return (<HashRouter>
      <>
        <Route exact path='/' component={LandingPage} />
        <Route path='/main' component={Main} />
      </>
    </HashRouter>
    )
  }
}




export default App;
