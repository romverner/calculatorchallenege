import React, { Component } from 'react';

const topStyle = {
    fontSize: "60% !important"
};

const green = {
    color: "green"
}

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            people: 1.00,
            pay: 0.00,
            tax: 0.00,
            total: 0.00,
            tip: 15.00,
            tipPay: 0.00,
            taxPay: 0.00,
            color: { color: 'green'}
        };
    };

    componentDidMount() {
        this.paymentCalculator();
    }

    totalTracker = event => {
        let total = event.target.value;
        this.setState({
            total: total
        });
    };

    personTracker = event => {
        let people = event.target.value;
        this.setState({
            people: people
        });
    };

    taxTracker = event => {
        let tax = event.target.value;
        this.setState({
            tax: tax
        });
    };

    tipTracker = event => {
        let tip = event.target.value;
        if (tip > 0) {
            this.setState({
                tip: tip
            });
        } else if (tip == 0) {
            this.setState({
                tip: '😢'
            })
        }
        this.colorChecker(tip);
    };

    colorChecker = (num) => {
        if (num >= 13) {
            this.setState({
                color: { color: "green" }
            });
        } else if (num >= 9 ) {
            this.setState({
                color: {color: "darkkhaki"}
            });
        } else {
            this.setState({
                color: {color: "red" }
            });
        }
    }

    paymentCalculator = () => {
        let people = this.state.people;
        let tax = this.state.tax;
        let total = this.state.total;
        let tipPercent = this.state.tip / 100.00;
        let tipTotal = 0.00;
        let taxTotal = 0.00;
        let pay = 0.00;

        tipTotal = ((total - tax) * tipPercent);
        pay = (parseFloat(total) + parseFloat(tipTotal)) / people;
        tipTotal = tipTotal / people;
        taxTotal = tax / people;

        this.setState({
            pay: pay,
            tipPay: tipTotal,
            taxPay: taxTotal
        });
    };
    
    
    render() {
        return (
            <div className="container text-center">
                <div className="">
                    <div className="row mb-3">
                        <div className="col-12">
                            <h1>You Pay:</h1>
                            <h1>${this.state.pay.toFixed(2)} </h1><span style={topStyle}>of which ${this.state.tipPay.toFixed(2)} is <b>tip</b> and ${this.state.taxPay.toFixed(2)} is <b>tax</b>.</span>
                        </div>
                    </div>
                    <div className="row mb-3 bg-light pt-2">
                        <div className="col-4 text-center">
                            <h5>Total:</h5>
                            <h4>${this.state.total}</h4>
                        </div>
                        <div className="col-4">
                            <h5>People:</h5>
                            <h4>{this.state.people}</h4>
                        </div>
                        <div className="col-4">
                            <h5>Tip:</h5>
                            <h4><span style={this.state.color}>{this.state.tip}</span>%</h4>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-4 text-right">
                            <h4>Bill Total:</h4>
                        </div>
                        <div className="col-8 text-left">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">$</span>
                                </div>
                                <input className="input-group form-control" type="text" name="total" maxLength="8" placeholder="0.00" onChange={this.totalTracker}></input>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-4 text-right">
                            <h4>People:</h4>
                        </div>
                        <div className="col-8 text-left">
                            <input className="input-group form-control" type="text" name="people" maxLength="2" placeholder="Optional: Enter the amount of people splitting the bill." onChange={this.personTracker}></input>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-4 text-right">
                            <h4>Tip:</h4>
                        </div>
                        <div className="col-8 text-left">
                            <div className="input-group">
                            <input className="input-group form-control" type="text" name="tip" maxLength="2" placeholder="Enter desired percent tip." onChange={this.tipTracker}></input>
                            <div className="input-group-append">
                                <span className="input-group-text">%</span>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-4 text-right">
                            <h4>Tax:</h4>
                        </div>
                        <div className="col-8 text-left">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">$</span>
                                </div>
                                <input className="input-group form-control" type="text" name="tax" maxLength="8" placeholder="Enter the total tax shown on your bill." onChange={this.taxTracker}></input>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4 pb-3">
                        <div className="col-4 text-right">
                        </div>
                        <div className="col-8 text-left">
                            <button className="btn btn-success" onClick={this.paymentCalculator}>Calculate</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
};

export default Calculator;