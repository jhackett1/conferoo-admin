import React, { Component } from 'react';
import eventApi from '../api/eventApi';
import Tiny from '../partials/TinyMce.react';

class EventEdit extends Component {
  render() {
    return (
      <div className="container">
        <div className="page-header">
          <h1>Edit event</h1>

        </div>
      </div>
    );
  }
}

export default EventEdit;
