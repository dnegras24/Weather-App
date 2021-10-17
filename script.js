const apiKey = "74ec27191e9053087fbf8426f8df4984";

function fetchActualWeather(lat, lon){
    fetch("https://api.openweathermap.org/data/2.5/weather?lat="+ lat +"&lon="+ lon+ "&units=metric&appid="+ apiKey).then((response) => response.json())
        .then((data) => displayActualWeather(data))
}

function displayActualWeather(data){
    const { name } = data;
    const { temp , humidity, pressure } = data.main;
    const { icon } = data.weather[0];
    const { speed } = data.wind;
    const visibility = data.visibility;
    
    document.querySelector('.city').innerText = name;
    document.querySelector('.temperature').innerText = temp + "°";
    document.querySelector('.wind-vel').innerText = speed + " mph";
    document.querySelector('.humi-por').innerText = humidity + "%";
    document.querySelector('.progress-bar').style.width = humidity + "%";
    document.querySelector('.visibility').innerText = visibility + " miles";
    document.querySelector('.pressure').innerText = pressure + " mb";
    document.querySelector('.actual-img').src='/img/'+icon+'.png';
}

function fetchForcastWeather (lat,lon){
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" +lon+ "&units=metric&lang=es&appid="+apiKey).then((response) => response.json())
    .then((data) => displayForcastWeather(data));
}

function displayForcastWeather(data){
    var forcast_array = [3,11,19,27,35]

    for( var i = 0; i<forcast_array.length; i++){
        const {temp_min,temp_max} = data.list[forcast_array[i]].main;
        const {dt_txt} = data.list[forcast_array[i]];
        const {icon}=data.list[forcast_array[i]].weather[0];
        var ite_min= '.min-' + i.toString();
        var ite_max= '.max-' + i.toString();
        var ite_day= '.next-' + i.toString();
        var ite_img= '.img-next-' + i.toString();
        var date_pre = dt_txt.split(' ')[0];
        document.querySelector(ite_min).innerText = 'Min: ' + temp_min+'°';
        document.querySelector(ite_max).innerText = 'Max: ' + temp_max+'°';
        document.querySelector(ite_day).innerText = date_pre;
        document.querySelector(ite_img).src='/img/'+ icon +'.png';
    }
}

function searchCity(){
    var city = document.querySelector('.search-input').value;
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey).then((response) => response.json())
    .then((data) => sendCoords(data));
}

function sendCoords(data){
    const {lat,lon}=data.coord;
    fetchActualWeather(lat,lon);
    fetchForcastWeather(lat,lon);
}

navigator.geolocation.getCurrentPosition(function(position){
    fetchActualWeather(position.coords.latitude, position.coords.longitude);
    fetchForcastWeather(position.coords.latitude, position.coords.longitude);
});
