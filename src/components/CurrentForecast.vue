<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  todayForecast: Object,
})

const thisDays = computed(() => {
  if (!props.todayForecast || !props.todayForecast.list) {
    return []
  }

  const dailyData: { [key: string]: { temp: number; icon: string; description: string } } = {}

  props.todayForecast.list.forEach((item) => {
    const date = new Date(item.dt * 1000)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const formattedDate = `${day}/${month}/${year}`

    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // Usa AM/PM
    })

    if (!dailyData[formattedDate]) {
      dailyData[formattedDate] = {
        temp: item.main.temp,
        date: formattedDate,
        time: formattedTime,
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

  return Object.values(dailyData)
})
</script>

<template>
  <div class="w-full flex flex-col p-5 rounded-lg bg-gray-700 h-full p-5 mt-5">
    <h3 class="w-full pl-5 text-white font-bold">Today's Forecast</h3>
    <ul class="flex flex-row flex-wrap gap-5 items-center justify-between mt-5">
      <li v-for="item in thisDays" :key="item.date" class="flex flex-col items-center">
        <p>{{ item.time }}</p>
        <img :src="`https://openweathermap.org/img/wn/${item.icon}@2x.png`" alt="Weather Icon" />
        <p>{{ item.temp }}</p>
      </li>
    </ul>
  </div>
</template>
