import { defineComponent, Suspense } from 'vue'
import axios from 'axios'

export default defineComponent({
  async setup() {
    const res = await axios.get('https://api.thecatapi.com/v1/images/search')
    const { data } = res || {}
    const { url } = data[0]

    console.warn('url', url)
    return () => {
      return (
        <Suspense>
          <div class='demo'>
            <img src={url} alt='' />
            123
          </div>
        </Suspense>
      )
    }
  }
})
