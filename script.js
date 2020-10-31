let weather =[
    {

    }
]

function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b8b4c63b8481846f4a3bc15b450f2654`)
    .then(res => res.json())
    .then(data => {
weather = data;
console.log(weather)
console.log(weather.main.temp)

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

