import React from 'react';
import Pixel from './Pixel';
import {connect} from 'react-redux';
import {Row, Col} from 'reactstrap';

const Grid = (props) =>  {
  let xCoord = props.grid[0].length;
  let gridWidth = xCoord * 20;
  let newStyle = {};
  newStyle.paddingTop = '20px';
  newStyle.display = 'flex';
  newStyle.flexWrap = 'wrap';
  newStyle.width = gridWidth + 'px';
  newStyle.margin = 'auto';
  // newStyle.marginLeft = ((550 - gridWidth)/2);

  return (
    <Row>
      <Col
        md={{
          size: 10,
          offset: 1,
        }}
      >
        <div
          style={newStyle}
          onMouseDown={() => props.onMouseDown()}
          onMouseUp={() => props.onMouseUp()}
        >
          {props.grid.map((row, y) => {
            return row.map((pixel, x) => <Pixel
              x={x} y={y}
              color={pixel}
              sendPixel={props.sendPixel}
              onMouseOver={props.onMouseOver} />);
          })}
          </div>
      </Col>
    </Row>
  );
};

function mapStateToProps(state) {
  return {grid: state.gridReducer};
}

export default connect(mapStateToProps, null)(Grid);
