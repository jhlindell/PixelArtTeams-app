import React from 'react';
import GalleryPixel from './GalleryPixel';

const GalleryPiece = (props) => {

  let xCoord = props.art.grid[0].length;
  let gridWidth = (xCoord * 10) + 40;
  let newStyle = {};
  newStyle.paddingTop = '20px';
  newStyle.display = 'flex';
  newStyle.flexWrap = 'wrap';
  newStyle.width = gridWidth + 'px';
  newStyle.margin = 'auto';


  return (
    <div className="col col-md-4">
      <div className="card artCard">
        <div className="card-header">
          <div className="artTitleText cardtitle" >
            {props.art.project_name}
          </div>
        </div>

        <div className="card-block" style={newStyle} >
          {props.art.grid.map((row, y) => {
            return row.map((pixel, x) => <GalleryPixel
              x={x} y={y} key={x.toString() + y.toString()}
              color={pixel} />);
          })}
        </div>
      </div>
    </div>
  );
};

export default GalleryPiece;
