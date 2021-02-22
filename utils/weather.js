const request = require('request')


const forecast = (longitude, latitude, callback) => {

	const url = 'http://api.weatherstack.com/current?access_key=b4e824bb7b487c7a9905840bd981d61a&query='+latitude+','+longitude
     
     request({url: url, json: true}, (error, response)=> {

     	if(error){
     		callback('Unable to connect to weather services!',undefined)
     	}
     	else if(response.body.error){
     		callback('Unable to find Location! Try with other location', undefined)
     	}
     	else
     	{
           callback(undefined, response.body.current.weather_descriptions[0]+'...It is currently '+response.body.current.temperature+' degree out. It feels like '+response.body.current.feelslike+' degree out')
     	}
     })
}


module.exports = forecast