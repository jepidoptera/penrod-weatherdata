function selectCity(cityName) {
    // log
    console.log(cityName, 'selected. loading weather data');
    // slide in weather visualizer
    document.getElementById("weather_display").classList.add("visible");
    // load new page after animation finishes
    setTimeout(() => {
        window.location.href = `/weather/${cityName}`;
    }, 300);
}

function backToCitiesScreen() {
    // unselect city
    Object.keys(document.forms['city_select']).forEach(element => document.forms['city_select'][element].checked = false)
    // go back to city selection view
    document.getElementById("weather_display").classList.remove("visible");
}