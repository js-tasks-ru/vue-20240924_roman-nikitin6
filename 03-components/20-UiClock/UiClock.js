import {defineComponent, ref, onUnmounted} from 'vue'

export default defineComponent({
  name: 'UiClock',

  setup() {

    let currentTime = ref(getCurrentTime());

    function getCurrentTime(){
      return new Date().toLocaleTimeString(navigator.language,{
        timeStyle: "medium",
      });
    }

    function updateCurrentTime(){
      currentTime.value = getCurrentTime();
    }

    setInterval(() => updateCurrentTime(), 1000)

    onUnmounted(() => {
      clearInterval();
    })

    return {
      currentTime
    }
  },

  template: `<div class="clock">{{ currentTime }}</div>`,
})
