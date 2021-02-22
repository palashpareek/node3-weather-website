const request = require('request')

const geocode = (address, callback) =>{
          
          const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoicGFsYXNoOTgiLCJhIjoiY2tpZTN1NDkxMDgxajJxbGJ4cGl3eWo1NCJ9.5lLJAo1fPKof1ldMQLkT9Q&limit=1'


          request({url: url, json: true}, (error, response) => {
          	if(error){
          		callback('Unable to connect to location services!!', undefined)
          	}
          	else if(response.body.message){
          		callback('Unable to find location, Try another search!',undefined)
          	}
          	else{
          		callback(undefined, {

          			longitude: response.body.features[0].center[0],
          			latitude:  response.body.features[0].center[1],
          			location:  response.body.features[0].place_name
          		})
          	}
          })
}

module.exports = geocode