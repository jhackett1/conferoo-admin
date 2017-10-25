import React, { Component } from 'react';
import {Grid, Row, Col, Panel, Form, FormGroup, FormControl, Radio, ButtonToolbar, Button} from 'react-bootstrap';
import eventApi from '../api/eventApi';
import TinyMCE from 'react-tinymce';
import {Prompt} from 'react-router-dom';
// Actions and store
import * as EventActions from '../actions/eventActions';
import EventsStore from '../stores/EventsStore';

class EventNew extends Component {
  // Initial state
  constructor(props){
    super(props);
    this.state = EventsStore.getSelected();

    this.handleChange = this.handleChange.bind(this);
    this.handleTinyMCEChange = this.handleTinyMCEChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  // Helper functions to keep track of form changes in state
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      isBlocking: true
     });
  };
  handleTinyMCEChange(e) {
    this.setState({
      content: e.target.getContent(),
      isBlocking: true
    });
  };

  handleSubmit(e){
    // Stop page refresh
    e.preventDefault();
    // Dispatch an action
    // TODO: What goes in here?
    EventActions.createEvent(this.state);

    EventsStore.on("change", ()=> {
      this.setState(EventsStore.getSelected())
    })

  };


  render() {
    // const { isBlocking } = this.state;

    return (
      <div>

        <div className="container">
          <div className="page-header">
            <h1>New event</h1>
          </div>
        </div>
        <Grid>
          <Form>
            <Row className="show-grid">
              <Col xs={12} md={8}>
                <FormControl
                  type="text"
                  name="title"
                  onChange={this.handleChange}
                  value={this.state.title}
                  bsSize="large"
                  placeholder="Title"
                />
                <TinyMCE
                  rows="15"
                  name="content"
                  onChange={this.handleTinyMCEChange}
                  content={this.state.content}
                  config={{
                    plugins: [
                        "advlist autolink lists link image charmap anchor",
                        "searchreplace visualblocks code fullscreen",
                        "insertdatetime media contextmenu paste "
                    ],
                    toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter      alignright alignjustify | bullist numlist outdent indent | link image"
                  }}
                />
                <Panel header="Teaser">
                  <FormControl
                    type="text"
                    placeholder="A short teaser sentence"
                    name="teaser"
                    onChange={this.handleChange}
                    value={this.state.teaser}
                  />
                </Panel>
              </Col>
              <Col xs={12} md={4}>
                <Panel header="Publish">
                  <FormGroup
                    name="status"
                    onChange={this.handleChange}
                  >
                    <Radio name="status" value="true" checked={this.state.status === "true"} inline onChange={this.handleChange}>Public</Radio>
                    {' '}
                    <Radio name="status" value="false" checked={this.state.status === "false"} inline onChange={this.handleChange}>Private</Radio>
                  </FormGroup>
                  <ButtonToolbar>
                    <Button type="submit" onClick={this.handleSubmit} bsStyle="primary">Publish</Button>
                  </ButtonToolbar>
                </Panel>
                <Panel header="Image">
                <FormControl
                  type="text"
                  placeholder="URL of featured image"
                  name="image"
                  onChange={this.handleChange}
                  value={this.state.image}
                />
                </Panel>
                <Panel header="Scheduling">
                  <label htmlFor="duration">Duration in minutes</label>
                  <input
                    className="form-control"
                    type="number"
                    name="duration"
                    onChange={this.handleChange}
                    value={this.state.duration}
                    min="15"
                  />
                </Panel>
              </Col>
            </Row>
          </Form>
        </Grid>
      </div>
    );
  }
}

export default EventNew;
