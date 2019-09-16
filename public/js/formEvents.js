function selectCity(cityName, id) {
    // log
    console.log(cityName, 'selected. loading weather data');
    // slide in weather visualizer
    document.getElementById("loading_overlay").classList.add("visible");
    // load new page after animation finishes
    setTimeout(() => {
        window.location.href = `/weather/${id}`;
    }, 300);
}

window.addEventListener('load', () => {
    // unselect city
    Object.keys(document.forms['city_select']).forEach(element => document.forms['city_select'][element].checked = false)
    // go back to city selection view
    document.getElementById("loading_overlay").classList.remove("visible");
})