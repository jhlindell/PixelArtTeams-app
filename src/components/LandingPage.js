import React, {Component} from 'react';
import {Button, Container, Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import Background from '../pixelBackground.png';

var sectionStyle = {
  backgroundImage: `url(${Background})`,
  backgroundSize: 'cover',
  width: '100%',
  height: '700px'
};

class LandingPage extends Component {
  render(){
    return (
      <Container style={ sectionStyle }>
          <div className="landingIntroText" >Pixel Art Teams</div>
          <Row>
          <Col md={{
            size: 2,
            offset: 5}}>
            <Button className="landingButton">
              <Link className="landingButtonText" to="/art">Make Some Art</Link>
            </Button>
          </Col>
          </Row>
      </Container>
    )
  }
}

export default LandingPage;
