const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')
const path=require('path')
const express= require('express')
const hbs=require('hbs')

const app=express()
//Define paths for express config
const publicDirectory=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'./templates/views')
const partialsPath=path.join(__dirname,'./templates/partials')

//setup handlebars and views location
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render('index',{title:'Weather',name:'Ritika'})
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Page',name:'Ritika'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404page',{ title:'404 help',name:'Ritika',message:'Help Article Not Found'})
//   res. send('Help Article Not Found')
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Provide some address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
           return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({forecast: forecastData, location,address:req.query.address})
        })
    })
    // res.send({
    //     address: req.query.address
    // })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide some search term'
        })
    }
    res.send({
        location:'Udaipur'
    })
})
app.get('*',(req,res)=>{
    res.render('404page',{  
        title:'404', name:'Ritika',
        message:'404: Page Not Found'
    })
    // res.send('404:Page Not Found')
})

// app.get('/weather',(req,res)=>{
//     res.send({
//         lon:-82.92,
//         lan:23.44
//     })
// })

//app.com
//app.com/help
//app.com/about

app.listen(3000, ()=>{
    console.log('Server is up on 3000')
})