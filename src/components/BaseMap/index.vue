<!--
 * @Author: 王磊
 * @Date: 2021-03-18 11:31:55
 * @LastEditors: 王磊
 * @LastEditTime: 2021-04-02 14:42:42
 * @Description: 地图组件
 * @FilePath: \src\components\BaseMap\index.vue
-->
<template>
  <section id="map-container" class="basemap"></section>
</template>

<script>
import OLMap from '@/utils/OLMap/OLMap'
import OLWMS from '@/utils/OLMap/OLWMS'

export default {
  name: 'BaseMap',
  props: {
    params: {
      type: Object,
      data() {
        return {}
      }
    }
  },
  mounted() {
    const { init } = this.params

    const oLMap = new OLMap({ init })

    // 加载矢量边界和湖泊河流
    const oLWMS = new OLWMS(oLMap)
    oLWMS.addWMSLayer({
      url: process.env.VUE_APP_GEOSERVER_IP,
      params: {
        layers: 'jaCountyTown'
      }
    })
  }
}
</script>

<style lang="less">
.basemap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
