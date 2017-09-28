import React, {Component} from 'react';
import ArtPiece from './ArtPiece';
import {connect} from 'react-redux';
import {CardDeck, Row} from 'reactstrap';

class Gallery extends Component {
  componentDidMount(){
    this.props.stockGallery();
  }

  render(){
    return (
      <Row>
      <CardDeck>
        {this.props.gallery.map((art) => <ArtPiece
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

export default connect(mapStateToProps, null)(Gallery);
