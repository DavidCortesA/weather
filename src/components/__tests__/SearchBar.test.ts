import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchBar from '@/components/SearchBar.vue'

describe('SearchBar.vue', () => {
  it('emite evento "search" al hacer enter', async () => {
    const wrapper = mount(SearchBar)

    const input = wrapper.find('input')
    await input.setValue('Madrid')
    await input.trigger('keydown.enter')

    expect(wrapper.emitted()).toHaveProperty('search')
    expect(wrapper.emitted('search')![0]).toEqual(['Madrid'])
  })

  it('emite evento "search" al hacer click en el botón', async () => {
    const wrapper = mount(SearchBar)

    const input = wrapper.find('input')
    await input.setValue('Barcelona')

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('search')
    expect(wrapper.emitted('search')![0]).toEqual(['Barcelona'])
  })
})
