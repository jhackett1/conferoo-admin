// TODO: Refactor this to includ support for 'medium' images
// And possibly refactor the database models too?


import React, { Component } from 'react';
import {Modal, Button, Form, FormControl} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import MediaApi from '../api/mediaApi';
import './mediapicker.css';

class MediaPicker extends Component {
  constructor(){
    super();
    this.state = {
      modalVisible: false,
      chosenMedia: '',
      preview: '',
      medium: '',
      mediaList: []
    }
  }

  // Fetch media and display the modal
  showModal = () => {
    MediaApi.getMediaList((err, list)=>{
        if(err) console.log(err);
        this.setState({
          modalVisible: true,
          mediaList: list
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
    var chosenMedia = e.target.chosenMedia.value;
    var preview = this.state.preview;
    var medium = this.state.medium;
    this.props.onChange({
        mediaPicker: true,
        chosenMedia: chosenMedia,
        preview: preview,
        medium: medium
    });
  }

  render(){

    const selectMedia = (chosenMedia, preview, medium) => {
      this.setState({
        chosenMedia: chosenMedia,
        preview: preview,
        medium: medium
      })
    }

    const MediaList = this.state.mediaList.map(function(mediaItem){
      return (
        <li key={mediaItem._id} onClick={(e)=>{
          var items = document.querySelectorAll('ul#media-picker-list li img');
          for (var i = 0; i < items.length; i++) {
            items[i].classList.remove('selected');
          }
          e.target.classList.add('selected')
          selectMedia(mediaItem.sources.full, mediaItem.sources.preview, mediaItem.sources.medium)
        }}>
          <img alt={mediaItem.name} src={mediaItem.sources.preview}/>
        </li>
      )
    })

    return(
      <div>
        <Button onClick={this.showModal}><span className="glyphicon glyphicon-picture"></span>   Choose media</Button>
        <Modal show={this.state.modalVisible}>
        <Modal.Header closeButton onClick={this.hideModal}>
          <Modal.Title>Choose media</Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.handleSubmit}>
          <Modal.Body>
            <FormControl
              name="chosenMedia"
              type="text"
              value={this.state.chosenMedia}
              onChange={(e)=>{
                this.setState({
                  chosenMedia: e.target.value
                })
              }}
            />
            <ul id="media-picker-list">
              {MediaList}
            </ul>
          </Modal.Body>
          <Modal.Footer>
                        <Link to="/media" className="pull-left small">Upload new</Link>
            <Button type="submit" bsStyle="primary">Use selected</Button>
          </Modal.Footer>
        </Form>
        </Modal>
      </div>

    );
  }
}

export default MediaPicker;
