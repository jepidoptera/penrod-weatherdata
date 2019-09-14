var Ajax = require('simple-ajax')
var express = require('express');
var app = express();
var envy = require('envy');
var port = process.env.PORT || 8080;
// load API key from .env file
const { apiKey } = envy();

console.log(apiKey);

// Serve static files
app.use(express.static(__dirname + '/public'));

// Serve app
console.log('Listening on: http://localhost:' + port);

app.get('/weather/:city', (req, res) => {
    // load data for selected city
    let urlString = `api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=${apiKey}`;
    let ajax = new Ajax({
        url: urlString,
        method: "GET"
    });

    ajax.on('success', function (event) {
        // what did we get back?
        console.log('success', event);
        // TODO: load new page
        res.end();
    });

    // send request
    ajax.send();

    // render loading page
    res.render("weather.html");
})

app.listen(port);
