const axios = require('axios');
const express = require('express');
const app = express();
const allCities = require('./city.list')
require('dotenv').config();

const port = process.env.PORT || 8080;
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
app.engine(".hbs", exphbs({
    defaultLayout: "main",
    extname: ".hbs",
    helpers: {
    // capitalize words on request
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
        // which city should come next?
        cities.forEach(city => {
            if (city.name === response.data.name) {
                weatherData.nextCity = city.next;
            }
        })
        // if we are not observing one of the four from the menu, choose one at random from around the world
        if (!weatherData.nextCity) {
            weatherData.nextCity = allCities[Math.floor(Math.random() * allCities.length)].id;
        }
        // see what we've got...
        console.log(weatherData);
        // render weather page
        res.render("weather", weatherData);      
    })
    .catch(function (error) {
        console.log(error);
    })
})

app.listen(port);
