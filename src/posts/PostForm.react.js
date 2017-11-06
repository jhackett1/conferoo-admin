import React, { Component } from 'react';
import {Row, Col, Panel, Form, FormGroup, FormControl, ButtonToolbar, Button, Radio, Checkbox} from 'react-bootstrap';
import Quill from '../partials/Quill.react';
import config from '../config';

import MediaPicker from '../partials/MediaPicker.react';
import SpeakerPicker from '../partials/SpeakerPicker.react';

class PostForm extends Component {
  render() {
    const isBlocking = this.props.isBlocking;

    // Get a list of themes to populate a checkbox control
    const Themes = config.themes.map((theme) => {
      return(
        <Checkbox
          value={theme}
          onChange={this.props.handleCheckboxChange.bind(this)}
          checked={this.props.newPost.themes.includes(theme)}
        >{theme}</Checkbox>
      );
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
              value={this.props.newPost.title}
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
                placeholder="A short summary of the post"
                onChange={this.props.handleChange}
                value={this.props.newPost.teaser}
              />
            </Panel>
          </Col>
          <Col xs={12} md={4}>
            <Panel header="Publish" className="panel-primary">
              <FormGroup onChange={this.props.handleChange.bind(this)}>
                <Radio name="published" value='public' checked={this.props.newPost.published == 'public' ? 'true' : ''} inline>Public</Radio>
                <Radio name="published" value='private' checked={this.props.newPost.published == 'private' ? 'true' : ''} inline>Private</Radio>
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
                  value={this.props.newPost.image}
                />
              </FormGroup>
              <MediaPicker
                onChange={this.props.handleMediaChange}
              />
            </Panel>
            <Panel header="Author">
              <FormGroup>
                <FormControl
                  type="text"
                  placeholder="Name of the speaker who wrote this post"
                  name="author"
                  onChange={this.props.handleChange}
                  value={this.props.newPost.author}
                />
              </FormGroup>
              <SpeakerPicker name="author" onChange={this.props.handleChange}/>
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

export default PostForm;
