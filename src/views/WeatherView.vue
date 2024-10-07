<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
      <div class="search-bar">
        <input type="text" v-model="city" placeholder="Enter city name" class="search-input" />
        <button @click="searchByCity" class="search-button">Search</button>
      </div>
    </div>
  </div>
  <!--The <main> tag in HTML is used to specify the main content of a document 
      More info about main, check https://www.w3schools.com/tags/tag_main.asp-->
  <main>
    <!--If there are no data returned, then skip rendering the information-->
    <div v-if="weatherData">
      <!--Display the weather data attribute returned from API
          Example of API data: https://openweathermap.org/current-->
      <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
      <div>
        <!--The image source of of the weather icon will be coming from a function called iconUrl
                which will be shared in script later-->
        <img :src="iconUrl" alt="Weather Icon" />
        <p>{{ temperature }} °C</p>
      </div>
      <!-- weather[0] means the current weather, the way we need to obtain data depends on how
          the API JSON data looks-->
      <span>{{ weatherData.weather[0].description }}</span>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const apikey = "9db738a429e8d4949f2099236f71fb4a";

// Reactive variables to store city, weather data, hourly and daily forecasts
const city = ref("");
const weatherData = ref(null);
// const hourlyForecast = ref([]);
// const dailyForecast = ref([]);

const searchByCity = async () => {
  try {
    const responseLocation = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city.value}&appid=${apikey}`);
    // weatherData.value = responseLocation.data;
    console.log(responseLocation.data[0])
    const lat = responseLocation.data[0].lat
    const lon = responseLocation.data[0].lon
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;
    await fetchWeatherData(url)
    console.log(lat,lon)
  } catch (error) {
    console.error("Error fetching Location data:", error);
  }
}

// Computed property to calculate temperature in Celsius
const temperature = computed(() => {
  return weatherData.value
    ? Math.floor(weatherData.value.main.temp - 273)
    : null;
});

// Computed property to get the weather icon URL
const iconUrl = computed(() => {
  return weatherData.value
    ? `http://api.openweathermap.org/img/w/${weatherData.value.weather[0].icon}.png`
    : null;
});

// Function to fetch current location's weather
const fetchCurrentLocationWeather = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
      await fetchWeatherData(url);
    });
  }
};

// Function to fetch weather data using axios
const fetchWeatherData = async (url) => {
  try {
    const response = await axios.get(url);
    weatherData.value = response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

// Automatically fetch current location's weather on component mount
onMounted(() => {
  fetchCurrentLocationWeather();
});
</script>

<style scoped></style>
