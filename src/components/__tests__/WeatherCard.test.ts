import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import WeatherCard from '@/components/WeatherCard.vue'

// Mock de los componentes hijos
vi.mock('@/components/AirConditions.vue', () => ({
  default: {
    name: 'AirConditions',
    template: '<div class="air-conditions">AirConditions Component</div>',
  },
}))

vi.mock('@/components/CurrentForecast.vue', () => ({
  default: {
    name: 'CurrentForecast',
    template: '<div class="current-forecast">CurrentForecast Component</div>',
  },
}))

describe('WeatherCard.vue', () => {
  const mockWeatherData = {
    name: 'Barcelona',
    main: { temp: 25.8 },
    weather: [{ icon: '04d', description: 'broken clouds' }],
  }

  const mockTodayForecast = {
    list: [],
  }

  it('muestra correctamente la información del clima actual', () => {
    const wrapper = mount(WeatherCard, {
      props: {
        weatherData: mockWeatherData,
        todayForecast: mockTodayForecast,
      },
    })

    expect(wrapper.text()).toContain('Barcelona')
    expect(wrapper.text()).toContain('broken clouds')
    expect(wrapper.text()).toContain('25.8°')
    expect(wrapper.find('img').attributes('src')).toContain('04d')
    expect(wrapper.find('.air-conditions').exists()).toBe(true)
    expect(wrapper.find('.current-forecast').exists()).toBe(true)
  })
})
