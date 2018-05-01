import React, { Component } from 'react';
import GalleryPiece from './gallery/GalleryPiece';
import { Link } from 'react-router-dom';
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
    const top3Deck = {
      display: 'flex',
      justifyContent: 'space-around',
      width: '100%',
      margin: 'auto',
      flexWrap: 'wrap',
    };

    const top3Card = {
      width: '80%',
      margin: '20px',
    };

    const cardHeader = {
      fontSize: '20px',
      textAlign: 'center',
    };

    const aboutCard = {
      width: '60%',
      textAlign: 'center',
      margin: '20px',
    };

    const aboutText = {
      textDecoration: 'underling'
    };

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
          <div className="card-block">
            <h2 className="mt-2 mb-3" style={aboutText}>About Pixel Art Teams</h2>
            <p>
              Making artwork is fun. Working together with others to make artwork can be even more fun. Welcome to Pixel Art Teams.
            </p>
            <p>
              This website lets up to ten people work together to create artwork, one pixel at a time. The website supports a fun team-building process that is easy to learn and endlessly rewarding.
            </p>
            <p>
              Getting started is simple. You create a canvas, invite your friends, and work together to make art. Learn more <Link to="/about">here</Link>, or select <Link to='/newProject'>Make Art</Link> to begin.
            </p>
            <p>
              When your work is complete, you can add it to our <Link to='/gallery'>Gallery. </Link>Enjoy!</p>
            <h2 className="mt-2 mb-3" style={aboutText}>About Us</h2>
            <p>
              Ionogen Media is a small entertainment company owned by Michael and Karilyn Starks. Jon Lindell is the lead engineer who has created the bulk of the content on this website.
            </p>
            <p>
              <Link to='/customerSupport'> Contact Us</Link> with any feedback you want to provide.
            </p>
            <p>
              Enjoy making art together with others.
            </p>
          </div>
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
