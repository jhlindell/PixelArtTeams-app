import React, {Component} from 'react';
import GalleryPiece from './GalleryPiece';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { getGallery } from '../../actions/index';
import { stockGallery } from '../../actions/socketActions';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

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
    const opts = (this.props.user && this.props.user.isMod)?
      [
        { value: 'rating', label: 'Rating' },
        { value: 'new', label: 'New' },
        { value: 'myGallery', label: 'My Gallery'},
        { value: 'flagged', label: 'Flagged Projects'}
      ]:
      [
        { value: 'rating', label: 'Rating' },
        { value: 'new', label: 'New' },
        { value: 'myGallery', label: 'My Gallery'}
      ];
      this.setState({options: opts});
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.user !== this.props.user){
      const opts = (nextProps.user && nextProps.user.isMod)?
        [
          { value: 'rating', label: 'Rating' },
          { value: 'new', label: 'New' },
          { value: 'myGallery', label: 'My Gallery'},
          { value: 'flagged', label: 'Flagged Projects'}
        ]:
        [
          { value: 'rating', label: 'Rating' },
          { value: 'new', label: 'New' },
          { value: 'myGallery', label: 'My Gallery'}
        ];
      this.setState({ options:opts });
    }
  }

  componentDidMount(){
    this.props.stockGallery('rating');
  }

  render(){
    const galleryCards = {
      display: 'flex',
      justifyContent: 'space-around',
      padding: '50px',
      width: '100%',
      flexWrap: 'wrap',
    };

    const selectorStyle = {
      display: 'flex',
      justifyContent: 'center',
      width: '200px',
      marginTop: '10px',
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: '5px',
      textAlign: 'center',
      backgroundColor: 'lightgray',
    };

    const cardContainer = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      width: '100%',
    };

    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;

    return (
      <div style={{ width: '100%' }}>
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
        <div style={cardContainer}>
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
