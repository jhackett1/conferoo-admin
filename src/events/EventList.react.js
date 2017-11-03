import React, { Component } from 'react';
import EventApi from '../api/eventApi';
import { ListGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import EventItem from './EventItem.react';
import Spinner from '../partials/Spinner.react';

class EventList extends Component {
  // Initial state
  constructor(props){
    super(props);
    this.state = {
      events: [],
      isLoading: true
    }
  };

  // As component mounts to DOM, make the initial API call and set the state
  componentDidMount(){
    EventApi.getEventsList((err, list)=>{
      if(err) console.log(err);
      this.setState({
        events: list,
        isLoading: false
      })
    })
  }


  render() {
    // Create list elements
    const List = this.state.events.map((event) => {
      return(
        <EventItem key={event._id} event={event}/>
      )
    })
    // And return the list
    return (
      <div className="container">
        <div className="page-header">
          <div className='btn-toolbar pull-right'>
            <div className='btn-group'>
                <Link to="/events/new" className="btn btn-primary">New event</Link>
            </div>
          </div>
          <h1>All events</h1>
        </div>
        <Spinner isLoading={this.state.isLoading}/>
        <ListGroup>{List}</ListGroup>
      </div>
    );
  }
}

export default EventList;
