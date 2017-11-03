import React, { Component } from 'react';
import {Row, Col, Panel, Form, FormGroup, FormControl, ButtonToolbar, Button, Radio, Checkbox} from 'react-bootstrap';
import config from '../config';

class EventForm extends Component {
  render() {

    const isBlocking = this.props.isBlocking;

    // Get a list of themes to populate a checkbox control
    const Themes = config.themes.map((theme) => {
      return(
        <Checkbox
          value={theme}
          onChange={this.props.handleCheckboxChange.bind(this)}
          checked={this.props.newEvent.themes.includes(theme)}
        >{theme}</Checkbox>
      );
    });

    const Options = () => {
      if(this.props.newEvent.type && this.props.newEvent.type === 'multiple'){
        return(
          <Panel header="Multiple choice options" className="panel">
          </Panel>
        );
      } else {
        return null;
      }
    };

    // Show the right buttons for 'new' or 'edit' mode.
    const Buttons = ()=>{
      if(this.props.mode === "new"){
        return (
          <ButtonToolbar>
            <Button type="submit" onClick={this.props.handleSubmit} bsStyle="primary">Publish</Button>
          </ButtonToolbar>
        )
      } else {
        return (
          <ButtonToolbar>
            <Button type="button" onClick={this.props.handleDelete} bsStyle="danger">Delete</Button>
            <Button type="submit" onClick={this.props.handleSubmit} bsStyle="primary">Update</Button>
          </ButtonToolbar>
        )
      }
    }

    return (
      <Form>
        <Row className="show-grid">
          <Col xs={12} md={8}>

            <FormControl
              type="text"
              name="question"
              onChange={this.props.handleChange}
              value={this.props.newEvent.question}
              bsSize="large"
              placeholder="Question"
            />

            <Panel header="Detail">
              <FormControl
                type="textarea"
                name="detail"
                rows="2"
                componentClass="textarea"
                placeholder="Explanation of the question"
                onChange={this.props.handleChange}
                value={this.props.newEvent.detail}
              />
            </Panel>

            <Options />

          </Col>
          <Col xs={12} md={4}>

            <Panel header="Publish" className="panel-primary">
              <FormGroup onChange={this.props.handleChange.bind(this)}>
                <Radio name="published" value='private' checked={this.props.newEvent.published === 'private' ? 'true' : ''} inline>Private</Radio>
                <Radio name="published" value='inactive' checked={this.props.newEvent.published === 'inactive' ? 'true' : ''} inline>Inactive</Radio>
                <Radio name="published" value='active' checked={this.props.newEvent.published === 'active' ? 'true' : ''} inline>Active</Radio>
              </FormGroup>
              <Buttons/>
            </Panel>

            <Panel header="Type" className="panel-primary">
              <FormGroup onChange={this.props.handleChange.bind(this)}>
                <Radio name="type" value='multiple' checked={this.props.newEvent.type === 'multiple' ? 'true' : ''} inline>Multiple-choice</Radio>
                <Radio name="type" value='open' checked={this.props.newEvent.type === 'open' ? 'true' : ''} inline>Open</Radio>
              </FormGroup>
            </Panel>

            <Panel header="Themes">
              <FormGroup name="themes">
                {Themes}
              </FormGroup>
            </Panel>

          </Col>
        </Row>
      </Form>
    );
  }
}

export default EventForm;
