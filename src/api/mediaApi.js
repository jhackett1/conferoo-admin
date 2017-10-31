import Axios from 'axios';
import config from '../config';
import UserService from '../UserService';
import Toastr from 'toastr';

var host = config.api_host + config.api_path;
// Communicate with the Conferoo API, retrieving and sending media data

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

const MediaApi = {

  // Get all media
  getMediaList: function(cb){
    Axios({
      method: 'get',
      url: host + '/media/',
      headers: {
        Authorization: UserService.getToken()
      }
    })
      .then(function (response) {
        return cb(null, response.data)
      })
      .catch(function (error) {
        // Did a HTTP response come back? i.e. is the network/server up?
        if(error.response){
          errorBuilder(error)
        } else {
          return networkError();
        }
      });
  },

  // Create new media, passing in JSON
  createMedia: function(newMedia, cb, uploadProgress){
    // Put file in formdata
    const formData = new FormData();
    formData.append('upload',newMedia)
    // Post the upload to the server
    Axios.post(host + '/media/', formData, {
        headers: {
          'Authorization': UserService.getToken(),
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvt) => {
          uploadProgress(progressEvt.loaded)
        }
    })
      .then(function (response) {
        return cb(null, response.data)
      })
      .catch(function (error) {
        // Did a HTTP response come back? i.e. is the network/server up?
        if(error.response){
          errorBuilder(error)
        } else {
          return networkError();
        }
      });

  },

  // Delete an media by ID
  deleteMedia:  function(mediaId, cb){
    Axios({
      method: 'delete',
      url: host + '/media/' + mediaId,
      headers: {
        Authorization: UserService.getToken()
      }
    })
      .then(function (response) {
        return cb(null, response.data)
      })
      .catch(function (error) {
        // Did a HTTP response come back? i.e. is the network/server up?
        if(error.response){
          errorBuilder(error)
        } else {
          return networkError();
        }
      });
  }
};

export default MediaApi;
