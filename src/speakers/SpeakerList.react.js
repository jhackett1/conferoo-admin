import React, { Component } from 'react';
import SpeakerApi from '../api/speakerApi';
import { ListGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import SpeakerItem from './SpeakerItem.react';

class SpeakerList extends Component {
  // Initial state
  constructor(props){
    super(props);
    this.state = {
      speakers: []
    }
  };

  // As component mounts to DOM, make the initial API call and set the state
  componentDidMount(){
    SpeakerApi.getSpeakersList((err, list)=>{
      if(err) console.log(err);
      this.setState({speakers: list})
    })
  }


  render() {
    // Create list elements
    const List = this.state.speakers.map((speaker) => {
      return(
        <SpeakerItem key={speaker._id} speaker={speaker}/>
      )
    })
    // And return the list
    return (
      <div className="container">
        <div className="page-header">
          <div className='btn-toolbar pull-right'>
            <div className='btn-group'>
                <Link to="/speakers/new" className="btn btn-primary">New speaker</Link>
            </div>
          </div>
          <h1>All speakers</h1>
        </div>
        <ListGroup>{List}</ListGroup>
      </div>
    );
  }
}

export default SpeakerList;
