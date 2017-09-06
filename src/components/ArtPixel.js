import React from 'react';

const styles = {
  width: '10px',
  height: '10px',
  float: 'left',
  boxSizing: 'borderBox',
  borderStyle: 'solid',
  borderColor: 'black',
  borderWidth: '1px',
};

const ArtPixel = (props) => {
    let newStyle = Object.assign({}, styles)
    newStyle.backgroundColor = props.color;

    return (
      <div style={newStyle}></div>
    )
}

export default ArtPixel;
