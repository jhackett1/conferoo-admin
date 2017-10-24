import React, { Component } from 'react';
import eventApi from '../api/eventApi';
import List from './List.react';

class EventList extends Component {

  constructor(props){
    super(props);
    this.state = {
      events: {}
    }
  };

  componentDidMount(){
    eventApi.getEventsList(function(eventsList){
      this.setState({events: eventsList})
      // console.log(eventsList)
    })
  }

  render() {
    return (
      <ul>
        <List events={this.state.events} />
      </ul>
    );
  }
}

export default EventList;
