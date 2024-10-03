import {computed, defineComponent, ref} from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
      const firstNumber = ref('');
      const secondNumber = ref('');
      const operator = ref('');
      const resultNumber = computed(() =>{
        if (firstNumber.value === '' || secondNumber.value === '' || operator.value === ''){
          return '';
        }
        switch (operator.value){
          case 'sum':
            return firstNumber.value + secondNumber.value;
          case 'subtract':
            return firstNumber.value - secondNumber.value;
          case 'multiply':
            return firstNumber.value * secondNumber.value;
          case 'divide':
            return firstNumber.value / secondNumber.value;
          default:
            return '';
        }
      });
      return {
        firstNumber,
        secondNumber,
        operator,
        resultNumber
      }
  },

  template: `
    <div class="calculator">
      <input type="number" aria-label="First operand" v-model="firstNumber"/>

      <div class="calculator__operators">
        <label><input type="radio" name="operator" value="sum" v-model="operator"/>➕</label>
        <label><input type="radio" name="operator" value="subtract" v-model="operator"/>➖</label>
        <label><input type="radio" name="operator" value="multiply" v-model="operator"/>✖</label>
        <label><input type="radio" name="operator" value="divide" v-model="operator"/>➗</label>
      </div>

      <input type="number" aria-label="Second operand" v-model="secondNumber"/>

      <div>=</div>

      <output>{{ resultNumber }}</output>
    </div>
  `,
})
