import React, { Component } from 'react';
import eventApi from '../api/eventApi';

class EventList extends Component {

  render() {

        eventApi.listEvents(function(events){
          console.log(events);
        })

    return (
      <div>
        event list
      </div>
    );
  }
}

export default EventList;
