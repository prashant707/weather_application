const request=require('request')
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

// const unit='si'

//+'37.8267,-122.4233'

const forecast=(latitude,longitude,callback)=>{

const url='https://api.darksky.net/forecast/201abf290f29ed3ec2ad25f90c469c07/'+latitude+','+longitude+'?units=si'
request({url,json:true},(error,{body})=>{
    if(error){
        callback('unable to connect',undefined)
    }else if(body.error){
console.log('unable to find location',undefined)
    }
    else{
        callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
})

}


  module.exports=forecast;
  