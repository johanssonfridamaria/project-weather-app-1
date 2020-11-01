const today = document.querySelector('#currentCast');
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');
const message = document.querySelector('#message');

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
    console.log(currentWeather);
    console.log(todaysWeather);

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
            message.textContent = `Get your sunnies on. ${city} is looking rather great today.`
        }
        else if (todaysWeather === 'Rain') {
            message.textContent = `Don’t forget your umbrella. It’s wet in ${city} today.`
        }
        else if (todaysWeather === 'Clouds') {
            message.textContent = `Light a fire and get cosy. ${city} is looking grey today.`
        }
        else if (todaysWeather === 'Snow') {
            message.textContent = `Don't forget your hat and gloves today. ${city} is snowy today.`
        }
    }
    messageContent(todaysWeather);
}
