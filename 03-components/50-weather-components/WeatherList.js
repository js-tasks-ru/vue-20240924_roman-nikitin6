import { defineComponent } from 'vue'
import WeatherListItem from './WeatherListItem.js'

export default defineComponent({
  name: 'WeatherList',

  components: {
    WeatherListItem,
  },

  props: {
    weathers: {
      type: Array,
      required: true,
    },
  },

  template: `
      <ul class="weather-list unstyled-list">
        <WeatherListItem v-for="weather in weathers" :weather="weather"/>
      </ul>
  `,
})
