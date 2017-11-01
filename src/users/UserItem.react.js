import React, { Component } from 'react';

class UserItem extends Component {

  render() {

    const user = this.props.user;

    const AdminBadge = () => {
      if(user.admin){
        return (<span className="badge">Admin</span>);
      } else {
        return null;
      }
    }

    return (
      <li key={user._id} className="list-group-item">
        <AdminBadge/>
        <div className="media">
          <div className="media-left media-middle">
             <img alt={user.displayname} className="media-object" src={user.image}/>
          </div>
          <div className="media-body">
          <h4 className="list-group-item-heading">{user.displayname}</h4>
          <p className="list-group-item-text">{user.email}</p>
          <small>Attending {user.programme}</small>
          </div>
        </div>
      </li>
    );
  }
}

export default UserItem;
