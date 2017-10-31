import React, {Component} from 'react';
import { ListGroup, ListGroupItem, Button, ButtonToolbar, ButtonGroup, DropdownButton, MenuItem} from 'react-bootstrap';
import MediaApi from '../api/mediaApi';
import MediaUpload from './MediaUpload.react';
import Humandate from 'human-date';
import Toastr from 'toastr';

class MediaList extends Component {
  constructor(props){
    super(props);
    this.state = {
      media: [],
      uploaderVisible: false,
      sort: 'name'
    }
    this.showUploader = this.showUploader.bind(this);
    this.hideUploader = this.hideUploader.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.getList = this.getList.bind(this);
  }

  componentDidMount(){
    this.getList();
  }

  getList(){
    MediaApi.getMediaList((err, list)=>{
        if(err) console.log(err);
        this.setState({media: list})
    })
  }

  showUploader(){
    this.setState({
      uploaderVisible: true
    })
  }

  hideUploader(){
    this.setState({
      uploaderVisible: false
    })
  }

  handleDelete(i){
    // Grab ID to delete from state
    var id =this.state.media[i]._id;
    // Pull deleted item off state
    var newList = this.state.media;
    newList.splice(i, 1);
    this.setState({
      media: newList
    })
    // Make API call to finalise delete
    MediaApi.deleteMedia(id, function(err, response){
      if(err){
        Toastr.error(err);
      } else {
        Toastr.success(response.message);
      }
    })

  }


  render(){
    const List = this.state.media.map((medium, i) => {
      return(
          <ListGroupItem key={medium._id} className="list-group-item">
            <div className="media">
              <div className="media-left media-middle">
                 <img className="media-object" src={medium.sources.preview}/>
              </div>
              <div className="media-body">
              <ButtonToolbar className="pull-right">
                <ButtonGroup bsSize="small">
                  <Button onClick={this.handleDelete.bind(this, i)}bsStyle="danger">Delete</Button>
                </ButtonGroup>
              </ButtonToolbar>
              <h4 className="list-group-item-heading"></h4>
              <p className="list-group-item-text">{medium.sources.full}</p>
              <small>{Humandate.relativeTime(medium.uploadedAt)}</small>
              </div>
            </div>
          </ListGroupItem>
      )
    })

    return(
      <div>
        <div className="container">
          <MediaUpload uploaderVisible={this.state.uploaderVisible} hideUploader={this.hideUploader} getList={this.getList}/>
          <div className="page-header">
            <div className='btn-toolbar pull-right'>
              <div className='btn-group'>
                  <Button onClick={this.showUploader} className="btn btn-primary">New upload</Button>
              </div>
            </div>
            <h1>All media</h1>
          </div>
          <ListGroup>{List}</ListGroup>
        </div>
      </div>
    )
  }

}

export default MediaList;
