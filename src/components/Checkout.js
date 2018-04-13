import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { stripeMessage } from '../actions/index';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const STRIPE_PUBLISHABLE = process.env.REACT_APP_STRIPE_PUBLISHABLE;
const PAYMENT_SERVER_URL = process.env.REACT_APP_API_URL;
const CURRENCY = 'USD';

class Checkout extends Component{
  fromUSDToCent = amount => amount * 100;

  successPayment = data => {
    this.props.stripeMessage('Success');
  };

  errorPayment = data => {
    this.props.stripeMessage('Error');
  };

  onToken = (amount, description) => token =>
    axios.post(`${PAYMENT_SERVER_URL}/api/payment`,
      {
        description,
        source: token.id,
        currency: CURRENCY,
        amount: this.fromUSDToCent(amount)
      })
      .then(this.successPayment)
      .catch(this.errorPayment);

  render(){
    const { name, description, amount } = this.props;

    return (
      <StripeCheckout
        name={name}
        description={description}
        amount={this.fromUSDToCent(amount)}
        token={this.onToken(amount, description)}
        currency={CURRENCY}
        stripeKey={STRIPE_PUBLISHABLE}
      />
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ stripeMessage }, dispatch);
}

export default connect(null, mapDispatchToProps)(Checkout);
