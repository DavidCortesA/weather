<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import SearchBar from './components/SearchBar.vue'
import WeatherCard from './components/WeatherCard.vue'
import WeatherDetails from './components/WeatherDetails.vue'

const weatherData = ref<string | null>(null)
const weatherData2 = ref<string | null>(null)
const todayForecast = ref<string | null>(null)
const error = ref<string | null>(null)
const apiKey = '0a14ab70b31163ef7fada47912ba49ab'

const fetchWeather = async (city: string) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
    )
    const { lat, lon } = response.data.coord
    const response2 = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
    )
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`,
    )
    weatherData2.value = response2.data
    weatherData.value = response.data
    todayForecast.value = res.data
    error.value = null
  } catch (error) {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=italia&appid=${apiKey}&units=metric`,
    )
    const { lat, lon } = response.data.coord
    const response2 = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
    )
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=italia&appid=${apiKey}&units=metric`,
    )
    weatherData2.value = response2.data
    weatherData.value = response.data
    todayForecast.value = res.data
    alert('City Wrong')
    error.value = error.message
  }
}

const searchWeather = async (city: string) => {
  if (city) {
    await fetchWeather(city)
  } else {
    alert('City Wrong')
    error.value = 'Please enter a city'
    await fetchWeather('Italia')
  }
}

onMounted(async () => {
  // Cargar el clima de Italia por defecto al montar el componente
  await fetchWeather('Italia')
})
</script>

<template>
  <div class="min-h-screen bg-gray-800 m-0 p-4 h-vh">
    <SearchBar @search="searchWeather" />
    <div class="w-full flex flex-row">
      <div class="w-2/3 flex flex-col">
        <WeatherCard :weatherData="weatherData" :todayForecast="todayForecast" />
      </div>
      <div class="w-1/3 flex flex-col h-full pr-3.5">
        <WeatherDetails :weatherData2="weatherData2" />
      </div>
    </div>
  </div>
</template>
