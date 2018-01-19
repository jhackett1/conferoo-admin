// Methods to store and access the logged in user's token and profile in localStorage
import Toastr from 'toastr';

// Access Window object;
var localStorage = window.localStorage;

const UserService = {
  // Is there already a token stored in localStorage?
  checkToken(){
    let jwt = localStorage.getItem("conferoo_user_token");
    // If the token is set, return it, else return false
    if (jwt) {
      return true;
    } else {
      return false;
    }
  },
  // Save a token in localStorage
  saveToken(jwt){
    localStorage.setItem('conferoo_user_token', jwt);
  },
  saveProfile(profile){
    var profileString = JSON.stringify(profile);
    localStorage.setItem('profile', profileString);
  },
  // Retrieve a token from localStorage
  getToken(){
      var rawToken = localStorage.getItem("conferoo_user_token").toString();
      return "bearer " + rawToken;
  },
  getProfile(){
    var profileString = localStorage.getItem('profile');
    return JSON.parse(profileString);
  },
  // Destroy a token (eg. when logging out)
  removeToken(){
    localStorage.removeItem('conferoo_user_token');
  },
  // Handle a potentially expired token
  expiredToken(err){
    if (err.response.status === 401) {
      Toastr.error(`Your session has expired. Redirecting to login screen`)
      // Handle expired tokens
      document.location = '/login';
    }
  }
}

export default UserService;
