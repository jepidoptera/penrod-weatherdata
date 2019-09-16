const axios = require('axios');
const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 8080;
// load API key from .env file
const apiKey = process.env.APIKEY || "no_api_key";


const cities = [
    {name: "Chicago", id: 4887398, next: 5037649}, 
    {name: "Minneapolis", id: 5037649, next: 5263045}, 
    {name: "Milwaukee", id: 5263045, next: 4684888}, 
    {name: "Dallas", id: 4684888, next: 4887398}
]

// Serve static files
app.use(express.static(__dirname + '/public'));

// use handlebars
var exphbs = require("express-handlebars");

// capitalize words on demand
app.engine(".hbs", exphbs({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: {
        'Capitalize': function(string)
        {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    }
}));

app.set("view engine", ".hbs");

// Serve app
console.log('Listening on: http://localhost:' + port);

app.get('/', (req, res) => {
    // home page
    console.log('rendering city select page...');
    res.render("index", {cities: cities});
})

app.get('/weather/:cityId', (req, res) => {
    // load data for selected city
    let urlString = !isNaN(req.params.cityId)
        ? `http://api.openweathermap.org/data/2.5/weather?id=${req.params.cityId}&appid=${apiKey}`
        // or, in case you manually enter a city name into the url...
        : `http://api.openweathermap.org/data/2.5/weather?q=${req.params.cityId}&appid=${apiKey}`
    
    axios.get(urlString)
    .then(function (response) {
        // success
        // parsing out data for the template
        let weatherData = {
            city: response.data.name,
            country: response.data.sys.country,
            description: response.data.weather[0].description,
            // this is in degrees Kelvin, btw. page will want to convert
            temperature: response.data.main.temp,
            pressure: response.data.main.pressure,
            humidity: response.data.main.humidity,
            sunrise: response.data.sys.sunrise,
            sunset: response.data.sys.sunset,
            timezone: response.data.timezone,
        }
        
        // see what we've got...
        console.log(weatherData);
        // render weather page
        // but wait a sec so we can look at the loading icon
        // setTimeout(() => {
            res.render("weather", weatherData);      
        // }, 1000);
        // res.send(response.data)
    })
    .catch(function (error) {
        // handle error
        console.log(error);
        // TODO: error page?
    })
})

app.listen(port);
