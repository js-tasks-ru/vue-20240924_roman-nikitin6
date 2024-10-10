import { defineComponent } from 'vue'
import { WeatherConditionIcons } from './weather.service.ts'
import WeatherDetailsItem from './WeatherDetailsItem.js'
import WeatherConditions from './WeatherConditions.js'
import WeatherAlert from './WeatherAlert.js'

export default defineComponent({
  name: 'WeatherListItem',

  components: {
    WeatherDetailsItem,
    WeatherConditions,
    WeatherAlert
  },

  props: {
    weather: {
      type: Object,
      required: true,
    },
  },

  setup() {
    function getWeatherConditionsIcon(id){
      return WeatherConditionIcons[id];
    }

    function getTemperatureStr(str){
      return (str - 273.15).toFixed(1);
    }

    function getPressureStr(str){
      return (str * 0.75).toFixed(0);
    }

    function isNight(sunrise, sunset, dt){
      return dt < sunrise || dt > sunset;
    }

    return {
      getWeatherConditionsIcon,
      getTemperatureStr,
      getPressureStr,
      isNight
    }
  },

  template: `
      <li class="weather-card" :class="{'weather-card--night' : isNight(weather.current.sunrise, weather.current.sunset, weather.current.dt)}">
        <WeatherAlert v-if="weather.alert != null" :description="weather.alert.sender_name + '\\n' + weather.alert.description"/>
        <div>
          <h2 class="weather-card__name">
            {{ weather.geographic_name }}
          </h2>
          <div class="weather-card__time">
            {{ weather.current.dt }}
          </div>
        </div>
        <WeatherConditions :title="weather.current.weather.description"
            :icon="getWeatherConditionsIcon(weather.current.weather.id)"
            :temp="getTemperatureStr(weather.current.temp)"/>
        <div class="weather-details">
          <WeatherDetailsItem label="Давление, мм рт. ст." :value="getPressureStr(weather.current.pressure)"/>
          <WeatherDetailsItem label="Влажность, %" :value="weather.current.humidity"/>
          <WeatherDetailsItem label="Облачность, %" :value="weather.current.clouds"/>
          <WeatherDetailsItem label="Ветер, м/с" :value="weather.current.wind_speed"/>
        </div>
      </li>
  `,
})
