import React, { Component } from 'react';
import './spinner.css'

class Spinner extends Component {
  render() {
    const isLoading = this.props.isLoading;
    if(isLoading){
      return (
        <div>
          <span id="spinner" className="glyphicon glyphicon-refresh"></span>
        </div>
      );
    } else {
      return null;
    }
  }

}

export default Spinner;
