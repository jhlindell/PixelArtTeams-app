import React, {Component} from 'react';
import ArtPiece from './ArtPiece';
import {connect} from 'react-redux';


class Gallery extends Component {
  componentDidMount(){
    this.props.stockGallery();
  }

  render(){
    return (
      <div>
        {this.props.gallery.map((art) => <ArtPiece art={art} key={art.project_name}/>)}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {gallery: state.galleryReducer}
}

export default connect(mapStateToProps, null)(Gallery);
