import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

// const STRIPE_PUBLISHABLE = process.env.STRIPE_PUBLISHABLE;
const STRIPE_PUBLISHABLE = 'pk_test_Z2bJUZEdLekU7Y0ZN40HI3uB';
const PAYMENT_SERVER_URL = process.env.REACT_APP_API_URL;
const CURRENCY = 'USD';

const fromUSDToCent = amount => amount * 100;

const successPayment = data => {
  alert('Payment Successful');
};

const errorPayment = data => {
  alert('Payment Error');
};

const onToken = (amount, description) => token =>
  axios.post(`${PAYMENT_SERVER_URL}/api/payment`,
    {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromUSDToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment);

const Checkout = ({ name, description, amount }) =>
  <StripeCheckout
    name={name}
    description={description}
    amount={fromUSDToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />

export default Checkout;
