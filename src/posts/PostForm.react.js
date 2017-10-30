import React, { Component } from 'react';
import {Row, Col, Panel, Form, FormGroup, FormControl, ButtonToolbar, Button, Radio} from 'react-bootstrap';
import Quill from '../partials/Quill.react';

class PostForm extends Component {
  render() {
    const isBlocking = this.props.isBlocking;

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
              <FormControl
                type="text"
                placeholder="URL of featured image"
                name="image"
                onChange={this.props.handleChange}
                value={this.props.newPost.image}
              />
            </Panel>
            <Panel header="Author">
              <FormControl
                type="text"
                placeholder="Name of the speaker who wrote this post"
                name="author"
                onChange={this.props.handleChange}
                value={this.props.newPost.author}
              />
            </Panel>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default PostForm;
