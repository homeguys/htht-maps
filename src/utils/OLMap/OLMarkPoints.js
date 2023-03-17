/*
 * @Author: 王磊
 * @Date: 2021-03-18 16:16:31
 * @LastEditors: 王磊
 * @LastEditTime: 2021-03-22 17:24:09
 * @Description: openlayers mark点位
 * @FilePath: \src\utils\OLMap\OLMarkPoints.js
 */
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import VectorSource from 'ol/source/Vector'
import Overlay from 'ol/Overlay'
import { Icon, Style } from 'ol/style'
import { Vector as VectorLayer } from 'ol/layer'
// import { unByKey } from 'ol/Observable';
import OLMap from '@/utils/OLMap/OLMap'

class OLMarkPoints {
  constructor() {
    this.map = new OLMap()
    this.markPointsLayer = null
    this.pointClick = null
    this.pointOverlay = null
    this.pointFeatures = []
  }

  // 增加标记点
  add(markPoints = []) {
    this.pointFeatures = []
    markPoints.forEach((item) => {
      const { lon, lat, icon } = item
      const coor = [lon, lat]

      // 定义feature点
      const iconFeature = new Feature({
        geometry: new Point(coor),
        attribute: {
          ...item
        }
      })

      // 给feature点设置样式
      iconFeature.setStyle(
        new Style({
          image: new Icon({
            src: icon
          })
        })
      )

      this.pointFeatures.push(iconFeature)
    })

    this.markPointsLayer = new VectorLayer({
      source: new VectorSource(),
      zIndex: 1002
    })

    this.markPointsLayer.getSource().addFeatures(this.pointFeatures)
    this.markPointsLayer.set('name', markPoints[0].type) // 添加图层类别标识
    this.map.addLayer(this.markPointsLayer)

    return this
  }

  // 移除标记点
  remove() {
    if (this.markPointsLayer) {
      this.markPointsLayer
        .getSource()
        .getFeatures()
        .forEach((feature) => {
          this.markPointsLayer.getSource().removeFeature(feature)
        })
      this.pointFeatures = []
      this.map.removeLayer(this.markPointsLayer)
      this.markPointsLayer = null
    }

    // this.map.getLayers().forEach((layer) => {
    //   const layerType = layer?.get('name');
    //   console.log(layerType);
    //   if (layerType === val) {
    //     this.map.removeLayer(layer);
    //   } else {
    //     // this.oLWMS.removeWMSLayer(id);
    //   }
    // });
  }

  // 增加mark点弹出
  addPointOverlay(element) {
    this.pointOverlay = new Overlay({
      element,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    })
    this.map.addOverlay(this.pointOverlay)
  }

  // 移除mark点弹出
  removePointOverlay() {
    this.map.removeOverlay(this.pointOverlay)
  }
}

export default OLMarkPoints
