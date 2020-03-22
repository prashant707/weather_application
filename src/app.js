const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode-file')
const forecast=require('./utils/forecast')
const app=express()
// Define paths for Express Config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')
const port=process.env.PORT || 3000;

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)


app.get('',(req,res)=>{
    res.render('index',{title:'Weather App',name:"Prashant"})
})

app.get('/about',(req,res)=>{
    res.render('about',{title:'About Me',name:"Prashant"})
})

app.get('/help',(req,res)=>{
    res.render('help',{title:'Help Page',name:'Prashant'})
})

app.get('/products',(req,res)=>{
    if(!req.query.search){

    return res.send({
    error:'you must provide a search term'
})
    }
    
    console.log(req.query.search)
    res.send({
     products:[]
 })   
})

app.get('/weather',(req,res)=>{
   if(!req.query.address){
       return res.send({
           error:"please provide address"
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
           res.send({
               forecastData,
               location,
               address:req.query.address })
       })

   })
//    console.log(req.query.address)
//     res.send({location:'philadalpia',forecast:'rain',address:req.query.address})
})



app.get('/help/*',(req,res)=>{
    res.render('404',{errorPage:'help text article not found',title:'Weather App',name:"Prashant"})
})
app.get('*',(req,res)=>{
    res.render('404',{errorPage:'Error 400',title:'Weather App',name:"Prashant"})
})

app.listen(port,()=>{
    console.log('server stared at port '+port)
})