import React, { Component } from 'react';
import {Row, Col, Panel, Form, FormGroup, FormControl, ButtonToolbar, Button, Radio, Checkbox} from 'react-bootstrap';
import config from '../config';
import MediaPicker from '../partials/MediaPicker.react';
import SpeakerPicker from '../partials/SpeakerPicker.react';

class EventForm extends Component {
  render() {
    const isBlocking = this.props.isBlocking;

    console.log('RE-RENDERING - programme prop is: ', this.props.newEvent.programme);

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

    // Get a list of venues to populate a dropdown select control
    const Venues = config.venues.map((venue) => {
      return(<option value={venue}>{venue}</option>);
    });

    // Get a list of programmes to populate a dropdown select control
    const Programmes = config.programmes.map((programme) => {
      return(<option value={programme}>{programme}</option>);
    });

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
              name="title"
              onChange={this.props.handleChange}
              value={this.props.newEvent.title}
              bsSize="large"
              placeholder="Title"
            />
            <Panel header="Content">
              <FormControl
                type="textarea"
                name="content"
                rows="8"
                componentClass="textarea"
                className="field-with-spacing"
                placeholder="A longer description of the event"
                onChange={this.props.handleChange}
                value={this.props.newEvent.content}
              />
              <FormControl
                type="text"
                placeholder="Enter URL of speakers' slides, if available"
                name="slides"
                onChange={this.props.handleChange}
                value={this.props.newEvent.slides}
              />
            </Panel>
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
                <Radio name="published" value='public' checked={this.props.newEvent.published === 'public' ? 'true' : ''} inline>Public</Radio>
                <Radio name="published" value='private' checked={this.props.newEvent.published === 'private' ? 'true' : ''} inline>Private</Radio>
              </FormGroup>
              <Buttons/>
            </Panel>
            <Panel header="Image">
              <FormGroup>
                <FormControl
                  type="text"
                  placeholder="Enter URL of featured image"
                  name="image"
                  onChange={this.props.handleChange}
                  value={this.props.newEvent.image}
                />
              </FormGroup>
              <MediaPicker
                onChange={this.props.handleMediaChange}
              />
            </Panel>
            <Panel header="Speaker">
              <FormGroup>
                <FormControl
                  type="text"
                  placeholder="ID of this event's speaker"
                  name="speaker"
                  onChange={this.props.handleChange}
                  value={this.props.newEvent.speaker}
                />
              </FormGroup>
              <SpeakerPicker name="speaker" onChange={this.props.handleChange}/>
            </Panel>
            <Panel header="Scheduling">
            <FormGroup>
              <label htmlFor="duration">Programme</label>
              <FormControl
                type="select"
                componentClass="select"
                placeholder="Name of the programme this event belongs to"
                name="programme"
                onChange={this.props.handleChange}
                value={this.props.newEvent.programme}
              >
                <option value={undefined}></option>
                {Programmes}
              </FormControl>

            </FormGroup>
            <FormGroup>
              <label htmlFor="venue">Venue</label>
              <FormControl
                type="select"
                componentClass="select"
                placeholder="Which room will this event take place in?"
                name="venue"
                onChange={this.props.handleChange}
                value={this.props.newEvent.venue}
                >
                  <option value={undefined}></option>
                  {Venues}
                </FormControl>
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
