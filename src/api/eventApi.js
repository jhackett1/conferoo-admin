import Axios from 'axios';
import config from '../config';
import UserService from '../UserService';
import Toastr from 'toastr';

var host = config.api_host + config.api_path;

// Communicate with the Conferoo API, retrieving and sending event data

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

const EventApi = {

  // Get all events
  getEventsList: function(cb){
    Axios({
      method: 'get',
      url: host + '/events/',
      headers: {
        Authorization: UserService.getToken()
      }
    })
      .then(function (response) {
        return cb(null, response.data)
      })
      .catch(function (error) {
        UserService.expiredToken(error);
        // Did a HTTP response come back? i.e. is the network/server up?
        if(error.response){
          errorBuilder(error)
        } else {
          return networkError();
        }
      });
  },

  // Get single event by ID
  getSingleEvent: function(eventId, cb){
    Axios({
      method: 'get',
      url: host + '/events/' + eventId,
      headers: {
        Authorization: UserService.getToken()
      }
    })
      .then(function (response) {
        return cb(null, response.data)
      })
      .catch(function (error) {
        UserService.expiredToken(error);
        // Did a HTTP response come back? i.e. is the network/server up?
        if(error.response){
          errorBuilder(error)
        } else {
          return networkError();
        }
      });
  },

  // Create new event, passing in JSON
  createEvent: function(newEvent, cb){
    Axios({
      method: 'post',
      url: host + '/events/',
      headers: {
        Authorization: UserService.getToken()
      },
      data: newEvent
    })
      .then(function (response) {
        return cb(null, response.data)
      })
      .catch(function (error) {
        UserService.expiredToken(error);
        // Did a HTTP response come back? i.e. is the network/server up?
        if(error.response){
          errorBuilder(error)
        } else {
          return networkError();
        }
      });
  },

  // Update an existing event by ID, passing in new JSON key-values to update
  updateEvent: function(eventId, updatedEvent, cb){
    Axios({
      method: 'patch',
      url: host + '/events/' + eventId,
      headers: {
        Authorization: UserService.getToken()
      },
      data: updatedEvent
    })
      .then(function (response) {
        return cb(null, response.data)
      })
      .catch(function (error) {
        UserService.expiredToken(error);
        // Did a HTTP response come back? i.e. is the network/server up?
        if(error.response){
          errorBuilder(error)
        } else {
          return networkError();
        }
      });
  },

  // Delete an event by ID
  deleteEvent:  function(eventId, cb){
    Axios({
      method: 'delete',
      url: host + '/events/' + eventId,
      headers: {
        Authorization: UserService.getToken()
      }
    })
      .then(function (response) {
        return cb(null, response.data)
      })
      .catch(function (error) {
        UserService.expiredToken(error);        
        // Did a HTTP response come back? i.e. is the network/server up?
        if(error.response){
          errorBuilder(error)
        } else {
          return networkError();
        }
      });
  }
};

export default EventApi;
