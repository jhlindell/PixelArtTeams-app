import React, { Component } from 'react';
import GalleryPiece from './GalleryPiece';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getGalleryTop3 } from '../actions/socketActions';
import Background from '../watercolor-3173964_1920.jpg';

var sectionStyle = {
  backgroundImage: `url(${Background})`,
  backgroundSize: 'stretch',
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

  componentWillReceiveProps(nextProps){
    if(nextProps.top3){
      console.log("top 3: ", nextProps.top3);
    }
  }

  render(){
    const top3Deck = {};
    top3Deck.display = 'flex';
    top3Deck.justifyContent = 'center';
    top3Deck.width = '100%';
    top3Deck.margin = 'auto';

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
            {this.props.top3 &&<div className="card-deck" style={top3Deck}>
              {this.props.top3.map((art) => <GalleryPiece art={art} key={art.project_name} history={this.props.history}/> )}
            </div>}
          </div>
        </div>
        <div className="card" style={aboutCard}>
          <h2 className="mt-2" style={aboutText}>About Pixel Art Teams</h2>
          <p>A bunch of stuff about pixel art teams.</p>
          <h2 style={aboutText}>How It Works</h2>
          <p>Some instructions.</p>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return { user: state.userName, auth: state.authReducer, top3: state.top3Reducer }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ getGalleryTop3 }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
