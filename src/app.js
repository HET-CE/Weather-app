const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Het'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Het'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Het'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Must provide address'
        })
    }
    geocode(req.query.address,(error, data)=>{
        if(error){
            return res.send({ error })
        }
        forecast(data.latitude, data.longitude, (error, forecastdata)=>{
            if(error){
                return res.send({ error })
            }
            res.send({
                location: data.location,
                weather: forecastdata,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
})

app.get('/products',(req, res)=>{
    if(!req.query.search){
    return res.send({
        error: 'Provide search term'
    })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})
app.get('/help/*',(req, res)=>{
    res.render('404',{
        title: '404',
        name: 'Het',
        errorMessage: 'Help article not found'
    })
})
app.get('*',(req, res)=>{
    res.render('404',{
        title: '404',
        name: 'het',
        errorMessage: 'Page Not Found'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})