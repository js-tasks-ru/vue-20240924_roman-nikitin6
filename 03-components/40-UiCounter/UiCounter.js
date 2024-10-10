import {defineComponent, toRef, ref, watch} from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    count: {
      type: Number
    },

    min: {
      type: Number,
      default: 0
    },

    max: {
      type: Number
    }
  },

  emits: ['update:count'],

  setup(props, { emit }) {
    const counter = toRef(() => props.count);
    const newCount = ref(counter.value);

    watch([newCount], () => {
      emit('update:count', newCount.value);
    })

    watch([counter], () => {
      newCount.value = counter.value;
    })

    return {
      counter,
      newCount
    }
  },

  template: `
    <div class="counter">
      <UiButton aria-label="Decrement" :disabled="counter <= min" @click="newCount--">➖</UiButton>
      <span class="count" data-testid="count">{{ counter }}</span>
      <UiButton aria-label="Increment" :disabled="max && counter >= max" @click="newCount++">➕</UiButton>
    </div>
  `,
})
