
import React, { Component } from 'react'
import { Card, CardBody } from 'reactstrap';


class Converter extends Component {
    state = {
        currencies: ['INR', 'USD', 'AED', 'GBP', 'CAD', 'SGD', 'EUR', 'JPY', 'PKR', 'ZAR', 'ALL'],
        base: 'EUR',
        amount: '',
        result: '0',
        convertTo: '',
        date: '',
        time: ''
    }



    handleSelect = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            result: null
        },
            this.calculate
        );
    };

    handelInput = (e) => {
        this.setState({
            amount: e.target.value,
            result: null,
            date: null,
            time:null

        },
            this.calculate()
        );
    }

    calculate = () => {
        const amount = this.state.amount;
    if (amount === isNaN) {
    return;
    } else {
     fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=897d513fdf3cad68055f14dfdb7cb97a`)

            .then(res =>  res.json())
            // .then(data => console.log(data))
            .then(data =>  {
                const date =  data.date
                const time =   data.timestamp
                const result =   data.rates[this.state.convertTo] * amount;

                this.setState({
                    result,
                    date,
                    time
                });
            });

        }
};




    render() {

        const { currencies, base, amount, result, convertTo, date, time } = this.state;




        return (

            <Card className='card'>
                <CardBody className='card__body'>
                    <p>{amount} {base}  equals</p>
                    <h2>
                        {amount === ""
                            ? "0"
                            : result === null
                                ? "Calculating..."
                                : result}{" "}
                        {convertTo}
                    </h2>
                    {/* <p> {amount === "" ? "/ / /" : date === null ? "" : date}</p> */}
                <p> {amount === "" ? "/ /" : date === null ? "" : date} 
                   {amount === "" ? " /" : time === null ? "" : ', ' + time} • Disclaimer</p>

                    <form >
                        <input type="number"
                            value={amount}
                            onChange={this.handelInput} />
                        <select name='base' id="base" value={base} onChange={this.handleSelect}>
                           
                                <option key={base} value={base} >{base}</option>
                          
                        </select>
                    </form>

                    <form >
                        <input
                            disabled={true}
                            value={result}
                            onChange={this.calculate}
                        />
                        <select name="convertTo" id="convertTo" value={convertTo} onChange={this.handleSelect}>
                            {currencies.map(currency => (
                                <option key={currency} value={currency}> {currency}</option>
                            ))}
                        </select>
                    </form>


                </CardBody>
            </Card>


        )

    }

};

export default Converter;

















