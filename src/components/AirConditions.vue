<script setup lang="ts">
import { computed } from 'vue'
import { Icon as IconComponent } from '@iconify/vue'

const props = defineProps({
  weatherData: Object,
})

const feelLike = computed(() => props.weatherData?.main.feels_like)
const humidity = computed(() => props.weatherData?.main.humidity)
const pressure = computed(() => props.weatherData?.main.pressure)
const windSpeed = computed(() => props.weatherData?.wind.speed)
</script>

<template>
  <div class="w-full flex flex-col px-4 py-8 rounded-lg bg-gray-700">
    <h3 class="w-full pl-5 text-white font-bold">Air Conditions</h3>
    <div class="grid md:grid-cols-2 grid-cols-1 gap-5 mt-5 px-5">
      <div class="w-full flex flex-col md:items-start items-center gap-2">
        <h4 class="text-md gap-1 my-2 flex flex-row items-start">
          <icon-component icon="mdi:thermometer" class="text-2xl" />Real Feel
        </h4>
        <p class="text-2xl font-bold">{{ feelLike }}°</p>
      </div>
      <div class="w-full flex flex-col md:items-start items-center gap-2">
        <h4 class="text-md gap-1 my-2 flex flex-row items-start">
          <icon-component icon="mdi:water-percent" class="text-2xl" />Humidity
        </h4>
        <p class="text-2xl font-bold">{{ humidity }}%</p>
      </div>
      <div class="w-full flex flex-col md:items-start items-center gap-2">
        <h4 class="text-md gap-1 my-2 flex flex-row items-start">
          <icon-component icon="mdi:gauge" class="text-2xl" />Pressure
        </h4>
        <p class="text-2xl font-bold">{{ pressure }} hPa</p>
      </div>
      <div class="w-full flex flex-col md:items-start items-center gap-2">
        <h4 class="text-md gap-1 my-2 flex flex-row items-start">
          <icon-component icon="mdi:weather-windy" class="text-2xl" />Wind
        </h4>
        <p class="text-2xl font-bold">{{ windSpeed }} m/s</p>
      </div>
    </div>
  </div>
</template>
