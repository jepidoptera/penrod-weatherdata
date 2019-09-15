const axios = require('axios');
const express = require('express');
const app = express();

var port = process.env.PORT || 8080;
// load API key from .env file
const apiKey = process.env.apiKey || "no_api_key";

console.log(apiKey);

// Serve static files
app.use(express.static(__dirname + '/public'));

// Serve app
console.log('Listening on: http://localhost:' + port);

app.get('/weather/:city', (req, res) => {
    // load data for selected city
    axios.get("api.openweathermap.org/data/2.5/weather", {
        params: {
          q: req.params.city,
          appid: apiKey
        }
      })
    .then(function (response) {
        // handle success
        console.log(response);
        // render loading page
        res.render("weather.html");      
    })
    .catch(function (error) {
        // handle error
        console.log(error);
        // TODO: error page?
    })
  
    // ajax.on('success', function (event) {
    //     // what did we get back?
    //     console.log('success', event);
    //     // TODO: load new page
    //     res.end();
    // });

    // // send request
    // ajax.send();

})

app.listen(port);
