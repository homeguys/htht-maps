/*
 * @Author: 王磊
 * @Date: 2020-12-29 09:54:32
 * @LastEditors: 王磊
 * @LastEditTime: 2021-03-23 13:57:24
 * @Description: 初始化openlayers地图和常用工具类
 * @FilePath: \src\utils\OLMap\OLMap.js
 */
import 'ol/ol.css'
import { Map, View } from 'ol'
import XYZ from 'ol/source/XYZ'
import TileLayer from 'ol/layer/Tile'
import { unByKey } from 'ol/Observable'
import mapConfig from './mapConfig'

const { target, projection, center, zoom, onlineTdtLayers } = mapConfig
const { vec, vecCva, img, imgCia } = onlineTdtLayers

/**
 * 修改学生信息
 * @author Jane Smith <jsmith@example.com>
 * @param {object} params
 * @param {object[]} params.data - 信息数据
 * @param {String} params.data.name - 姓名
 * @param {number} params.data.age - 年龄
 * @param {String} params.data.gender - 性别
 * @param {String} params.data.class - 班级
 * @param {number} params.data.studentId - 学号
 * @param {function} [params.callbackFn=null] - 添加信息回调
 */
class OLMap extends Map {
  constructor(props = {}) {
    const { init } = props
    if (init) {
      super({
        target: props.target || target,
        controls: []
      })
      this.events = {}
      this.initMap(props)
      OLMap.instance = this
    } else if (typeof OLMap.instance === 'object') {
      return OLMap.instance
    }

    return this
  }

  // 初始化地图
  initMap(props = {}) {
    // 天地图地形图
    const vectLayer = new TileLayer({
      source: new XYZ({
        title: vec.name,
        url: vec.url
      }),
      zIndex: 1,
      visible: true,
      className: vec.value
    })

    // 天地图地形图标注
    const vectInfo = new TileLayer({
      source: new XYZ({
        title: vecCva.name,
        url: vecCva.url
      }),
      zIndex: 1,
      className: vecCva.value,
      visible: true
    })

    // 天地图影像图
    const imgLayer = new TileLayer({
      source: new XYZ({
        title: img.name,
        url: img.url
      }),
      zIndex: 1,
      className: img.value,
      visible: false
    })

    // 天地图影像图标注
    const imgInfo = new TileLayer({
      source: new XYZ({
        title: imgCia.name,
        url: imgCia.url
      }),
      zIndex: 1,
      className: imgCia.value,
      visible: false
    })

    const olView = new View({
      projection: props.projection || projection,
      center: props.center || center,
      zoom: props.zoom || zoom
    })

    const baseLayers = [vectLayer, vectInfo, imgLayer, imgInfo]
    baseLayers.forEach((item) => {
      this.addLayer(item)
    })
    this.setView(olView)

    this.on('pointermove', (evt) => {
      this.getTargetElement().style.cursor = this.hasFeatureAtPixel(evt.pixel) ? 'pointer' : ''
    })
  }

  // 增加地图事件
  addEvent(type, fn) {
    const mapEvent = this.on(type, fn)
    this.events[type] = mapEvent
  }

  // 移除地图事件
  removeEvent(type) {
    unByKey(this.events[type])
  }
}

export default OLMap
