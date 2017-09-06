import React from 'react';
import ArtPixel from './ArtPixel';
import {Card, CardBlock, CardTitle, CardHeader} from 'reactstrap';

const ArtPiece = (props) => {

  let xCoord = props.art.grid[0].length;
  let gridWidth = (xCoord * 10) + 40;
  let newStyle = {};
  newStyle.paddingTop = '20px';
  newStyle.display = 'flex';
  newStyle.flexWrap = 'wrap';
  newStyle.width = gridWidth + 'px';
  newStyle.marginLeft = '10px';
  newStyle.marginRight = '10px';

  return (
    <Card>
      <CardHeader>
        <CardTitle>
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
  )
}

export default ArtPiece;
