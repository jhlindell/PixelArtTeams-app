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
    if(this.props.stripeMessage && this.props.stripeMessage === 'Success'){
      return <h3>Your Donation Was Successful. Thank You!</h3>;
    } else {
      return <h3>There was a problem with your donation</h3>;
    }
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
        {!this.props.stripeMessage && !this.state.showCheckout && <div>
          <h4>Store development is in a future feature release. If you feel that your life has been immesurably enriched by this app and you want to give us money to show your eternal gratitude, click the button below.</h4>
          <button className="btn btn-primary mt-3" onClick={()=> this.changeShowState()}>I Want to Give You Money</button>
        </div>}
        {!this.props.stripeMessage && this.state.showCheckout && <div>
          <h4>Donations are greatly appreciated. To proceed, please enter the donation amount and click the button below to process with Stripe.</h4>
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