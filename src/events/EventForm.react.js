import React, { Component } from 'react';
import {Row, Col, Panel, Form, FormGroup, FormControl, ButtonToolbar, Button, Radio, Checkbox} from 'react-bootstrap';
import Quill from '../partials/Quill.react';
import config from '../config';

class EventForm extends Component {
  render() {
    const isBlocking = this.props.isBlocking;


    const Themes = config.themes.map((theme) => {
      return(
        <Checkbox value={theme}>{theme}</Checkbox>
      );
    });


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
              name="title"
              onChange={this.props.handleChange}
              value={this.props.newEvent.title}
              bsSize="large"
              placeholder="Title"
            />
            <Quill
              onChange={this.props.handleQuillChange}
              value={this.props.quillValue}
            />
            <Panel header="Teaser">
              <FormControl
                type="textarea"
                name="teaser"
                rows="2"
                componentClass="textarea"
                placeholder="A short summary of the event"
                onChange={this.props.handleChange}
                value={this.props.newEvent.teaser}
              />
            </Panel>
          </Col>
          <Col xs={12} md={4}>
            <Panel header="Publish" className="panel-primary">
              <FormGroup onChange={this.props.handleChange.bind(this)}>
                <Radio name="published" value='public' checked={this.props.newEvent.published == 'public' ? 'true' : ''} inline>Public</Radio>
                <Radio name="published" value='private' checked={this.props.newEvent.published == 'private' ? 'true' : ''} inline>Private</Radio>
              </FormGroup>
              <Buttons/>
            </Panel>
            <Panel header="Image">
              <FormControl
                type="text"
                placeholder="URL of featured image"
                name="image"
                onChange={this.props.handleChange}
                value={this.props.newEvent.image}
              />
            </Panel>
            <Panel header="Speaker">
              <FormControl
                type="text"
                placeholder="Name of this event's speaker"
                name="speaker"
                onChange={this.props.handleChange}
                value={this.props.newEvent.speaker}
              />
            </Panel>
            <Panel header="Scheduling">
            <FormGroup>
              <label htmlFor="duration">Programme</label>
              <FormControl
                type="text"
                placeholder="Name of the programme this event belongs to"
                name="programme"
                onChange={this.props.handleChange}
                value={this.props.newEvent.programme}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="venue">Venue</label>
              <FormControl
                type="text"
                placeholder="Which room will this event take place in?"
                name="venue"
                onChange={this.props.handleChange}
                value={this.props.newEvent.venue}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="duration">Duration (minutes)</label>
              <FormControl
                type="number"
                step="15"
                placeholder="How long does this event last?"
                name="duration"
                onChange={this.props.handleChange}
                value={this.props.newEvent.duration}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="time">Time (hh:mm)</label>
              <FormControl
                type="time"
                placeholder="When does this event happen?"
                name="time"
                onChange={this.props.handleChange}
                value={this.props.newEvent.time}
              />
            </FormGroup>
            </Panel>
            <Panel header="Themes">
              // TODO basic implementation, not yet tied into state or anything else
              <FormGroup>
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
