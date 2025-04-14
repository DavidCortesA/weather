import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WeatherDetails from '@/components/WeatherDetails.vue'

describe('WeatherDetails.vue', () => {
  const mockWeatherData2 = {
    list: [
      {
        dt: 1713100000,
        main: { temp_max: 23, temp_min: 15 },
        weather: [{ icon: '04d', description: 'broken clouds' }],
      },
      {
        dt: 1713186400,
        main: { temp_max: 26, temp_min: 18 },
        weather: [{ icon: '02d', description: 'partly cloudy' }],
      },
    ],
  }

  it('renderiza el pronóstico de los días', () => {
    const wrapper = mount(WeatherDetails, {
      props: { weatherData2: mockWeatherData2 },
    })

    // Título
    expect(wrapper.text()).toContain('7-Day Forecast')

    // Iconos y descripciones
    const listItems = wrapper.findAll('li')
    expect(listItems.length).toBeGreaterThan(0)
    expect(wrapper.text()).toMatch(/broken clouds|partly cloudy/)
    expect(wrapper.find('img').attributes('src')).toContain('openweathermap.org')
  })

  it('no muestra días si no hay datos', () => {
    const wrapper = mount(WeatherDetails, {
      props: { weatherData2: undefined },
    })
    expect(wrapper.findAll('li').length).toBe(0)
  })
})
