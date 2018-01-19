import Axios from 'axios';
import config from '../config';
import UserService from '../UserService';
import Toastr from 'toastr';

var host = config.api_host + config.api_path;

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


const UserApi = {

  // Get all speakers
  getUserList: function(cb){
    Axios({
      method: 'get',
      url: host + '/users/',
      headers: {
        Authorization: UserService.getToken()
      }
    })
      .then(function (response) {
        console.log(response.data)
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

export default UserApi;
