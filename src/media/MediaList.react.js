import React, {Component} from 'react';
import { ListGroup, ListGroupItem, Button, ButtonToolbar, ButtonGroup, DropdownButton, MenuItem} from 'react-bootstrap';
import MediaApi from '../api/mediaApi';
import MediaUpload from './MediaUpload.react';
import Humandate from 'human-date';
import Toastr from 'toastr';
import Spinner from '../partials/Spinner.react';

class MediaList extends Component {
  constructor(props){
    super(props);
    this.state = {
      media: [],
      uploaderVisible: false,
      sort: 'name',
      isLoading: true
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
        this.setState({
          media: list,
          isLoading: false
        })
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
    // Make API call to finalise delete
    MediaApi.deleteMedia(id, (err, response)=>{
      if(err){
        Toastr.error(err);
      } else {
        newList.splice(i, 1);
        this.setState({
          media: newList
        })
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
              <h5 className="list-group-item-heading">{medium.title}</h5>
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
          <Spinner isLoading={this.state.isLoading}/>
          <ListGroup>{List}</ListGroup>
        </div>
      </div>
    )
  }

}

export default MediaList;
