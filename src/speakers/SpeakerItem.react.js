import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class SpeakerItem extends Component {

  render() {

    const speaker = this.props.speaker;

    return (
      <Link to={"/speakers/edit/" + speaker._id} key={speaker._id} className="list-group-item">
        <div className="media">
          <div className="media-left media-middle">
             <img className="media-object" src={speaker.image}/>
          </div>
          <div className="media-body">
          <h4 className="list-group-item-heading">{speaker.name}</h4>
          <p className="list-group-item-text">{speaker.biography}</p>
          </div>
        </div>
      </Link>
    );
  }
}

export default SpeakerItem;
