// REQUIREMENTS
var buffer = require('buffer');
var AsyncStorage = require('react-native').AsyncStorage;
var _ = require('lodash');

// CONSTANTS
const AuthKey = 'auth';
const UserKey = 'user';

class AuthService {
    getAuthInfo(cb){
        AsyncStorage.multiGet([AuthKey,UserKey],(err, val) => {
            // Capture err
            if(err){
              return cb(err);
            }
            // If empty value
            if(!val){
              return cb();
            }

            var zippedObj = {};

            val.map( (result, i, store) => {
             let key = store[i][0];
             let value = store[i][1];
             zippedObj[key] = value;
           });

            if(!zippedObj[AuthKey]){
              return cb();
            }
            var authInfo = {
              header: {
                Authorization: 'Basic '+zippedObj[AuthKey]
              },
              user: JSON.parse(zippedObj[UserKey])
            }
            return cb(null, authInfo);
        })
    }

    login(creds, cb) {
      var b = new buffer.Buffer(creds.username+':'+creds.password);
      var encodedAuth = b.toString('base64');

      fetch('https://api.github.com/user',{
        headers: {
          'Authorization': 'Basic '+ encodedAuth
        }
      })
        .then((response) => {
          if(response.status >= 200 && response.status < 300) {
            return response;
          }

          throw {
            badCredentials: response.status == 401,
            unknownError: response.status != 401
          }

          throw 'Unknown error';
        })
        .then((response)=> {
          return response.json();
        })
        .then((result) => {
          AsyncStorage.multiSet([
            [AuthKey, encodedAuth],
            [UserKey, JSON.stringify(result)]
          ],(err)=> {
            if(err){
              throw err;
            }
            return cb({success: true});
          })
        })
        .catch((err) => {
          return cb(err)
        });
    }
}


module.exports = new AuthService()
