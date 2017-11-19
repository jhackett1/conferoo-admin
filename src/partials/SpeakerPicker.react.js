import React, { Component } from 'react';
import {Modal, Button, Form, FormControl} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import SpeakerApi from '../api/speakerApi';

class MediaPicker extends Component {
  constructor(){
    super();
    this.state = {
      modalVisible: false,
      chosenSpeaker: '',
      speakerList: []
    }
  }

  // Fetch media and display the modal
  showModal = () => {
    SpeakerApi.getSpeakersList((err, list)=>{
        if(err) console.log(err);
        this.setState({
          modalVisible: true,
          speakerList: list
        })
    })
  }

  // Hide the modal
  hideModal = () => {
    this.setState({modalVisible: false});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.hideModal();
    var chosenSpeaker = e.target.chosenSpeaker.value;
    this.props.onChange({
        speakerPicker: true,
        chosenSpeaker: chosenSpeaker
    });
  }

  render(){

    // Get a list of programmes to populate a dropdown select control
    const SpeakerList = this.state.speakerList.map((speaker) => {
      return(<option key={speaker._id} value={speaker._id}>{speaker.name}</option>);
    });

    return(
      <div>
        <Button onClick={this.showModal}><span className="glyphicon glyphicon-user"></span>   Choose speaker</Button>
        <Modal show={this.state.modalVisible}>
        <Modal.Header closeButton onClick={this.hideModal}>
          <Modal.Title>Choose speaker</Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.handleSubmit}>
          <Modal.Body>
            <FormControl
              name="chosenSpeaker"
              type="select"
              componentClass="select"
            >
              {SpeakerList}
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
                        <Link to="/speakers/new" className="pull-left small">Add new</Link>
            <Button type="submit" bsStyle="primary">Use selected</Button>
          </Modal.Footer>
        </Form>
        </Modal>
      </div>

    );
  }
}

export default MediaPicker;
