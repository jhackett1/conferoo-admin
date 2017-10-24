import Request from 'request';

const eventApi = {

  listEvents: function(cb){


      var headers = {
        // Authorization: token
      };

      Request.get('http://localhost:3003/api' + '/events', {
        json: true,
        headers: headers
      }, function(err, response, eventsList){
        // if(err){return next(err)};
        // console.log(eventsList)
        // return eventsList;
        return cb(eventsList);
      });


  }

};

export default eventApi;
