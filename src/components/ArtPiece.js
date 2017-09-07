import React from 'react';
import ArtPixel from './ArtPixel';
import {Card, CardBlock, CardTitle, CardHeader, Col} from 'reactstrap';

const ArtPiece = (props) => {

  let xCoord = props.art.grid[0].length;
  let gridWidth = (xCoord * 10) + 40;
  let newStyle = {};
  newStyle.paddingTop = '20px';
  newStyle.display = 'flex';
  newStyle.flexWrap = 'wrap';
  newStyle.width = gridWidth + 'px';
  newStyle.margin = 'auto';


  return (
    <Col md="4">
      <Card className="artCard">
        <CardHeader>
          <CardTitle className="artTitleText">
            {props.art.project_name}
          </CardTitle>
        </CardHeader>
        <CardBlock style={newStyle}>
          {props.art.grid.map((row, y) => {
            return row.map((pixel, x) => <ArtPixel
              x={x} y={y}
              color={pixel}/>)
          })}
        </CardBlock>
      </Card>
    </Col>
  )
}

export default ArtPiece;
