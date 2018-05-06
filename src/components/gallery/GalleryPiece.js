import React, {Component} from 'react';
import DrawCanvas from './DrawCanvas';
import ReactStars from 'react-stars';

class GalleryPiece extends Component{
  constructor(props){
    super(props);
    this.state = {
      pixelSize: 0,
      canvasX: 0,
      canvasY: 0
    }
  }

  componentWillMount(){
    this.calculateParams(this.props.art.grid);
  }

  calculateParams(grid){
    const x = grid[0].length;
    const y = grid.length;
    let canvasX = 0;
    let canvasY = 0;
    let ratio;
    if(x >= y)  {
      ratio = x/y;
      canvasX = 240;
      canvasY = 240 / ratio;
     } else {
      ratio = y/x;
      canvasY = 240;
      canvasX = 240 / ratio;
     }
    const pixelSizeX = (canvasX/x).toFixed(0);
    const pixelSizeY = (canvasY/y).toFixed(0);
    const pixelSize =(pixelSizeX > pixelSizeY)? pixelSizeY: pixelSizeX;
    this.setState({ pixelSize, canvasX, canvasY });
  }

  render(){
    const cardStyle = {
      backgroundColor: 'gray',
      marginBottom: '10px',
    };

    const cardBlockStyle = {
      display: 'flex',
      margin: 'auto',
    };

    const footerStyle = {
      display: 'flex',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    };

    return (
      <div className="card" style={cardStyle} onClick={()=> this.props.history.push(`project/${this.props.art.project_id}`)}>
        <div className="card-header">
          <div className="artTitleText" >
            {this.props.art.project_name}
          </div>
        </div>
        <div className="card-block" style={cardBlockStyle} >
          <DrawCanvas grid={this.props.art.grid} canvasX={this.state.canvasX} canvasY={this.state.canvasY} pixelSize={this.state.pixelSize} />
        </div>
        <div className="card-footer" style={footerStyle}>
          Avg. Rating: <div className='ml-2'>
              <ReactStars
              count={3}
              size={20}
              value={this.props.art.rating} />
            </div>
        </div>
      </div>
    );
  }
};

export default GalleryPiece;
