import React, {Component} from 'react';
import { connect } from 'react-redux';
import PaintSwatch from './PaintSwatch';
import CurrentColor from './CurrentColor';

var colorArray = ['#800000', '#FF0000', '#FFA500', '#FFFF00', '#808000', '#008000', '#00FFFF', '#008080', '#0000FF', '#000080', '#4B0082', '#800080', '#EE82EE', '#FFFFFF', '#C0C0C0', '#808080', '#000000', '#A52A2A', '#A0522D', '#D2691E', '#CD853F', '#D2B48C', '#F5DEB3', '#FFF8DC' ];

class Palette extends Component {
  render(){
    return (
      <div>
        Current Color:
        <CurrentColor />
        <div id="color-wheel" style={{
            display: this.props.paletteReducer?'flex':'none',
            flexDirection: 'column', position: 'absolute',
            zIndex: 2, width: '70px', height: '80%',
            alignItems: 'center', marginTop: '70px',
            background: 'white' }} >
          {colorArray.map(color => <PaintSwatch key={color} color={color}/>)}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ activeColor, paletteReducer }) {
  return { activeColor, paletteReducer };
}

export default connect(mapStateToProps, null)(Palette);
