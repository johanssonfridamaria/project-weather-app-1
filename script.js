const loc = document.querySelector('#location')

function getLocation(){
    if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(showPosition);
    }else{
        console.log('error');
    }
}

function showPosition(position){
loc.innerHTML = 'latitude:' + position.coords.latitude + 'longitude: ' + position.coords.longitude;
}


getLocation();



// fetch('api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}')