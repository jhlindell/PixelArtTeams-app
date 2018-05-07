import React, { Component } from 'react';
import { connect } from 'react-redux';
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

  stripeMessage(){
    return (this.props.stripeMessage && this.props.stripeMessage === 'Success') ?
      <h3>Your Donation Was Successful. Thank You!</h3>:
      <h3>There was a problem with your donation</h3>;
  }

  render(){
    const cardStyle = {
      display: 'flex',
      margin: 'auto',
      padding: '10px',
      width: '400px',
      textAlign: 'center',
    };

    const columnStyle = {
      display: 'flex',
      flexDirection: 'column',
      width: '150px',
      margin: 'auto',
    };

    return (
      <div className="card" style={cardStyle}>
        {!this.props.stripeMessage && !this.state.showCheckout && <div>
          <h4>Store development is in a future feature release. If you feel that your life has been immesurably enriched by this app and you want to give us money to show your eternal gratitude, click the button below. (note: credit card processing isn't live. This is just a test.)</h4>
          <button className="btn btn-primary mt-3" onClick={()=> this.changeShowState()}>I'd Love to Donate!</button>
        </div>}
        {!this.props.stripeMessage && this.state.showCheckout && <div>
          <h4>Donations are greatly appreciated. To proceed, please enter the donation amount and click the button below to process with Stripe. (for testing, use card 4242 4242 4242 4242)</h4>
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
        {this.props.stripeMessage && <div>
          {this.stripeMessage()}
        </div>}
      </div>
    )
  }
}

function mapStateToProps(state){
  return { stripeMessage: state.stripeMessageReducer };
}

export default connect(mapStateToProps, null)(Store);
