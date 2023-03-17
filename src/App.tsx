import { defineComponent, Ref, ref } from 'vue'
import MonacoEditor from './components/MonacoEditor'
import { createUseStyles } from 'vue-jss'

function toJson(data: any) {
  return JSON.stringify(data, null, 2) // 第三个参数含义
}

const schema = {
  type: 'string'
}

const useStyles = createUseStyles({
  // 写样式
  editor: {
    minHeight: 400
  }
})

export default defineComponent({
  setup() {
    const schemaRef: Ref<any> = ref(schema)
    const handleCodeChange = (code: string) => {
      let schema: any

      try {
        schema = JSON.parse(code)
      } catch (error) {
        console.warn('error')
      }

      schemaRef.value = schema
    }
    const classesRef = useStyles()

    return () => {
      const classes = classesRef.value
      const code = toJson(schemaRef.value)
      return (
        <div>
          <div id='nav'>
            <router-link to='/'>Home</router-link> |<router-link to='/cesium'>Cesium</router-link> |<router-link to='/ol'>OpenLayers</router-link> |
            <router-link to='/mapbox-gl'>MapBox-gl</router-link>
          </div>
          <router-view />
          <MonacoEditor code={code} onChange={handleCodeChange} title='schema' class={classes.editor} />
        </div>
      )
    }
  }
})
