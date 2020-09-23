const request=require('request')
const chalk=require('chalk')

const geocode=(address,callback)=>{
   const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?limit=1&access_token=pk.eyJ1Ijoicml0aWthMjciLCJhIjoiY2tld3o2ajFqMDY1bTJ0cno4a2hjOWx0eCJ9.m7Xbi9wYCGyQaPJ_n-GD2A'
request({url, json:true},(error,{body}={})=>{
   if(error){
       callback('Unable to connect to location services',undefined)
   } else if(body.features.length === 0){
       callback('Unable to find location. Try Another Search.',undefined)
   } else{
       callback(undefined,{
           location: body.features[0].place_name,
           latitude: body.features[0].center[1],
           longitude:body.features[0].center[0]
       })
   }
})
}

module.exports=geocode