
import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  HashRouter,
  Route,
  Link,
  Switch,
  NavLink,
} from 'react-router-dom';
import Select from 'react-select';
import { Lines } from 'react-preloaders';
import { Results } from './components/results.js';
import { LineGraph } from './components/linegraph.js';
import { Shares } from './components/shares.js';
import { Dividends } from './components/dividends.js';
import { FinFactor } from './components/finfactor.js';
import { StockInfo } from './components/stockinfo.js';
import { Cites, Header } from './components/layout.js';
import randomCite from './components/layout.js';

const rand = randomCite();


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
    fetch(`https://api.myjson.com/bins/gm49r`)
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
              <div>
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
            </div>
          </div>
        </>);
      } else {
        debugger;
        let currOptions = options.filter(item => { return item.value != sessionStorage.getItem('sessionSelectedCompany') })
        return (<><div className="stick-header"><header><Header stock={this.state.selectedStockData[0]} options={currOptions} handler={this.handler} /></header></div>
          <Main stock={this.state.selectedCompany} stockData={this.state.selectedStockData} />
        </>)
      }
    }
  }
}


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockCompany: this.props.stock,
      stockData: this.props.stockData[0],
      selectedYear: this.GetYearsToShow(this.props.stockData[0].years)[0],
      yearsToShow: [],
    }
  }

  componentWillReceiveProps(newProps) {
    debugger;
    this.setState({
      selectedYear: this.GetYearsToShow(newProps.stockData[0].years)[0],
    })
  }

  GetYearsToShow(years) {
    const yearsToShow = years.map(item => { return item.year }).sort((a, b) => { a > b });
    return yearsToShow;
  }

  componentDidMount() {
    debugger;
    let yearsToShow = this.GetYearsToShow(this.state.stockData.years);
    let selectedYear = yearsToShow[0];
    this.setState({ yearsToShow, selectedYear });
  }


  handleClick(e) {
    this.setState({
      selectedYear: e.target.value,
    })
  }


  render() {
    debugger;
    const yearsToShow = this.GetYearsToShow(this.props.stockData[0].years);
    const actualYear = this.state.selectedYear;
    const actualYearData = this.props.stockData[0].years.filter((elem) => { return elem.year == actualYear });
    const allDataFromStartToToday = this.props.stockData[0].years.filter((elem) => { return elem.year <= actualYear });
    const previousYearData = this.props.stockData[0].years.filter(elem => { return elem.year == (actualYear - 1) });
    const dividendsFromIPO = allDataFromStartToToday.map(item => parseFloat(item.dividend)).reduce((a, b) => (a + b));
    const shares = actualYearData[0].shareholders.map(x => [x.share]);
    const holders = actualYearData[0].shareholders.map(x => [x.holder]);
    const info = actualYearData[0].events.map(x => [x]);

    return (<>
      <div className="container">
        <div className="row">
          <div className="col-xs-12">

          </div>
          <div className="col-xs-3">
            <div className="element info">
              <>
                <h2>Informacje</h2>
                <StockInfo info={info} />
              </>
            </div></div>
          <div className="col-xs-6">
            <div className="element">
              <LineGraph data={actualYearData[0].price} />
            </div>
          </div>
          <div className="col-xs-3">
            <div className="element">
              <Dividends dividend={dividendsFromIPO} price={this.props.stockData[0].price_IPO} actualYear={actualYearData[0]} />
            </div>

          </div>
          <div className="col-xs-4 col-m-12">
            <div className="element">
              <div><FinFactor actualYear={actualYearData[0]} previousYear={previousYearData.length !== 0 ? previousYearData[0] : actualYearData[0]} /></div>
            </div>
          </div>
          <div className="col-xs-4">
            <div className="element">
              <Shares shares={shares} holders={holders} /></div>
          </div>
          <div className="col-xs-4">
            <div className="element">
              <div><Results actualYear={actualYearData[0]} previousYear={previousYearData.length !== 0 ? previousYearData[0] : actualYearData[0]} /></div>
            </div>
          </div>
        </div>
      </div>
      <div className="stick-footer"><footer><div className="navigation"><span className='line'>{yearsToShow.length > 0 ? yearsToShow.map(year => <button key={year} value={year} onClick={e => this.handleClick(e)} className="circle">{year}</button>) : ""}</span></div></footer>
      </div>
    </>
    )
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



ReactDOM.render(<App />, document.getElementById("app"))