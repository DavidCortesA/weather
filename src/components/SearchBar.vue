<script setup lang="ts">
import { ref } from 'vue'
import { Icon as IconComponent } from '@iconify/vue'

const city: string = ref('')
const emit: () => void = defineEmits(['search'])

const search = () => {
  emit('search', city.value)
}
</script>

<template>
  <div class="flex items-center p-2 border rounded relative w-full bg-inherit">
    <input
      type="text"
      v-model="city"
      placeholder="Ciudad, País"
      class="flex-grow py-3 border-none rounded-full px-5 focus:outline-none bg-gray-700 w-full relative text-white"
      @keydown.enter="search"
    />
    <button
      @click="search"
      class="py-1.5 px-2 absolute right-3 bg-white text-white rounded-full border-none cursor-pointer"
    >
      <icon-component icon="mdi:magnify" class="bg-white text-black rounded-full border-none" />
    </button>
  </div>
</template>
