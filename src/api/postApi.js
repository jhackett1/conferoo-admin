import Axios from 'axios';
import config from '../config';
import UserService from '../UserService';
import Toastr from 'toastr';

var host = config.api_host;
// Communicate with the Conferoo API, retrieving and sending post data

// Helper function for building usable error objects, rather than the string
function errorBuilder(error){
  Toastr.error(error.response.data.message)
  return {
    status: error.response.status,
    data: error.response.data,
    headers: error.response.headers
  };
};

function networkError(error){
  Toastr.error(`Trouble communicating with server. Please try again later.`)
}

const PostApi = {

  // Get all posts
  getPostsList: function(cb){
    Axios({
      method: 'get',
      url: host + '/posts/',
      headers: {
        Authorization: UserService.getToken()
      }
    })
      .then(function (response) {
        return cb(null, response.data)
      })
      .catch(function (error) {
        if(!error.statusCode){
          return networkError();
        } else {
          return cb(errorBuilder(error), null);
        }
      });
  },

  // Get single post by ID
  getSinglePost: function(postId, cb){
    Axios({
      method: 'get',
      url: host + '/posts/' + postId,
      headers: {
        Authorization: UserService.getToken()
      }
    })
      .then(function (response) {
        return cb(null, response.data)
      })
      .catch(function (error) {
        if(!error.statusCode){
          return networkError();
        } else {
          return cb(errorBuilder(error), null);
        }
      });
  },

  // Create new post, passing in JSON
  createPost: function(newPost, cb){
    Axios({
      method: 'post',
      url: host + '/posts/',
      headers: {
        Authorization: UserService.getToken()
      },
      data: newPost
    })
      .then(function (response) {
        return cb(null, response.data)
      })
      .catch(function (error) {
        if(!error.statusCode){
          return networkError();
        } else {
          return cb(errorBuilder(error), null);
        }
      });
  },

  // Update an existing post by ID, passing in new JSON key-values to update
  updatePost: function(postId, updatedPost, cb){
    Axios({
      method: 'patch',
      url: host + '/posts/' + postId,
      headers: {
        Authorization: UserService.getToken()
      },
      data: updatedPost
    })
      .then(function (response) {
        return cb(null, response.data)
      })
      .catch(function (error) {
        if(!error.statusCode){
          return networkError();
        } else {
          return cb(errorBuilder(error), null);
        }
      });
  },

  // Delete an post by ID
  deletePost:  function(postId, cb){
    Axios({
      method: 'delete',
      url: host + '/posts/' + postId,
      headers: {
        Authorization: UserService.getToken()
      }
    })
      .then(function (response) {
        return cb(null, response.data)
      })
      .catch(function (error) {
        if(!error.statusCode){
          return networkError();
        } else {
          return cb(errorBuilder(error), null);
        }
      });
  }
};

export default PostApi;
