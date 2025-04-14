import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CurrentForecast from '@/components/CurrentForecast.vue'

describe('CurrentForecast.vue', () => {
  const mockTodayForecast = {
    list: [
      {
        dt: 1713120000, // Ejemplo de timestamp
        main: { temp: 22.3, temp_max: 24.5, temp_min: 20.1 },
        weather: [{ icon: '01d', description: 'clear sky' }],
      },
      {
        dt: 1713130000,
        main: { temp: 21.0, temp_max: 22.1, temp_min: 19.8 },
        weather: [{ icon: '01d', description: 'clear sky' }],
      },
    ],
  }

  it('renderiza datos del pronóstico de hoy correctamente', () => {
    const wrapper = mount(CurrentForecast, {
      props: { todayForecast: mockTodayForecast },
    })

    expect(wrapper.text()).toContain("Today's Forecast")
    // expect(wrapper.text()).toMatch(/\b\d{1,2}:\d{2} (AM|PM)\b/) // Formato de hora
    expect(wrapper.html()).toContain('22.3') // Temperatura
    expect(wrapper.find('img').attributes('src')).toContain('01d')
  })

  it('renderiza vacío si no hay todayForecast', () => {
    const wrapper = mount(CurrentForecast, {
      props: { mockTodayForecast: null },
    })
    expect(wrapper.findAll('li').length).toBe(0)
  })
})
