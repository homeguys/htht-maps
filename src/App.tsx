import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return () => {
      return (
        <div>
          <div id='nav'>
            <span>
              <router-link to='/'>Home</router-link>
            </span>
            |
            <span>
              <router-link to='/cesium'>Cesium</router-link>
            </span>{' '}
            |
            <span>
              <router-link to='/ol'>OpenLayers</router-link>
            </span>{' '}
            |
            <span>
              <router-link to='/mapbox-gl'>MapBox-gl</router-link>
            </span>
            |
            <span>
              <router-link to='/demo'>Demo</router-link>
            </span>
            |
            <span>
              <router-link to='/editor'>Editor</router-link>
            </span>
          </div>
          <router-view />
        </div>
      )
    }
  }
})
