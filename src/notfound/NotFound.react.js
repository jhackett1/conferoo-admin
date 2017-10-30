import React, { Component } from 'react';

class NotFound extends Component {
  render() {

    return (
      <div className="container">
        <div className="page-header">
          <h1>Not found <small>404</small></h1>
        </div>
        <p>We can't find what you're looking for.</p>
      </div>
    );
  }
}

export default NotFound;
