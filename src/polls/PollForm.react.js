import React, { Component } from 'react';
import {Row, Col, Panel, Form, FormGroup, FormControl, ButtonToolbar, Button, Radio, Checkbox, ListGroup, ListGroupItem} from 'react-bootstrap';
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

    const CharCount = () => {
      if (this.props.newEvent.detail) {
        let remaining = 300 - this.props.newEvent.detail.length;
          if (remaining > 0) {
            return(
              <p className="help-text spaced">{remaining} characters of recommended count remaining.</p>
            )
          } else {
            return(
              <p className="warn-text spaced"><strong>{remaining} characters over recommended count. Poll may not look its best in all places.</strong></p>
            )
          }
      } else {
        return null
      }
    }

    const OpenResponses = this.props.newEvent.openResponses.map((response)=>
      <ListGroupItem header={`"` + response.message + `"`}>From {response.email}</ListGroupItem>
    )

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
              <CharCount/>
            </Panel>

            <Panel header="Multiple choice options" className={(this.props.newEvent.type === 'multiple') ? 'panel' : 'hidden panel'}>
              <p>Enter at least two options for delegates to choose from</p>
              <FormControl
                type="text"
                name="a"
                key="a"
                onChange={this.props.handleOptionsChange}
                value={this.props.newEvent.options.a}
                className="field-with-spacing"
                placeholder="Option A"
              />
              <FormControl
                type="text"
                name="b"
                key="b"
                onChange={this.props.handleOptionsChange}
                value={this.props.newEvent.options.b}
                className="field-with-spacing"
                placeholder="Option B"
              />
              <FormControl
                type="text"
                name="c"
                key="c"
                onChange={this.props.handleOptionsChange}
                value={this.props.newEvent.options.c}
                className="field-with-spacing"
                placeholder="Option C"
              />
              <FormControl
                type="text"
                name="d"
                key="d"
                onChange={this.props.handleOptionsChange}
                value={this.props.newEvent.options.d}
                placeholder="Option D"
              />
            </Panel>

            <Panel header="Responses" className={(this.props.newEvent.type === 'multiple') ? 'panel-info' : 'hidden panel'}>
              Multiple choice responses here
            </Panel>

            <Panel header="Responses" className={(this.props.newEvent.type === 'open') ? 'panel-info' : 'hidden panel'}>
              <ListGroup>
              {OpenResponses}
              </ListGroup>
            </Panel>

          </Col>
          <Col xs={12} md={4}>

            <Panel header="Publish" className="panel-primary">
              <FormGroup onChange={this.props.handleChange.bind(this)}>
                <Radio name="published" value='private' checked={this.props.newEvent.published === 'private' ? 'true' : ''} inline>Private</Radio>
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
