
import React, { Component } from "react";
import { Results } from './results.js';
import { LineGraph } from './linegraph.js';
import { Shares } from './shares.js';
import { Dividends } from './dividends.js';
import { FinFactor } from './finfactor.js';
import { StockInfo } from './stockinfo.js';
import { About } from './about.js';
import { Ceo } from './ceo.js';
import { Summary } from './summary.js';
import { ProfitGraph } from "./profitgraph.js";


const currYear = new Date().getFullYear();

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

    componentWillMount() {
        document.body.style.overflow = "auto";
        document.body.style.position = "absolute";
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            selectedYear: this.GetYearsToShow(newProps.stockData[0].years)[0],
        })
    }

    GetYearsToShow(years) {
        const yearsToShow = years.map(item => { return item.year }).sort((a, b) => { a > b });
        return yearsToShow;
    }

    componentDidMount() {
        this.setElementsAnimation();
        let yearsToShow = this.GetYearsToShow(this.state.stockData.years);
        let selectedYear = yearsToShow[0];
        this.setState({ yearsToShow, selectedYear });
    }

    setElementsAnimation() {
        const elements = document.getElementsByClassName("element");
        for (let el of elements) {
            el.classList.add("animation");
        }
    }


    refreshElementsAnimation() {
        this.removeElementsAnimation();
        setTimeout(
            function () {
                this.setElementsAnimation();
            }
                .bind(this),
            1000
        );
    }

    removeElementsAnimation() {
        const elements = document.getElementsByClassName("element");
        for (let el of elements) {
            el.classList.remove("animation");
        }
    }

    handleClick(e) {
        debugger;
        this.setState({
            selectedYear: e.target.value,
        })

    }


    render() {
        const yearsToShow = this.GetYearsToShow(this.props.stockData[0].years);
        const actualYear = this.state.selectedYear;
        const actualYearData = this.props.stockData[0].years.filter((elem) => { return elem.year == actualYear });
        const allDataFromStartToToday = this.props.stockData[0].years.filter((elem) => { return elem.year <= actualYear });
        const dataForProfitGraph = this.props.stockData[0].years.filter((elem) => { return elem.year < actualYear });
        const previousYearData = this.props.stockData[0].years.filter(elem => { return elem.year == (actualYear - 1) });
        const dividendsFromIPO = allDataFromStartToToday.map(item => parseFloat(item.dividend)).reduce((a, b) => (a + b));
        const shares = actualYearData[0].shareholders.map(x => [x.share]);
        const holders = actualYearData[0].shareholders.map(x => [x.holder]);
        const info = actualYearData[0].events.map(x => [x]);


        if (currYear == actualYear) {


            return (<>
                <div className="container">
                    <div className="row">

                        <div className="col-xs-12 col-m-6 col-l-3">
                            <div className="element info">
                                {/* <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={1500} transitionLeaveTimeout={1300}> */}
                                <h2>Działalność spółki</h2>
                                <About about={this.props.stockData[0].about} />
                                {/* </ReactCSSTransitionGroup> */}
                            </div>
                        </div>

                        <div className="col-xs-6 col-m-6 col-l-3">
                            <div className="element">
                                <Ceo board={actualYearData[0].board.length == 0 ? 'Brak informacji o władzach' : actualYearData[0].board} />
                            </div>
                        </div>

                        <div className="col-xs-6 col-m-6 col-l-3">
                            <div className="element">
                                <Shares shares={shares} holders={holders} />
                            </div>
                        </div>

                        <div className="col-xs-12 col-m-6 col-l-3">
                            <div className="element">
                                <Dividends dividend={dividendsFromIPO} price={this.props.stockData[0].price_IPO} actualYear={actualYearData[0]} />
                            </div>
                        </div>

                        <div className="col-xs-12 col-m-6 col-l-4">
                            <div className="element">
                                <Summary dividend={dividendsFromIPO} data={allDataFromStartToToday} priceIPO={this.props.stockData[0].price_IPO} />
                            </div>
                        </div>

                        <div className="col-xs-12 col-m-6 col-l-8">
                            <div className="element">
                                <ProfitGraph data={dataForProfitGraph} />
                            </div>
                        </div>
                    </div>
                </div>
                <footer>
                    <div className="stick-footer"><div className="navigation">{yearsToShow.length > 0 ? yearsToShow.map(year => <button key={year} value={year} onClick={e => this.handleClick(e)} className={year == currYear ? "circle currYear" : "circle"}>{year == currYear ? 'O spółce' : year}</button>) : ""}</div></div>
                </footer>
            </>
            )
        } else {
            return (<>
                <div className="container">
                    <div className="row">

                        <div className="col-xs-12 col-m-4 col-l-3">
                            <div className="element info">
                                <h2>Informacje</h2>
                                <StockInfo info={info} />
                            </div></div>
                        <div className="col-xs-12 col-m-8 col-l-6">
                            <div className="element">
                                <LineGraph data={actualYearData[0].price} />
                            </div>
                        </div>
                        <div className="col-xs-12 col-m-6 col-l-3">
                            <div className="element">
                                <Dividends dividend={dividendsFromIPO} price={this.props.stockData[0].price_IPO} actualYear={actualYearData[0]} />
                            </div>
                        </div>
                        <div className="col-xs-7 col-m-6 col-l-4">
                            <div className="element">
                                <div><FinFactor actualYear={actualYearData[0]} previousYear={previousYearData.length !== 0 ? previousYearData[0] : actualYearData[0]} /></div>
                            </div>
                        </div>
                        <div className="col-xs-5 col-m-6 col-l-4">
                            <div className="element">
                                <Shares shares={shares} holders={holders} /></div>
                        </div>
                        <div className="col-xs-12 col-m-6 col-l-4">
                            <div className="element">
                                <div><Results actualYear={actualYearData[0]} previousYear={previousYearData.length !== 0 ? previousYearData[0] : actualYearData[0]} /></div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer>
                    <div className="stick-footer"><div className="navigation">{yearsToShow.length > 0 ? yearsToShow.map(year => <button key={year} value={year} onClick={e => this.handleClick(e)} className={year == currYear ? "circle currYear" : "circle"}>{year == currYear ? 'O spółce' : year}</button>) : ""}</div></div>
                </footer>
            </>)
        }
    }
}

export { Main };