import React, {Component} from 'react';
import GalleryPiece from './GalleryPiece';
import Menu from './Menu';
import NavBar from './NavBar';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { stockGallery } from '../actions/socketActions';

class Gallery extends Component {
  componentDidMount(){
    this.props.stockGallery();
  }

  render(){
    return (
      <div>
      <NavBar />
      <Menu />
      <div className="row">
        <div className="card-deck galleryCardDeck">
          {this.props.gallery.map((art) => <GalleryPiece
            art={art}
            key={art.project_name} />
          )}
        </div>
      </div>
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
