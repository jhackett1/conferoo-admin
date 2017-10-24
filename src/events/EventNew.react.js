import React, { Component } from 'react';
import {Grid, Row, Col, Panel, Form, FormGroup, FormControl, Radio, ButtonToolbar, Button} from 'react-bootstrap';
import eventApi from '../api/eventApi';
import Tiny from '../partials/TinyMce.react';

class EventNew extends Component {


  render() {
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
                  bsSize="large"
                  placeholder="Title"
                />
                <Tiny content="hello"/>
                <Panel header="Teaser">
                  <FormControl
                    type="text"
                    placeholder="A short teaser sentence"
                  />
                </Panel>
              </Col>
              <Col xs={12} md={4}>
                <Panel header="Publish">

                  <FormGroup>
                    <Radio name="radioGroup" inline>Public</Radio>
                    {' '}
                    <Radio name="radioGroup" inline>Private</Radio>
                  </FormGroup>

                  <ButtonToolbar>
                  <Button bsStyle="primary">Publish</Button>
                  <Button bsStyle="danger">Delete</Button>
                  </ButtonToolbar>
                </Panel>
                <Panel header="Scheduling">

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
