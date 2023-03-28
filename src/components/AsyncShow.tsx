import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve({
          result: 42
        })
      }, 3000);
    })
  }
})
