import React, { Component } from 'react';
import Menu from './Menu';
import NavBar from './NavBar';
import Grid from './Grid';
import Palette from './Palette';

class MainCanvas extends Component {
  render(){
    return (
      <div>
        <NavBar />
        <Menu />
        <Palette />
        <Grid />
      </div>
    )
  }
}

export default MainCanvas;
