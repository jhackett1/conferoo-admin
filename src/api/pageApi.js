import Axios from 'axios';
import config from '../config';
import UserService from '../UserService';
import Toastr from 'toastr';

var host = config.api_host + config.api_path;
// Communicate with the Conferoo API, retrieving and sending page data

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

const PageApi = {

  // Get all pages
  getPagesList: function(cb){
    Axios({
      method: 'get',
      url: host + '/pages/',
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

  // Get single page by ID
  getSinglePage: function(pageId, cb){
    Axios({
      method: 'get',
      url: host + '/pages/' + pageId,
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

  // Create new page, passing in JSON
  createPage: function(newPage, cb){
    Axios({
      method: 'post',
      url: host + '/pages/',
      headers: {
        Authorization: UserService.getToken()
      },
      data: newPage
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

  // Update an existing page by ID, passing in new JSON key-values to update
  updatePage: function(pageId, updatedPage, cb){
    Axios({
      method: 'patch',
      url: host + '/pages/' + pageId,
      headers: {
        Authorization: UserService.getToken()
      },
      data: updatedPage
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

  // Delete an page by ID
  deletePage:  function(pageId, cb){
    Axios({
      method: 'delete',
      url: host + '/pages/' + pageId,
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

export default PageApi;
