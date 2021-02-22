const path = require('path')
const express  = require('express')
const chalk = require('chalk')
const hbs = require('hbs')

const geocode = require('../utils/geocode')
const forecast = require('../utils/weather')

const app = express()

//define path for express configuration
const publicDirectorypath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath =path.join(__dirname, '../templates/partials')

//seup handlebar engine
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//route to serve a directory using express
app.use(express.static(publicDirectorypath))

app.get('', (req,res) =>{
	res.render('index', {
		title: 'Weather',
		name: 'Palash'
	})
})

app.get('/about', (req,res) =>{
	res.render('about', {
		title: 'About me',
		name: 'Palash Pareek'
	})
})

app.get('/help', (req,res) =>{
	res.render('help', {
		message: 'For any help please contact on No: 9571165813',
		title: 'Help',
		name: 'Palash'
	})
})

//route for weather page
app.get('/weather', (req,res)=>{
	if(!req.query.address){
		return res.send({
			error: 'Please provide an address!'
		})
	}

    //const location = req.query.address
	//****************************************************************
	geocode(req.query.address, (error, {longitude, latitude, location}={}) => {

        if(error){
         return res.send({error})
        }

          forecast(longitude, latitude, (error, locationData) => {
             	if(error)
             	{
             		 return res.send({error})
             	}
             	
             		res.send({
             			address: req.query.address,
             			location,
             			Weather_Report: locationData
             		})
                  
               }) 
        
     
     
})
	//****************************************************************

})

app.get('/products', (req,res)=>{

	if(!req.query.search){
		return res.send({
			error: 'You must provide a search term'
		})
	}

	
	res.send({
		products: []
	})
})

//route for error page after help
app.get('/help/*', (req,res)=>{
	res.render('error_404', {
		title: '404',
		name: 'Palash',
		errorMessage:'Help article not found'
	})
})


//route for error page
app.get('*', (req,res) => {
	res.render('error_404', {
	  title: '404',
      name: 'Palash',
      errorMessage: '404 Page not found'
      })
})

// //route for home page
// app.get('', (req, res) => {
// 	res.send('<h1>Hello Express!</h1')
// })

// //route for help page
// app.get('/help', (req,res)=>{
// 	res.send({
// 		name: 'Palash',
// 		age: 22
// 	})
// })

// //route for about page
// app.get('/about', (req,res)=>{
// 	res.send('<h1>About Page</h1')
// })



app.listen(3000, () =>{
	console.log(chalk.green.inverse('Server listening on port 3000'))
})