import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

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
        let int = (str) => parseInt(str.replace(/[^0-9]/g, ""));
        return int(dt) < int(sunrise) || int(dt) > int(sunset);
      }

      return {
        weatherData: getWeatherData(),
        getWeatherConditionsIcon,
        getTemperatureStr,
        getPressureStr,
        isNight
      }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li v-for="value in weatherData" class="weather-card" :class="{'weather-card--night' : isNight(value.current.sunrise, value.current.sunset, value.current.dt)}">

          <div v-if="value.alert != null" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ value.alert.sender_name + '\\n' + value.alert.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ value.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ value.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="value.current.weather.description">{{ getWeatherConditionsIcon(value.current.weather.id) }}</div>
            <div class="weather-conditions__temp">{{ getTemperatureStr(value.current.temp) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ getPressureStr(value.current.pressure) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ value.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ value.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ value.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
