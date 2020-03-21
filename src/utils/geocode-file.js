const request=require('request')
const geocode=(address,callback) => {
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicHJhc2hhbnQxMTEiLCJhIjoiY2s3c3k0Z2hyMGhqYjNycGd4NXBham5sYyJ9.uNO35JYP-LYgt96vNwRRVQ&limit=1';
    request({url,json:true},(error,{body}) => {
        if(error){
            callback('unable to connect',undefined)

        }else if(body.features.length===0){
                callback('unable to find location',undefined)
        }else{
            callback(undefined,{latitude:body.features[0].center[1],longitude:body.features[0].center[0],location:body.features[0].place_name})
        }

    })
    console.log('abc')
}

module.exports=geocode