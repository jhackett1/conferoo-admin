import React, { Component } from 'react';
import {Row, Col, Panel, Form, FormGroup, FormControl, ButtonToolbar, Button, Radio, Checkbox} from 'react-bootstrap';
import Editor from '../partials/TinyMCE.react';
import config from '../config';

class PageForm extends Component {
  render() {
    const isBlocking = this.props.isBlocking;

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
              value={this.props.newPage.title}
              bsSize="large"
              placeholder="Title"
            />
            <Editor
              onChange={this.props.handleTinyMCEChange}
            />
          </Col>
          <Col xs={12} md={4}>
            <Panel header="Publish" className="panel-primary">
              <FormGroup onChange={this.props.handleChange.bind(this)}>
                <Radio name="published" value='public' checked={this.props.newPage.published == 'public' ? 'true' : ''} inline>Public</Radio>
                <Radio name="published" value='private' checked={this.props.newPage.published == 'private' ? 'true' : ''} inline>Private</Radio>
              </FormGroup>
              <Buttons/>
            </Panel>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default PageForm;
