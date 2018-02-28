import React, { Component } from 'react';

class Store extends Component {
  render(){
    const newStyle = {};
    newStyle.display = 'flex';
    newStyle.margin = 'auto';

    return (
      <div style={newStyle}>
        <h1>The store is under Construction. Check back later.</h1>
      </div>
    )
  }
}

export default Store;
