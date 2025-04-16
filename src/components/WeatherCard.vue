<script setup lang="ts">
import { computed } from 'vue'
import AirConditions from './AirConditions.vue'
import CurrentForecast from './CurrentForecast.vue'

const props = defineProps({
  weatherData: Object,
  todayForecast: Object,
  typeWeather: String,
})

defineEmits(['typeWeather'])

const name = computed(() => props.weatherData?.name)
const tempCurrent = computed(() => props.weatherData?.main.temp)
const icon = computed(() => props.weatherData?.weather[0]?.icon)
const description = computed(() => props.weatherData?.weather[0]?.description)

const getWeatherIcon = () => {
  return `https://openweathermap.org/img/wn/${icon.value}@2x.png`
}
</script>

<template>
  <div class="w-full flex flex-col p-4 rounded">
    <div class="flex flex-row w-full h-65 p-5 justify-between items-center mb-4">
      <div class="flex flex-col items-start justify-between h-full w-full">
        <div class="flex flex-col items-start">
          <h1 class="text-white text-5xl font-bold">{{ name }}</h1>
          <p class="capitalize">{{ description }}</p>
        </div>
        <h2 class="text-white text-8xl font-bold">{{ tempCurrent.toFixed(1) }}°{{ typeWeather === 'metric' ? 'C' : 'F' }}</h2>
      </div>
      <div>
        <div>
          <button type="button" @click="$emit('typeWeather', 'metric')" :class="{'py-2 px-4 rounded-lg font-bold border-none cursor-pointer': true, 'bg-white text-black hover:bg-gray-200': typeWeather === 'metric', 'bg-gray-500 text-white hover:bg-gray-400': typeWeather !== 'metric'}">C</button>
          <button type="button" @click="$emit('typeWeather', 'imperial')" :class="{'py-2 px-4 rounded-lg font-bold border-none cursor-pointer': true, 'bg-white text-black hover:bg-gray-200': typeWeather === 'imperial', 'bg-gray-500 text-white hover:bg-gray-400': typeWeather !== 'imperial'}">F</button>
        </div>
        <img :src="getWeatherIcon()" alt="Weather Icon" />
      </div>
    </div>
    <AirConditions :weatherData="weatherData" />
    <CurrentForecast :todayForecast="todayForecast" :typeWeather="props.typeWeather" />
  </div>
</template>
