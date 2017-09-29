import React from 'react';
import Pixel from './Pixel';
import {connect} from 'react-redux';
import {Row, Col} from 'reactstrap';
import Project from './Project';
import NewProject from './NewProject';

const Grid = (props) =>  {
  let xCoord = props.grid[0].length;
  let gridWidth = xCoord * 20;
  let newStyle = {};
  // newStyle.paddingTop = '20px';
  newStyle.display = 'flex';
  newStyle.flexWrap = 'wrap';
  newStyle.width = gridWidth + 'px';
  newStyle.margin = 'auto';
  // newStyle.marginLeft = ((550 - gridWidth)/2);

  return (
    <Row style={{height: '90vh'}}>
      <Col
        md={{
          size: 12,
        }}
      >
        {
          props.currentProject === 0
          ?
          <div style={{padding: '5%',}}>
            <h4 className="projectCardText">Select a project</h4>
            {
            props.projects.map(project => <Project
              key={project.id}
              project={project} />)
            }
            <br/>

          <NewProject addNewProject={props.addNewProject} />
          </div>
          :
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
        }
      </Col>
    </Row>
  );
};

function mapStateToProps(state) {
  return {
    grid: state.gridReducer,
    projects: state.projectsReducer,
    currentProject: state.currentProject,
  };
}

export default connect(mapStateToProps, null)(Grid);
