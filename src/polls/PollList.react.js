import React, { Component } from 'react';
import PollApi from '../api/pollApi';
import { ListGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import PollItem from './PollItem.react';
import Spinner from '../partials/Spinner.react';

class PollList extends Component {
  // Initial state
  constructor(props){
    super(props);
    this.state = {
      polls: [],
      isLoading: true
    }
  };

  // As component mounts to DOM, make the initial API call and set the state
  componentDidMount(){
    PollApi.getPollsList((err, list)=>{
      if(err) console.log(err);
      console.log(list)
      this.setState({
        polls: list,
        isLoading: false
      })
    })
  }


  render() {
    // Create list elements
    const List = this.state.polls.map((poll) => {
      return (<PollItem key={poll._id} poll={poll}/>);
    })
    // And return the list
    return (
      <div className="container">
        <div className="page-header">
          <div className='btn-toolbar pull-right'>
            <div className='btn-group'>
                <Link to="/events/new" className="btn btn-primary">New open poll</Link>
            </div>
          </div>
          <h1>All polls</h1>
        </div>
        {List}
        <Spinner isLoading={this.state.isLoading}/>
      </div>
    );
  }
}

export default PollList;
