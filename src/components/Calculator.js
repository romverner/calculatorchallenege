import React, { Component } from 'react';

const style = {
}

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            people: 1,
            pay: 0,
            tax: 0,
            total: 0.00,
            percent: 0,
            split: "yes"
        }
    }

    totalTracker = event => {
        let value = event.target.value;
        if (value) {
            let payment = (value / this.state.people).toFixed(2);
            this.setState({ 
                total: value,
                pay: payment
            });
        };
    };

    personTracker = event => {
        let value = event.target.value;
        if (value) {
            let payment = this.state.total / value;
            this.setState({
                pay: payment,
                people: value
            });
        };
    };
    
    
    render() {
        return (
            <div className="container text-center">
                <div className="p-5" style={style}>
                    <div className="row mb-4">
                    <div className="col-4 text-center">
                        <h4>People:</h4>
                        <h3>{this.state.people}</h3>
                    </div>
                    <div className="col-4">
                        <h4>You Pay:</h4>
                        <h1>${this.state.pay}</h1>
                    </div>
                    <div className="col-4">
                        <h4>Tax:</h4>
                        <h3>${this.state.tax}</h3>
                    </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-4 text-right">
                            <h4>Bill Total:</h4>
                        </div>
                        <div className="col-8 text-left">
                            <input className="input-group form-control" type="text" name="total" maxlength="8" placeholder="0.00"onChange={this.totalTracker}></input>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-4 text-right">
                            <h4>People:</h4>
                        </div>
                        <div className="col-8 text-left">
                            <input className="input-group form-control" type="text" name="total" maxlength="8" placeholder="1"onChange={this.personTracker}></input>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-4 text-right">
                            <h4>Tax:</h4>
                        </div>
                        <div className="col-8 text-left">
                            <input className="input-group form-control" type="text" name="total" maxlength="8" onChange={this.personTracker}></input>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
};

export default Calculator;