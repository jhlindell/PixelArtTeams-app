import React, {Component} from 'react';
import GalleryPiece from './GalleryPiece';
import {connect} from 'react-redux';
import {CardDeck, Row} from 'reactstrap';
import { bindActionCreators } from 'redux';
import { stockGallery } from '../actions/socketActions';

class Gallery extends Component {
  componentDidMount(){
    this.props.stockGallery();
  }

  render(){
    return (
      <Row>
        <CardDeck>
          {this.props.gallery.map((art) => <GalleryPiece
            art={art}
            key={art.project_name} />
          )}
        </CardDeck>
      </Row>
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
