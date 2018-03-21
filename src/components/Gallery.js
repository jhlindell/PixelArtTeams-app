import React, {Component} from 'react';
import GalleryPiece from './GalleryPiece';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { getGallery } from '../actions/index';
import { stockGallery } from '../actions/socketActions';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
//import moment from 'moment';

class Gallery extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedOption: { value: 'rating', label: 'Rating' },
      options: []
    }
  }

  handleChange = (selectedOption) => {
    this.setState({selectedOption});
    if(selectedOption && selectedOption.value){
      this.props.stockGallery(selectedOption.value);
    }
  }

  componentWillMount(){
    let opts;
    if(this.props.user && this.props.user.isMod){
      opts = [
        { value: 'rating', label: 'Rating' },
        { value: 'new', label: 'New' },
        { value: 'myGallery', label: 'My Gallery'},
        { value: 'flagged', label: 'Flagged Projects'}
      ]
    } else {
      opts = [
        { value: 'rating', label: 'Rating' },
        { value: 'new', label: 'New' },
        { value: 'myGallery', label: 'My Gallery'}
      ]
    }
    this.setState({options: opts});
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.user !== this.props.user){
      let opts;
      if(nextProps.user && nextProps.user.isMod){
        opts = [
          { value: 'rating', label: 'Rating' },
          { value: 'new', label: 'New' },
          { value: 'myGallery', label: 'My Gallery'},
          { value: 'flagged', label: 'Flagged Projects'}
        ]
      } else {
        opts = [
          { value: 'rating', label: 'Rating' },
          { value: 'new', label: 'New' },
          { value: 'myGallery', label: 'My Gallery'}
        ]
      }
      this.setState({ options:opts });
    }
  }

  componentDidMount(){
    this.props.stockGallery('rating');
  }

  render(){
    console.log('Gallery: ', this.props.gallery);
    const galleryCards = {};
    galleryCards.display = 'flex';
    galleryCards.justifyContent = 'space-around';
    galleryCards.padding = '50px';
    galleryCards.width = '100%';
    galleryCards.flexWrap = 'wrap';

    const selectorStyle = {};
    selectorStyle.width = '200px';
    //selectorStyle.textAlign = 'center';
    selectorStyle.marginTop = '10px';
    selectorStyle.marginLeft = 'auto';
    selectorStyle.marginRight = 'auto';
    selectorStyle.display = 'flex';
    selectorStyle.justifyContent = 'center';

    const container = {};
    container.display = 'flex';
    container.justifyContent = 'center';
    container.alignItems = 'center';
    container.flexDirection = 'column';
    container.width = '100%';

    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;

    return (
      <div style={{width: '100%'}}>
        <div className="card" style={selectorStyle}>
          <span>Sort Style:</span>
          <Select
            name="form-field-name"
            value={value}
            searchable={false}
            onChange={this.handleChange}
            options={this.state.options}
          />
        </div>
        <div style={container}>
          <div style={galleryCards}>
            {this.props.gallery.map((art) => <GalleryPiece art={art} key={art.project_name} history={this.props.history}/> )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { gallery: state.galleryReducer, user: state.userName };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ stockGallery, getGallery }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
