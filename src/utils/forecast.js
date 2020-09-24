const request=require('request')

const forecast=(lan,lon,callback)=>{
    // const lat_long="lat="+String(lan)+"&lon="+String(lon)
    const url='https://api.openweathermap.org/data/2.5/weather?lat='+lan+'&lon='+lon+'&units=metric&appid=6d5a5f42924b034b8571280fe2d49907'
     request({url,json:true},(error,{body})=>{
        // const data=JSON.parse(response)
         if(error){
             callback('Unable to connect to MapServices',undefined)
         } else if(body.message){
             callback('Unable to find location. Try another search',undefined)
         } else{
             callback(undefined,'It is currently '+body.main.temp+' Degree Celsius & its '+body.weather[0].description)
         }
     })

}
module.exports=forecast
