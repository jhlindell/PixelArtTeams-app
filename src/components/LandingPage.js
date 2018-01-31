import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Background from '../pixelBackground.png';

var sectionStyle = {
  backgroundImage: `url(${Background})`,
  backgroundSize: 'cover',
  width: '100%',
  height: '703px'
};

class LandingPage extends Component {
  render(){
    return (
      <div className="container-fluid" style={ sectionStyle }>
        <div className="landingIntroText" >
          Pixel Art Teams
        </div>
        <div className="row landingButtons">
          <button className="landingButton btn btn-secondary">
            <Link className="landingButtonText" to="/gallery" >
              Go to Gallery
            </Link>
          </button>
          <button className="landingButton btn btn-secondary">
            <Link className="landingButtonText" to="/signin" >
              Sign In
            </Link>
          </button>
        </div>
      </div>
    );
  }
}

export default LandingPage;
