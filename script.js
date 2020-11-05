const today = document.querySelector('#currentCast');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');
const message = document.querySelector('#message');
const img = document.querySelector('#img');
const days = document.querySelector('#days');

function success(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const apiKey= 'b8b4c63b8481846f4a3bc15b450f2654';
    const openWeatherURI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,hourly&units=metric&appid=${apiKey}`;
    const locationURI = `https://us1.locationiq.com/v1/reverse.php?key=pk.1a3591f731d0ed06e852585f3a97b376&format=json&lat=${lat}&lon=${lng}`;

    fetch(openWeatherURI)
        .then(res => res.json())
        .then(weatherInfo => {

            fetch(locationURI)
                .then(res => res.json())
                .then(locationInfo => {
                    displayResult(weatherInfo, locationInfo);
                })
        })
}

function error() {
    console.log('fail')
}

function getLocation() {
    if (!navigator.geolocation) {
        console.log('error');
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

getLocation();


function displayResult(weatherInfo, locationInfo) {

    const forecast = weatherInfo;
    const currentWeather = forecast.current;
    const todaysWeather = currentWeather.weather[0].main;
    const todaysTemp = currentWeather.temp;
    const city = locationInfo.address.city;

    const sunriseTime = new Date(currentWeather.sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(currentWeather.sunset * 1000).toLocaleTimeString();

    let roundTime = (time, minutesToRound) => {

        let [hours, minutes] = time.split(':');
        hours = parseInt(hours);
        minutes = parseInt(minutes);

        time = (hours * 60) + minutes;

        let rounded = Math.round(time / minutesToRound) * minutesToRound;
        let rHr = '' + Math.floor(rounded / 60)
        let rMin = '' + rounded % 60

        return rHr.padStart(2, '0') + ':' + rMin.padStart(2, '0')
    }

    today.textContent = `${todaysWeather} | ${todaysTemp.toFixed(0)}°`
    sunrise.textContent = `Sunrise: ${roundTime(sunriseTime, 15)}`;
    sunset.textContent = `Sunset: ${roundTime(sunsetTime, 15)}`;

    function messageContent(todaysWeather) {

        if (todaysWeather === 'Clear') {
            img.innerHTML = `<img src="/Designs/Design-2/icons/noun_Sunglasses_2055147.svg" alt="Sunglasses" id="symbol">`;
            message.textContent = `Get your sunnies on. ${city} is looking rather great today.`;
        }
        else if (todaysWeather === 'Rain') {
            img.innerHTML = `<img src="/Designs/Design-2/icons/noun_Umbrella_2030530.svg" alt="Umbrella" id="symbol">`;
            message.textContent = `Don’t forget your umbrella. It’s wet in ${city} today.`;
        }
        else if (todaysWeather === 'Clouds') {
            img.innerHTML = `<img src="/Designs/Design-2/icons/noun_Cloud_1188486.svg" alt="Cloud" id="symbol">`;
            message.textContent = `Light a fire and get cosy. ${city} is looking grey today.`;
        }
        else if (todaysWeather === 'Snow') {
            img.innerHTML = `<i class="far fa-snowflake"></i>`;
            message.textContent = `Don't forget your hat and gloves today. ${city} is snowy today.`;
        }
    }

    messageContent(todaysWeather);

    let dailyWeather = [];
    dailyWeather = weatherInfo.daily;

    for (i = 1; i < dailyWeather.length; i++) {
        let date = dailyWeather[i].dt;
        date = new Date(date * 1000).toLocaleString("eng", { weekday: "long" });
        let minTemp = dailyWeather[i].temp.min;
        let maxTemp = dailyWeather[i].temp.max;
        let weather = dailyWeather[i].weather[0].main;
        let iconId = dailyWeather[i].weather[0].icon;

        let day = {
            date: date,
            minTemp: minTemp,
            maxTemp: maxTemp,
            weather: weather,
            iconId: iconId
        }

        const tr = document.createElement('tr')
        const weekday = document.createElement('td')
        const temp = document.createElement('td')
        const icon = document.createElement('td')

        weekday.innerText = `${day.date}`;
        temp.innerText = `${day.minTemp.toFixed(0)}°/${day.maxTemp.toFixed(0)}°C`;
        icon.innerHTML = `<img src=http://openweathermap.org/img/wn/${day.iconId}@2x.png alt="WeatherIcon" id="weatherImg">`;

        tr.appendChild(weekday);
        tr.appendChild(temp);
        tr.appendChild(icon);
        days.appendChild(tr);
    }
}
