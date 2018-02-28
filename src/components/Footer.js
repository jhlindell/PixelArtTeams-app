import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectProject } from '../actions/index';
import { Link } from 'react-router-dom';

class Footer extends React.Component {
  render(){
    const newStyle={};
    newStyle.display = 'flex';
    newStyle.justifyContent = 'space-around';
    newStyle.backgroundColor = 'black';
    newStyle.alignItems = 'center';
    // newStyle.color = 'white !Important';

    return (
      <footer style={newStyle}>
        <Link onClick={() => this.props.selectProject(0)}
          to="/art">Projects</Link>
          <Link to="/newUser">Add New User</Link>
        <Link to="/about">Terms</Link>
        <Link to="/about">News</Link>
      </footer>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ selectProject }, dispatch);
}

export default connect(null, mapDispatchToProps)(Footer);
