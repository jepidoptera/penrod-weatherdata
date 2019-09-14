// get api.openweathermap.org/data/2.5/weather?q=minneapolis&appid=7cb4f2b23073cfc6bada705141c9c3e6
function selectCity(cityName) {
    // log
    console.log(cityName, 'selected. loading weather data');
    document.getElementById("weather_display").classList.add("visible");
}

function backToCitiesScreen() {
    // unselect current city
    Object.keys(document.forms['city_select']).forEach(element => document.forms['city_select'][element].checked = false)
    // go back to city selection view
    document.getElementById("weather_display").classList.remove("visible");
}