var apiKey = 'd4b59074949853bee923d87768fbc068'

var currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=Oakland&appid=${apiKey}&units=imperial`
fetch(currentWeatherURL)
.then(res=>res.json())
.then(data=>{
    console.log(data)
    document.querySelector('#temp').textContent=data.main.temp + " ºF"
    document.querySelector('#wind').textContent=data.wind.speed + " mph"
    document.querySelector('#hum').textContent=data.main.humidity + "%"
})

var forecast = `https://api.openweathermap.org/data/2.5/forecast?q=Oakland&appid=${apiKey}&units=imperial`
fetch(forecast)
.then(res=>res.json())
.then(data=>{
    console.log(data)
    document.querySelector('#temp1').textContent=data.list[4].main.temp + "ºF"
    document.querySelector('#wind1').textContent=data.list[4].wind.speed + " mph"
    document.querySelector('#hum1').textContent=data.list[4].main.humidity + "%"

    document.querySelector('#temp2').textContent=data.list[12].main.temp + "ºF"
    document.querySelector('#wind2').textContent=data.list[12].wind.speed + " mph"
    document.querySelector('#hum2').textContent=data.list[12].main.humidity + "%"

    document.querySelector('#temp3').textContent=data.list[20].main.temp + "ºF"
    document.querySelector('#wind3').textContent=data.list[20].wind.speed + " mph"
    document.querySelector('#hum3').textContent=data.list[20].main.humidity + "%"

    document.querySelector('#temp4').textContent=data.list[28].main.temp + "ºF"
    document.querySelector('#wind4').textContent=data.list[28].wind.speed + " mph"
    document.querySelector('#hum4').textContent=data.list[28].main.humidity + "%"

    document.querySelector('#temp5').textContent=data.list[36].main.temp + "ºF"
    document.querySelector('#wind5').textContent=data.list[36].wind.speed + " mph"
    document.querySelector('#hum5').textContent=data.list[36].main.humidity + "%"
})

