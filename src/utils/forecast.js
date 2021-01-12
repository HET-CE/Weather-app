const request = require('request');

const forecast = (latitude ,longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=e84129bc20b99e3b1452c36379b4e3ff&query=' + encodeURIComponent(latitude) + ','+ encodeURIComponent(longitude) +'&units=f'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect', undefined);
        }
        else if(response.body.error){
            callback('Unable to find location', undefined)
        }
        else{
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " °F " + 'And Observation Time '+ response.body.current.observation_time)
        }
    })
}   
module.exports = forecast