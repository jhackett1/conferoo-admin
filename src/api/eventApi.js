import Request from 'request';

// TODO: Move this stuff into a constants/config file
var token = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsb2NhbGhvc3QiLCJzdWIiOiI1OWVmNDQyZmI0OGNkMGM0MzYzMDQzMTciLCJhZG1pbiI6dHJ1ZSwiZXhwIjoxNTA5MDI2MjE3ODUzfQ.1hD6Q2NCuJ0tuyBjflyaoHeMTs-2MFQl1MwxK-7MEIM';
var host = 'http://localhost:3000/api'
var headers = {
  Authorization: token
};

// Communicate with the Conferoo API, retrieving and sending event data

const eventApi = {

  // Get all events
  getEventsList: function(cb){
      Request.get(host + '/events', {
        json: true,
        headers: headers
      }, function(err, response, eventsList){
        if(err){
          return console.error(err)
        } else {
        return cb(eventsList);
        }
      });
  },

  // Get single event by ID
  getSingleEvent: function(eventId, cb){
      Request.get(host + '/events/' + eventId, {
        json: true,
        headers: headers
      }, function(err, response, singleEvent){
        if(err){
          return console.error(err)
        } else {
        return cb(singleEvent);
        }
      });
  },

  // Create new event, passing in JSON
  createEvent: function(newEvent, cb){
      Request.post(host + '/events/', {
        json: true,
        headers: headers,
        body: newEvent
      }, function(err, response, createdEvent){
        if(err){
          return console.error(err)
        } else {
        return cb(createdEvent);
        }
      });
  },

  // Update an existing event by ID, passing in new JSON key-values to update
  updateEvent: function(eventId, updatedEvent, cb){
      Request.patch(host + '/events/' + eventId, {
        json: true,
        headers: headers,
        body: updatedEvent
      }, function(err, response, updatedEvent){
        if(err){
          return console.error(err)
        } else {
        return cb(updatedEvent);
        }
      });
  },

  // Delete an event by ID
  deleteEvent:  function(eventId, cb){
      Request.delete(host + '/events/' + eventId, {
        json: true,
        headers: headers
      }, function(err, response, deletedEvent){
        if(err){
          return console.error(err)
        } else {
        return cb(deletedEvent);
        }
      });
  }
};

export default eventApi;
