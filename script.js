const apiKey = "ee0dd202c7f183469762a7a464cd353d"; 
let searchBox, searchBtn, weatherIcon; // Define weatherIcon in the outer scope

document.addEventListener("DOMContentLoaded", () => {
    searchBox = document.querySelector(".search input");
    searchBtn = document.querySelector(".search button");
    weatherIcon = document.querySelector(".weather-icon"); // Assign weatherIcon here

    searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value);  
    });

});

async function checkWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`);
    if(response.status==404){
        document.querySelector(".error").style.display ="block";
        document.querySelector(".weather").style.display ="none";
    }else{
         
    const data = await response.json();
   
    
    // Assuming you want to display the city name in an HTML element with class "city"
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".country").innerHTML = data.sys.country;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"; // Corrected this line
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h"; // Corrected this line
    document.querySelector('.weather').style.display = "block"
    document.querySelector('.error').style.display = "none"

    // Set weather icon based on weather condition
    const weatherMain = data.weather[0].main.toLowerCase(); // Convert to lowercase for case-insensitive comparison
    switch (weatherMain) {
        case "clouds":
            weatherIcon.src = "images/clouds.png";
            break;
        case "clear":
            weatherIcon.src = "images/clear.png";
            break;
        case "rain":
            weatherIcon.src = "images/rain.png";
            break;
        case "drizzle":
            weatherIcon.src = "images/drizzle.png";
            break;
        case "mist":
            weatherIcon.src = "images/mist.png";
            break;
        default:
            // Set a default image for other weather conditions
            weatherIcon.src = "images/snow.png";
            break;
    }
        
    }
   
}



