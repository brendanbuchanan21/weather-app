
const accessKey = 'bbbde8c433beaedea9667472327e65e2';
const baseUrl = 'http://api.weatherstack.com/current';



//begin search function for the api retrieving 

document.getElementById('search-button').addEventListener('click', () => {
    const city = document.querySelector('input').value;
    const url = `${baseUrl}?access_key=${accessKey}&query=${city}`;
    
    fetch(url).then(response => response.json()).then(data => {

        const temperatureCelsius = data.current.temperature;
        const temperatureFahrenheit = (temperatureCelsius * (9 / 5)) + 32;
        const weatherConditions = data.current.weather_descriptions[0];
        const humidity = data.current.humidity;
        const windSpeed = data.current.wind_speed;



        //updating the displays in UI 
        const temperatureElement = document.querySelector('#fahrenheit-container .temperature');
        temperatureElement.innerText = `Temperature: ${temperatureFahrenheit.toFixed(1)}°F, ${temperatureCelsius}°C`;
        document.querySelector('#fahrenheit-container .city-name').innerText = data.location.name;
        document.querySelector('#fahrenheit-container .weather-conditions').innerText = `Conditions: ${weatherConditions}`;
        document.querySelector('#fahrenheit-container .humidity').innerText = `Humidity: ${humidity}`;
        document.querySelector('#fahrenheit-container .wind-speed').innerText = `Wind Speed: ${windSpeed} mph`;

        changeBackground(weatherConditions);
    });
});


// function for corresponding background for given weather conditions

/* if  cloudy in conditions then cloudy background 
if sunny then sunny background
if raining then rainy background 
if snow then snowing background 
if partly cloudy then partly cloudy background 
if thunderstorm then lightning background */


// Function for changing the background based on weather conditions
const changeBackground = (conditions) => {
    const container = document.getElementById('fahrenheit-container');

    // Check the lowercase conditions for background matching
    if (conditions.includes('cloudy') || conditions.includes('Overcast')) {
        container.style.backgroundImage = "url('images/partly cloudy background img.jpg')"; // Path to partly cloudy image
    } else if (conditions.includes('sunny') || conditions.includes('clear')) {
        container.style.backgroundImage = "url('images/blue-sky-picture.jpeg')"; // Update with the correct sunny image path
    } else if (conditions.includes('rain')) {
        container.style.backgroundImage = "url('images/rain background img.jpg')"; // Update with the correct rain image path
    } else if (conditions.includes('snow')) {
        container.style.backgroundImage = "url('images/snow-background.jpg')"; // Update with the correct snow image path
    } else if (conditions.includes('thunderstorm') || conditions.includes('lightning')) {
        container.style.backgroundImage = "url('images/thunderstorm background img.jpg')"; // Path to thunderstorm image
    } else if (conditions.includes('partly cloudy')) {
        container.style.backgroundImage = "url('images/partly cloudy background img.jpg')"; // Path to partly cloudy image
    } else {
        container.style.backgroundImage = "none";
    }

    // Apply additional styles to make sure the background fits well
    container.style.backgroundSize = "cover";
    container.style.backgroundPosition = "center";
}


const bouncingIcon = document.getElementById("bouncing-icon");
const mainContainer = document.getElementById("main-container");

let iconPosX = Math.random() * (mainContainer.clientWidth - 50); // Random initial X position
let iconPosY = Math.random() * (mainContainer.clientHeight - 50); // Random initial Y position
let iconSpeedX = 2; // Speed of movement on the X-axis
let iconSpeedY = 2; // Speed of movement on the Y-axis

function bounceIcon() {
    // Update the position
    iconPosX += iconSpeedX;
    iconPosY += iconSpeedY;

    // Check for collision with the walls of the main container
    if (iconPosX + bouncingIcon.clientWidth >= mainContainer.clientWidth || iconPosX < 0) {
        iconSpeedX = -iconSpeedX; // Reverse direction on X-axis
    }
    if (iconPosY + bouncingIcon.clientHeight >= mainContainer.clientHeight || iconPosY < 0) {
        iconSpeedY = -iconSpeedY; // Reverse direction on Y-axis
    }

    // Set the new position of the icon
    bouncingIcon.style.left = iconPosX + "px";
    bouncingIcon.style.top = iconPosY + "px";

    requestAnimationFrame(bounceIcon); // Call bounceIcon again for the next frame
}

// Start bouncing
bounceIcon();
