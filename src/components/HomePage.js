import React, { Component } from 'react';
import GalleryPiece from './GalleryPiece';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getGalleryTop3 } from '../actions/socketActions';

var sectionStyle = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center'
};

class HomePage extends Component {
  componentWillMount(){
    this.props.getGalleryTop3();
  }

  render(){
    const top3Deck = {};
    top3Deck.display = 'flex';
    top3Deck.justifyContent = 'space-around';
    top3Deck.width = '100%';
    top3Deck.margin = 'auto';
    top3Deck.flexWrap = 'wrap';

    const top3Card = {};
    top3Card.width = '80%';
    top3Card.margin = '20px';

    const cardHeader = {};
    cardHeader.fontSize = '20px';
    cardHeader.textAlign = 'center';

    const aboutCard = {};
    aboutCard.width = '60%';
    aboutCard.textAlign = 'center';
    aboutCard.margin = '20px';

    const aboutText = {};
    aboutText.textDecoration = 'underline';

    return (
      <div style={sectionStyle}>
        <div className="card" style={top3Card}>
          <div className="card-header" style={cardHeader}>
            Top 3 Projects
          </div>
          <div className="card-block">
            {this.props.top3 &&<div style={top3Deck}>
              {this.props.top3.map((art) => <GalleryPiece art={art} key={art.project_name} history={this.props.history}/> )}
            </div>}
          </div>
        </div>
        <div className="card" style={aboutCard}>
          <h2 className="mt-2" style={aboutText}>About Pixel Art Teams</h2>
          <p>Pixel Art Teams is a collaborative art maker that allows you and your friends to work together to make art.</p>
          <h2 style={aboutText}>How It Works</h2>
          <p>Click through and scroll down to the readme for a walkthrough of the app.</p>
          <a href="https://github.com/jhlindell/PixelArtTeams-app">Walkthrough</a>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return { auth: state.authReducer, top3: state.top3Reducer }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getGalleryTop3 }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
