import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AirConditions from '@/components/AirConditions.vue'

// Mock del componente Iconify
vi.mock('@iconify/vue', () => ({
  Icon: {
    name: 'IconComponent',
    template: '<span><slot /></span>',
  },
}))

describe('AirConditions.vue', () => {
  const mockWeatherData = {
    main: {
      feels_like: 24.5,
      humidity: 60,
      pressure: 1012,
    },
    wind: {
      speed: 5.5,
    },
  }

  it('muestra correctamente los datos del clima', () => {
    const wrapper = mount(AirConditions, {
      props: {
        weatherData: mockWeatherData,
      },
    })

    expect(wrapper.text()).toContain('Real Feel')
    expect(wrapper.text()).toContain('24.5°')

    expect(wrapper.text()).toContain('Humidity')
    expect(wrapper.text()).toContain('60%')

    expect(wrapper.text()).toContain('Pressure')
    expect(wrapper.text()).toContain('1012 hPa')

    expect(wrapper.text()).toContain('Wind')
    expect(wrapper.text()).toContain('5.5 m/s')
  })
})
