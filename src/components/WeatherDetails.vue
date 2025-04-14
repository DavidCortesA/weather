<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  weatherData2: Object,
})

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const dataListPerDay = computed(() => {
  if (!props.weatherData2 || !props.weatherData2.list) {
    return [] // Retorna un array vacío si no hay datos
  }

  const dailyData: { [key: string]: { temp_max: number; temp_min: number; date: string } } = {}

  props.weatherData2.list.forEach((item) => {
    const date = new Date(item.dt * 1000)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const getNameDay = date.getDay()
    const formattedDate = `${day}/${month}/${year}`

    if (!dailyData[formattedDate]) {
      dailyData[formattedDate] = {
        temp_max: item.main.temp_max,
        temp_min: item.main.temp_min,
        date: formattedDate,
        name: getNameDay,
        icon: item.weather[0].icon,
        description: item.weather[0].description,
      }
    } else {
      dailyData[formattedDate].temp_max = Math.max(
        dailyData[formattedDate].temp_max,
        item.main.temp_max,
      )
      dailyData[formattedDate].temp_min = Math.min(
        dailyData[formattedDate].temp_min,
        item.main.temp_min,
      )
    }
  })

  return Object.values(dailyData) // Convierte el objeto en un array de valores
})

const getWeatherIcon = (iconCode: string) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
}
</script>

<template>
  <div class="w-full flex flex-col p-5 rounded-lg bg-gray-700 h-full p-5 py-11">
    <h3 class="w-full pl-5 text-white font-bold">7-Day Forecast</h3>
    <ul>
      <li
        v-for="item in dataListPerDay"
        :key="item.date"
        class="flex flex-row items-center justify-between p-10 border-b border-white border-b-solid"
      >
        <p>{{ days[item.name] }}</p>
        <p class="capitalize flex flex-row items-center justify-start gap-2">
          <img :src="getWeatherIcon(item.icon)" alt="Weather Icon" class="w-10 h-10" />{{
            item.description
          }}
        </p>
        <p>
          <span class="font-bold">{{ Math.round(item.temp_max) }}</span
          >/{{ Math.round(item.temp_min) }}°
        </p>
      </li>
    </ul>
  </div>
</template>
