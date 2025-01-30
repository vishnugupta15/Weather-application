const apiKey = "63512d2a7ab5d147c58d14357186c7c0";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiUrl1 = "https://api.openweathermap.org/data/2.5/forecast?q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const forecast_response = await fetch(apiUrl1 + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    }

    else if (forecast_response.status == 404) {
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    }


    else {
        var data = await response.json();
        var forcast = await forecast_response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "/Weather App/images/clouds.png"
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "/Weather App/images/clear.png"
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "/Weather App/images/rain.png"
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "/Weather App/images/drizzle.png"
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "/Weather App/images/mist.png"
        }

        document.querySelector('.templist').innerHTML = '';
        for (let i = 0; i < 5; i++) {
            var date = new Date(forcast.list[i].dt * 1000);
            let hour = document.createElement('div');
            hour.setAttribute('class', 'next');

            let div = document.createElement('div');
            let time = document.createElement('p');
            time.setAttribute('class', 'time');
            time.innerText = (date.toLocaleTimeString(undefined, 'Asia/Kolkata')).replace('.00', '');
            let temp = document.createElement('p');
            temp.innerText = Math.floor(forcast.list[i].main.temp_max - 273) + '°C' + ' / ' + Math.floor(forcast.list[i].main.temp_min - 273) + '°C';
            div.appendChild(time);
            div.appendChild(temp);

            let description = document.createElement('p');
            description.setAttribute('class', 'description');
            description.innerText = forcast.list[i].weather[0].description;
            hour.appendChild(div);
            hour.appendChild(description);

            document.querySelector('.templist').appendChild(hour);
        }
        

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }


}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})
checkWeather();