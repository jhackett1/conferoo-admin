import React, { Component } from 'react';
import StatusApi from '../api/statusApi';
import {Grid, Row, Col, Panel} from 'react-bootstrap';
import Humandate from 'human-date';


import PollApi from '../api/pollApi';

class Dashboard extends Component {
  constructor(){
    super();
    this.state = {
      uptime: '',
      counts: {}
    }

  window.state = this.state;

  }

  componentWillMount(){

    PollApi.getPollsList((err, polls)=>{
      console.log(err)
      console.log(polls)
    })

    StatusApi.getStatus((err, status)=>{
      this.setState({
        uptime: status.uptime,
        counts: status.counts
      })
    })
  }

  render() {

    return (
      <div className="container">
        <div className="page-header">
          <h1>Dashboard</h1>
        </div>
        <Grid>
          <Row>
            <Col xs={12} md={4}>
              <Panel className="text-center">
                <h2>{this.state.counts.events}</h2>
                <p>Events are scheduled</p>
              </Panel>
              <Panel className="text-center">
                <h2>{this.state.counts.media}</h2>
                <p>Media files uploaded</p>
              </Panel>
            </Col>
            <Col xs={12} md={4}>
              <Panel className="text-center">
                <h2>{this.state.counts.speakers}</h2>
                <p>Speakers will be present</p>
              </Panel>
              <Panel className="text-center">
                <h2>{this.state.counts.users}</h2>
                <p>Users are registered</p>
              </Panel>
            </Col>
            <Col xs={12} md={4}>
              <Panel className="text-center">
                <h2>{this.state.counts.posts}</h2>
                <p>Posts have been published</p>
              </Panel>
              <Panel className="text-center">
                <h1>{Humandate.relativeTime(this.state.uptime, {futureSuffix: ' ', pastSuffix: ' '})}</h1>
                <p>Since last downtime</p>
              </Panel>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
