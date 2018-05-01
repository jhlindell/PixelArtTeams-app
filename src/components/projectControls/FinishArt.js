import React, { Component } from "react";
import DrawCanvas from '../gallery/DrawCanvas';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectProject } from '../../actions/index';
import { sendFinishedProject } from '../../actions/socketActions';

class FinishArt extends Component {
  constructor(props){
    super(props);
    this.state={
      pixelSize: 0,
      canvasX: 0,
      canvasY: 0
    }
  }

  componentWillMount(){
    if(this.props.currentProject === 0){
      this.props.history.push('/art');
    }
    this.calculateCanvas();
  }

  calculateCanvas(){
    const x = this.props.grid[0].length;
    const y = this.props.grid.length;
    const windowX = (window.innerWidth * 0.6).toFixed(0);
    const windowY = (window.innerHeight * 0.6).toFixed(0);
    const pixelSizeX = (windowX/x).toFixed(0);
    const pixelSizeY = (windowY/y).toFixed(0);
    let pixelSize;
    if(pixelSizeX > pixelSizeY){
      pixelSize = pixelSizeY;
    } else {
      pixelSize = pixelSizeX;
    }
    const canvasX = pixelSize * x;
    const canvasY = pixelSize * y;

    this.setState({ pixelSize, canvasX, canvasY });
  }

  finishProject(){
    this.props.sendFinishedProject();
    this.props.selectProject(0)
    this.props.history.push('/art');
  }

  cancel(){
    this.props.history.push('/art');
  }

  render(){
    const containerStyle = {
      display: 'flex',
      margin: 'auto',
      justifyContent: 'space-between',
    };

    const cardStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: 'auto',
      textAlign: 'center',
      width: '200px',
      marginLeft: '100px',
    };

    return (
      <div style={containerStyle}>
        <DrawCanvas grid={ this.props.grid } pixelSize={this.state.pixelSize} canvasX={this.state.canvasX} canvasY={this.state.canvasY}/>
        <div className="card" style={cardStyle}>
          <div>Finish Project? </div>
          <div className="mb-2">You will not be able to work on it again.</div>
          <div>
            <button type="button" className="btn btn-primary" onClick={()=>this.finishProject()}> Finish </button>
            <button type="button" className="btn btn-secondary" onClick={()=>this.cancel()}> Cancel </button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return { grid: state.gridReducer, currentProject: state.currentProject }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ sendFinishedProject, selectProject }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FinishArt);
