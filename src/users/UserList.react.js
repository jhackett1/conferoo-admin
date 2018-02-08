import React, { Component } from 'react';
import UserApi from '../api/userApi';
import { ListGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import UserItem from './UserItem.react';
import Spinner from '../partials/Spinner.react';

class UserList extends Component {
  // Initial state
  constructor(props){
    super(props);
    this.state = {
      users: [],
      isLoading: true
    }
  };

  // As component mounts to DOM, make the initial API call and set the state
  componentDidMount(){
    UserApi.getUserList((err, list)=>{
      if(err) console.log(err);
      console.log(list)
      this.setState({
        users: list,
        isLoading: false
      })
    })
  }

  render() {
    // Create list elements
    const List = this.state.users.map((user) => {
      return(
        <UserItem key={user._id} user={user}/>
      )
    })
    // And return the list
    return (
      <div className="container">
        <div className="page-header">
          <h1>All users</h1>
        </div>
        <Spinner isLoading={this.state.isLoading}/>
        <p>{this.state.users.length} users have signed in</p>
        <ListGroup>{List}</ListGroup>
      </div>
    );
  }
}

export default UserList;
