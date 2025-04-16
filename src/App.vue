<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import SearchBar from './components/SearchBar.vue'
import WeatherCard from './components/WeatherCard.vue'
import WeatherDetails from './components/WeatherDetails.vue'
import type WeatherData from './contants'

const weatherData = ref<WeatherData>()
const weatherData2 = ref<WeatherData>()
const todayForecast = ref<Object>({})
const error = ref<Object>({})
const apiKey = '0a14ab70b31163ef7fada47912ba49ab'
const typeWeather = ref<'metric' | 'imperial'>('metric')

const fetchWeather = async (city: string) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${typeWeather.value}`,
    )
    const { lat, lon } = response.data.coord
    const response2 = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${typeWeather.value}`,
    )
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${typeWeather.value}`,
    )
    weatherData2.value = response2.data
    weatherData.value = response.data
    todayForecast.value = res.data
    error.value = {}
  } catch (error) {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=italia&appid=${apiKey}&units=${typeWeather.value}`,
    )
    const { lat, lon } = response.data.coord
    const response2 = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${typeWeather.value}`,
    )
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=italia&appid=${apiKey}&units=${typeWeather.value}`,
    )
    weatherData2.value = response2.data
    weatherData.value = response.data
    todayForecast.value = res.data
    alert('City Wrong')
    if (error instanceof Error) console.log(error.message)
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
});

function handleWeatherType(type: 'metric' | 'imperial') {
  typeWeather.value = type
  if (weatherData.value) {
    fetchWeather(weatherData.value.name)
  }
}



</script>

<template>
  <div class="min-h-screen bg-gray-800 m-0 p-4 h-full">
    <SearchBar @search="searchWeather" />
    <div class="w-full flex flex-row flex-wrap h-full" v-if="weatherData?.name">
      <div class="md:w-2/3 w-full h-full flex flex-col">
        <WeatherCard :weatherData="weatherData ?? []" :todayForecast="todayForecast ?? []" :typeWeather="typeWeather" @typeWeather="handleWeatherType" />
      </div>
      <div class="md:w-1/3 w-full flex flex-col h-full md:pr-3.5 px-4">
        <WeatherDetails :weatherData2="weatherData2 ?? []" :typeWeather="typeWeather" />
      </div>
    </div>
  </div>
</template>
