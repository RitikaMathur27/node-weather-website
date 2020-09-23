const request=require('request')
const chalk=require('chalk')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')
const address=process.argv[2]
if(!address){
    return console.log(chalk.blue.inverse("Please provide an address"))
} else{

 geocode(address,(error,{latitude,longitude,location})=>{
    if(error){
        return console.log(chalk.red('Error!',error))
    }
    forecast(latitude,longitude,(error,forecastData)=>{
        if(error){
            return console.log(chalk.red('Error!',error))
        }
        console.log(chalk.yellow.inverse(location))
        console.log(forecastData)
    })
})
}
