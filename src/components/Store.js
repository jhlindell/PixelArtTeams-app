import React, { Component } from 'react';
import Checkout from './Checkout';
import CurrencyFormat from 'react-currency-format';

class Store extends Component {
  constructor(props){
    super(props);
    this.state = {
      showCheckout: false,
      formattedAmount: 0.00,
      value: 0
    }
  }

  changeShowState(){
    this.setState({ showCheckout: !this.state.showCheckout });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  render(){
    const cardStyle = {};
    cardStyle.display = 'flex';
    cardStyle.margin = 'auto';
    cardStyle.padding = '10px';
    cardStyle.width = '400px';
    cardStyle.textAlign = 'center';

    const columnStyle = {};
    columnStyle.display = 'flex';
    columnStyle.flexDirection = 'column';
    columnStyle.width = '150px';
    columnStyle.margin = 'auto';

    return (
      <div className="card" style={cardStyle}>
        {!this.state.showCheckout && <div>
          <h3>Store development is in a future feature release. If you feel that your life has been immesurably enriched by this app and you want to give us money to show your eternal gratitude, click the button below.</h3>
          <button className="btn btn-primary mt-3" onClick={()=> this.changeShowState()}>I Want to Give You Money</button>
        </div>}
        {this.state.showCheckout && <div>
          <h3>Donations are greatly appreciated. To proceed, please enter the donation amount and click the button below to process with Stripe.</h3>
          <div style={columnStyle} className="mt-4">
            <CurrencyFormat className="mb-2" style={{textAlign: 'right'}} value={this.state.formattedAmount} thousandSeparator={true} prefix={'$'} fixedDecimalScale={true} decimalScale={0} onValueChange={(values) => {
                const {formattedValue, value} = values;
                this.setState({formattedAmount: formattedValue, value: value })
              }}/>
            <Checkout
              name={'Pixel Art Teams'}
              description={'donation'}
              amount={this.state.value}
            />
          </div>
        </div>}
      </div>
    )
  }
}

export default Store;
