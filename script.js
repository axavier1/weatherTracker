var apiKey = 'd4b59074949853bee923d87768fbc068';

//Weather
function currentWeather() {
    var enteredCity = document.querySelector("#searchCity").value;
    var currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${enteredCity}&appid=${apiKey}&units=imperial`;
    fetch(currentWeatherURL)
    .then(res => res.json())
    .then(data => {

        if (Array.isArray(data.weather) && data.weather.length > 0) {
            var iconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
            document.getElementById('icon').src = iconUrl;
        }
        document.querySelector('#temp').textContent = data.main.temp + " ºF";
        document.querySelector('#wind').textContent = data.wind.speed + " mph";
        document.querySelector('#hum').textContent = data.main.humidity + "%";
    })
    .catch(error => {
        console.error("Error:", error);
    });
}

//5 Day Forecast
function futureWeather() {
    var enteredCity = document.querySelector("#searchCity").value;
    var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${enteredCity}&appid=${apiKey}&units=imperial`;
    fetch(forecastURL)
    .then(res => res.json())
    .then(data => {
        var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        for (var i = 0; i < 5; i++) {
            if (Array.isArray(data.list) && data.list.length > i * 8 && Array.isArray(data.list[i * 8].weather) && data.list[i * 8].weather.length > 0) {
                var iconCode = data.list[i * 8].weather[0].icon;
                var iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
                document.querySelector(`#icon${i + 1}`).src = iconUrl;
                document.querySelector(`#temp${i + 1}`).textContent = data.list[i * 8].main.temp + " ºF";
                document.querySelector(`#wind${i + 1}`).textContent = data.list[i * 8].wind.speed + " mph";
                document.querySelector(`#hum${i + 1}`).textContent = data.list[i * 8].main.humidity + "%";

                // Get the forecast date
                var forecastDate = data.list[i * 8].dt_txt;

                    // Use Day.js to parse the date and get the day of the week index
                var dayOfWeekIndex = dayjs(forecastDate).day();

                    // Get the corresponding day of the week from the daysOfWeek array
                var dayOfWeek = daysOfWeek[dayOfWeekIndex];

                    // Append the day of the week to the corresponding h3 element
                var h3 = document.querySelector(`#day${i + 1}`);
                h3.textContent = dayOfWeek;
            }
        }
    })
    .catch(error => {
        console.error(error);
    });
}

//Event Listener
document.getElementById('button').addEventListener('click', function () {
    currentWeather();
    futureWeather();
});

