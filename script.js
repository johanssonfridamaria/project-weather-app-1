const today = document.querySelector('#currentCast');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');
const message = document.querySelector('#message');
const img = document.querySelector('#img');
const days = document.querySelector('#days');

let weatherData = [];

function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=metric&appid=b8b4c63b8481846f4a3bc15b450f2654`)
        .then(res => res.json())
        .then(data => {
            displayResult(data);
        })
    // const grouped = _.groupBy(list, car => list.dt);
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

function displayResult(data) {

    const forecast = data;
    const currentWeather = data.current;
    const todaysWeather = currentWeather.weather[0].main;
    const todaysTemp = currentWeather.temp;
    const city = 'Örebro'; // Hur få ut location?

    console.log(forecast);

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
            img.innerHTML = `<img src="/Designs/Design-2/icons/noun_Sunglasses_2055147.svg" alt="Sunglasses"</img>`;
            img.style.color='#F47775';
            message.textContent = `Get your sunnies on. ${city} is looking rather great today.`;
        }
        else if (todaysWeather === 'Rain') {
            img.innerHTML = `<img src="/Designs/Design-2/icons/noun_Umbrella_2030530.svg" alt="Umbrella"></img>`;
            img.style.color='#164A68';
            message.textContent = `Don’t forget your umbrella. It’s wet in ${city} today.`;
        }
        else if (todaysWeather === 'Clouds') {
            img.innerHTML = `<img src="/Designs/Design-2/icons/noun_Cloud_1188486.svg" alt="Cloud"</img>`;
            img.style.color='#F47775';
            message.textContent = `Light a fire and get cosy. ${city} is looking grey today.`;
        }
        else if (todaysWeather === 'Snow') {
            img.innerHTML = `<i class="far fa-snowflake"></i>`;
            img.style.fontSize='4rem';
            img.style.color='#164A68';
            message.textContent = `Don't forget your hat and gloves today. ${city} is snowy today.`;
        }
    }

    messageContent(todaysWeather);

    let dailyWeather = [];
    dailyWeather = data.daily;
    console.log(dailyWeather)

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
    
            weekday.innerText=`${day.date}`;
            temp.innerText=`${day.minTemp}°/${day.maxTemp}°C`;
            icon.innerHTML=`<img src=http://openweathermap.org/img/wn/${day.iconId}@2x.png alt="WeatherIcon"</img>`;
    
            tr.appendChild(weekday);
            tr.appendChild(temp);
            tr.appendChild(icon);
            days.appendChild(tr);

    }
}
