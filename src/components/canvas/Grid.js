import React, {Component} from 'react';
import Pixel from './Pixel';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { mouseDownAction, mouseUpAction } from '../../actions/index';
import { saveProject, sendFinishedProject } from '../../actions/socketActions';
import Countdown from 'react-countdown-now';
import moment from 'moment';

class Grid extends Component {
  componentWillUnmount(){
    this.props.saveProject();
  }

  componentWillMount(){
    const now = new Date();
    const nowString = moment.utc(now).format();
    if(moment(nowString).isSameOrAfter(this.props.finishTime)){
      this.props.sendFinishedProject(this.props.currentProject);
    }
  }

  countdownComplete(){
    this.props.sendFinishedProject();
  }

  render(){
    const xCoord = this.props.x;
    const gridWidth = xCoord * this.props.pixelSize;
    const leftMargin = (800 - gridWidth)/2;
    
    const gridStyle = {
      marginTop: this.props.vertMargins + 'px',
      marginBottom: this.props.vertMargins + 'px',
      marginLeft: leftMargin + 'px',
      flexWrap: 'wrap',
      width: gridWidth + 'px',
      flex: '1',
    };

    const countdownStyle = {
      textAlign: 'center',
      marginTop: '5px',
      fontSize: '18px',
    };

    return (
      <div id="grid">
        <div style={countdownStyle}>Time Left on Project: {this.props.finishTime && <Countdown date={this.props.finishTime} onComplete={() => this.countdownComplete()} />}{!this.props.finishTime && <span> Unlimited</span>}</div>
        <div style={ gridStyle } onMouseDown={() => this.props.mouseDownAction()} onMouseUp={() => this.props.mouseUpAction()} >
            {this.props.grid.map((row, y) => {
              return row.map((pixel, x) => <Pixel
                x={x} y={y} key={x.toString() + y.toString()}
                color={pixel} pixelSize={this.props.pixelSize} />);
            })}
        </div>
      </div>
    );
  }
};

function mapStateToProps(state){
  return {grid: state.gridReducer, currentProject: state.currentProject};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ mouseDownAction, mouseUpAction, saveProject, sendFinishedProject }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
