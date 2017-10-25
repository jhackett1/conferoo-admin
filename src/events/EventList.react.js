import React, { Component } from 'react';
import eventApi from '../api/eventApi';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import EventItem from './EventItem.react';

import * as EventActions from '../actions/eventActions';
import EventsStore from '../stores/EventsStore';

class EventList extends Component {
  // Initial state
  constructor(props){
    super(props);
    this.state = {
      events: EventsStore.getAll()
    }
    this.stateUpdater = this.stateUpdater.bind(this);
  };

  stateUpdater(){
    this.setState({
      events: EventsStore.getAll()
    })
  }

  getEventsList(){
    EventActions.getEventsList();
  }

  // As component mounts to DOM, make the API call
  componentDidMount(){
    console.log("count", EventsStore.listenerCount('change'))
    // Dispatch action
    this.getEventsList();
  }

  componentWillMount(){
    // Respond to change in store
    EventsStore.on("change", this.stateUpdater)
  }

  componentWillUnmount(){
    EventsStore.removeListener("change", this.stateUpdater)
  }

  render() {
    // Create list elements
    const List = this.state.events.map((event) => {
      return(
        <EventItem key={event._id} event={event}/>
      )
    })
    return (
      <div className="container">
        <div className="page-header">
          <div className='btn-toolbar pull-right'>
            <div className='btn-group'>
                <Link to="/events/new" className="btn btn-default">New event</Link>
            </div>
          </div>
          <h1>All events</h1>
        </div>
        <ListGroup>{List}</ListGroup>
      </div>
    );
  }
}

export default EventList;
