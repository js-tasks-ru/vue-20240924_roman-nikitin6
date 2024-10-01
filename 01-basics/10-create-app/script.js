import { defineComponent, createApp } from 'vue'

const App = defineComponent({
  name: 'App',
  setup() {
      function formatAsCurrentDate(){
          return new Date().toLocaleDateString(navigator.language,{
            year: "numeric",
            month: "long",
            day: "numeric"
          });
      }
      return {
        formatAsCurrentDate
      }
  },
  template: '<div>Сегодня {{ formatAsCurrentDate() }}</div>',
})

const app = createApp(App);
app.mount('#app');
