
var temp = function(data){
    return data-Math.floor(data-273.15)>0.5?Math.ceil(data-273.15):Math.floor(data-273.15);
}
navigator.geolocation.getCurrentPosition(showPosition);
function showPosition(position) {
    $.get("http://api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude,function(data){
        $("#weather").append("<p class='weather'>Temperature: "+temp(data.main.temp)+"°C</p>")
            .append("<p class='weather'>Humidity: "+data.main.humidity+"%</p>")
            .append("<p class='weather'>Lowest Temperature: "+temp(data.main.temp_min)+"°C</p>")
            .append("<p class='weather'>Highest Temperature: "+temp(data.main.temp_max)+"°C</p>");
    });
}
