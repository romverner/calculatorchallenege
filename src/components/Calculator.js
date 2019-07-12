import React, { Component } from 'react';

const topStyle = { fontSize: "60% !important" };
const buttonStyle = { width: "30vw" };

class Calculator extends Component {

    constructor() {
        super();
        this.state = {
            people: 1.00,
            pay: 0.00,
            total: 0.00,
            tip: 15.00,
            tipPay: 0.00,
            totalPay: 0.00,
            color: { color: 'green'}
        };
    };

    componentDidMount() {
        this.paymentCalculator();
    }

    // Limits the total bill to prevent formatting isues on front-end
    totalTracker = event => {
        let total = event.target.value;
        if (total < 0) {
            this.setState({
                total: 0.00
            });
        } else if (total > 10000) {
            this.setState({
                total: 9999.99
            });
        } else if (total) {
            this.setState({
                total: total
            });
        } else {
            this.setState({
                total: 0.00
            });
        };
    };

    // Error handling, and limits the number of people to 100
    personTracker = event => {
        let people = event.target.value;
        if (people <= 0) {
            this.setState({
                people: 1
            });
        } else if (people > 100) {
            this.setState({
                people: 100
            });
        } else if (people) {
            this.setState({
                people: people
            });
        } else {
            this.setState({
                people: 1
            });
        };
    };

    // Error handling for tip entries
    tipTracker = event => {
        let tip = Math.abs(event.target.value);
        if (tip > 100) {
            this.setState({
                tip: 100
            });
        } else if (tip) {
            this.setState({
                tip: tip
            });
        } else {
            this.setState({
                tip: 0
            });
        };
        
        this.colorChecker(tip);
    };

    // A fun color-checker to encourage higher tips
    colorChecker = (num) => {
        if (num >= 25) {
            this.setState({ color: {color: "gold" }});
        } else if (num >= 13) {
            this.setState({
                color: { color: "green" }
            });
        } else if (num >= 9 ) {
            this.setState({
                color: {color: "lightcoral"}
            });
        } else {
            this.setState({
                color: {color: "red" }
            });
        };
    };

    paymentCalculator = (expression) => {
        let people = this.state.people;
        let total = this.state.total;
        let tipPercent = this.state.tip / 100.00;
        let tipTotal = 0.00;
        let pay = 0.00;

        switch (expression) {
            // If rounding tip...
            case 'tip':
                tipTotal = parseFloat(total) * tipPercent;
                tipTotal = Math.round(parseFloat(tipTotal) / parseFloat(people));
                pay      = (parseFloat(total) + parseFloat(tipTotal) * parseFloat(people)) / parseFloat(people);
                break;
            // If rounding pay...
            case 'pay':
                let diff = 0;
                diff = Math.round(this.state.pay) - this.state.pay;

                pay = Math.round(this.state.pay);
                tipTotal = this.state.tipPay + diff;
                break;
            // Base calculation
            default:
                tipTotal = parseFloat(total) * tipPercent;
                pay      = (parseFloat(total) + parseFloat(tipTotal)) / parseFloat(people);
                tipTotal = parseFloat(tipTotal) / parseFloat(people);
                break;
        };

        this.setState({
            pay: pay,
            tipPay: tipTotal,
            totalPay: pay * people
        });
    };

    // Rounds tip to the nearest whole-dollar value
    roundTip = () => {
        this.paymentCalculator('tip');
    };

    // Rounds pay to the nearest whole-dollar value
    roundPay = () => {
        this.paymentCalculator('pay')
    }
    
    // Renders the entire calculator to the screen.
    render() {
        return (
            <div className="container" >
                <div className="">
                    <div className="row mb-3">
                        <div className="col-12" onClick={this.paymentCalculator}>
                            <h1>You Pay:</h1>
                            <h1>${this.state.pay.toFixed(2)} </h1><span style={topStyle}>of which ${this.state.tipPay.toFixed(2)} is <b>tip</b>.</span>
                        </div>
                    </div>
                    <div className="row mb-3 bg-light">
                        <div className="col-4 text-center pt-2">
                            <h5>Bill:</h5>
                            <h4>${this.state.total}</h4>
                        </div>
                        <div className="col-4 pt-2" onClick={this.roundTip}>
                            <h5>Tip:</h5>
                            <h4><span style={this.state.color}>{this.state.tip}</span>%</h4>
                        </div>
                        <div className="border-left col-4 pt-2" onClick={this.roundPay}>
                            <h5>Total:</h5>
                            <h4>${parseFloat(this.state.totalPay).toFixed(2)}</h4>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-4 text-right">
                            <h4>Bill:</h4>
                        </div>
                        <div className="col-5 text-left">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">$</span>
                                </div>
                                <input className="input-group form-control" type="number" name="total" placeholder="0.00" onChange={this.totalTracker}></input>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-4 text-right">
                            <h4>People:</h4>
                        </div>
                        <div className="col-5 text-left">
                            <input className="input-group form-control" type="number" name="people" maxLength="2" placeholder="Optional: Enter the amount of people splitting the bill." onChange={this.personTracker}></input>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-4 text-right">
                            <h4>Tip:</h4>
                        </div>
                        <div className="col-5 text-left">
                            <div className="input-group">
                            <input className="input-group form-control" type="number" name="tip" maxLength="2" placeholder="Enter desired percent tip." onChange={this.tipTracker}></input>
                            <div className="input-group-append">
                                <span className="input-group-text">%</span>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4 pb-3">
                        <div className="col-4 text-right">
                        </div>
                        <div className="col-5 text-left">
                            <button className="btn btn-success" style={buttonStyle} onClick={this.paymentCalculator}>Calculate</button>
                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className="col-4 text-right">
                        </div>
                        <div className="col-5 text-left">
                            <button className="btn btn-info" style={buttonStyle} onClick={this.roundTip}>Round Tip</button>
                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className="col-4 text-right">
                        </div>
                        <div className="col-5 text-left">
                            <button className="btn btn-info" style={buttonStyle} onClick={this.roundPay}>Round Pay</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default Calculator;