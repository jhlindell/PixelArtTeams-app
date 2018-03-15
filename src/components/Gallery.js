import React, {Component} from 'react';
import GalleryPiece from './GalleryPiece';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { stockGallery } from '../actions/socketActions';

class Gallery extends Component {
  componentDidMount(){
    this.props.stockGallery();
  }

  render(){
    const newStyle = {};
    newStyle.display = 'flex';
    newStyle.justifyContent = 'space-around';
    newStyle.padding = '50px';
    newStyle.width = '100%';
    newStyle.flexWrap = 'wrap';

    return (
      <div style={newStyle}>
        {this.props.gallery.map((art) => <GalleryPiece art={art} key={art.project_name} history={this.props.history}/> )}
      </div>
    );
  }
}

function mapStateToProps(state){
  return {gallery: state.galleryReducer};
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ stockGallery }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
