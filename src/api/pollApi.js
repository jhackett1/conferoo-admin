import Axios from 'axios';
import config from '../config';
import UserService from '../UserService';
import Toastr from 'toastr';

var host = config.api_host + config.api_path;

// Communicate with the Conferoo API, retrieving and sending poll data

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

const PollApi = {

  // Get all polls
  getPollsList: function(cb){
    Axios({
      method: 'get',
      url: host + '/polls/',
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

  // Get single poll by ID
  getSinglePoll: function(pollId, cb){
    Axios({
      method: 'get',
      url: host + '/polls/' + pollId,
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

  // Create new poll, passing in JSON
  createPoll: function(newPoll, cb){
    Axios({
      method: 'post',
      url: host + '/polls/',
      headers: {
        Authorization: UserService.getToken()
      },
      data: newPoll
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

  // Update an existing poll by ID, passing in new JSON key-values to update
  updatePoll: function(pollId, updatedPoll, cb){
    Axios({
      method: 'patch',
      url: host + '/polls/' + pollId,
      headers: {
        Authorization: UserService.getToken()
      },
      data: updatedPoll
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

  // Delete an poll by ID
  deletePoll:  function(pollId, cb){
    Axios({
      method: 'delete',
      url: host + '/polls/' + pollId,
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

export default PollApi;
