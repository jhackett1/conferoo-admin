import React, { Component } from 'react';
import PageApi from '../api/pageApi';
import { ListGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import PageItem from './PageItem.react';
import Spinner from '../partials/Spinner.react';

class PageList extends Component {
  // Initial state
  constructor(props){
    super(props);
    this.state = {
      pages: [],
      isLoading: true
    }
  };

  // As component mounts to DOM, make the initial API call and set the state
  componentDidMount(){
    PageApi.getPagesList((err, list)=>{
      if(err) console.log(err);
      this.setState({
        pages: list,
        isLoading: false
      })
    })
  }


  render() {
    // Create list elements
    const List = this.state.pages.map((page) => {
      return(
        <PageItem key={page._id} page={page}/>
      )
    })
    // And return the list
    return (
      <div className="container">
        <div className="page-header">
          <div className='btn-toolbar pull-right'>
            <div className='btn-group'>
                <Link to="/pages/new" className="btn btn-primary">New page</Link>
            </div>
          </div>
          <h1>All pages</h1>
        </div>
        <Spinner isLoading={this.state.isLoading}/>
        <ListGroup>{List}</ListGroup>
      </div>
    );
  }
}

export default PageList;
