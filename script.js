var apiKey = 'd4b59074949853bee923d87768fbc068';

// Function to load search history from local storage
function loadSearchHistory() {
    // Get the search history from local storage
    var searchHistory = localStorage.getItem('searchHistory');

    // If there is search history, display it on the page
    if (searchHistory) {
        // Parse the search history from JSON to array
        searchHistory = JSON.parse(searchHistory);

        // Get the search history list element
        var searchHistoryList = document.getElementById('searchHistoryList');

        // Clear any existing search history
        searchHistoryList.innerHTML = '';

        // Loop through the search history and display each city
        for (var i = 0; i < searchHistory.length; i++) {
            var city = searchHistory[i];

            // Create a new list item element
            var listItem = document.createElement('li');
            listItem.textContent = city;

            // Append the list item to the search history list
            searchHistoryList.appendChild(listItem);
        }
    }
}

// Call the loadSearchHistory function when the page loads
loadSearchHistory();

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

                // Get the forecast date from Dayjs
                var forecastDate = data.list[i * 8].dt_txt;
                var dayOfWeekIndex = dayjs(forecastDate).day();
                var dayOfWeek = daysOfWeek[dayOfWeekIndex];
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

