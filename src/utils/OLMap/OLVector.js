/*
 * @Author: 王磊
 * @Date: 2021-01-29 14:38:43
 * @LastEditors: 王磊
 * @LastEditTime: 2021-03-26 17:10:37
 * @Description: openlayers请求vector(format:GeoJSON)服务
 * @FilePath: \src\utils\OLMap\OLGeoJSON.js
 */

import { Vector as VectorLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Overlay from 'ol/Overlay';

import Select from 'ol/interaction/Select';
import { pointerMove } from 'ol/events/condition';
// import ol from 'ol';

import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';

import OLMap from '@/utils/OLMap/OLMap';
import { setColorStroke } from '@/utils/OLMap/ColorBlendingScheme';

class OLVector {
  constructor(prop) {
    const { map, vectorType } = prop;
    this.map = map || new OLMap();
    // this.WMSLayers = new Map();
    switch (vectorType) {
      case 'GeoJSON':
        this.vectorType = new GeoJSON();
        break;
      default:
        this.vectorType = new GeoJSON();
        break;
    }
    this.polygonOverlay = null;
    this.selectClick = null;
    this.featureInfo = {};
    this.style = null;
    this.GeoJSONLayer = null;

    // this.VectorLayers = new Map(); // 矢量图层
  }

  // 增加矢量图层
  addVectorLayer(options) {
    // const { params = {} } = options;
    const fill = new Fill();
    this.style = new Style({
      fill,
      stroke: new Stroke({}),
    });

    // 根据不同的矢量分层渲染
    const getStackedStyle = (feature) => {
      let indexValue = 0;
      const id = feature.getId();
      if (id.substring(0, 9) === 'water_CZL') {
        // 水资源承载力
        // eslint-disable-next-line no-underscore-dangle
        indexValue = feature.values_.SZYCZL;
      } else if (id.substring(0, 9) === 'water_STA') {
        // 水生态安全
        // eslint-disable-next-line no-underscore-dangle
        indexValue = feature.values_.SSTAQZS;
      } else if (id.substring(0, 9) === 'water_STG') {
        // 水生态功能
        // eslint-disable-next-line no-underscore-dangle
        indexValue = feature.values_.SSTGNZHZS;
      } else if (id.substring(0, 9) === 'water_STW') {
        // 水生态文明
        // eslint-disable-next-line no-underscore-dangle
        indexValue = feature.values_.SSTWMZS;
      } else if (id.substring(0, 9) === 'water_sou') {
        // 水资源调查
        // eslint-disable-next-line no-underscore-dangle
        indexValue = feature.values_.LXDM;
      }

      return setColorStroke(id, indexValue, this.style);
    };

    const { url, layerParams = {} } = options;
    const { zIndex } = layerParams;
    this.GeoJSONLayer = new VectorLayer({
      source: new VectorSource({
        url,
        format: this.vectorType,
      }),
      zIndex: zIndex || 20,
      // eslint-disable-next-line object-shorthand
      style: getStackedStyle,
    });
    this.map.addLayer(this.GeoJSONLayer);
  }

  // 移除vector图层
  removeVectorLayer(layers) {
    const vectorLayer = this.map.get(layers);
    this.map.removeLayer(vectorLayer);
  }

  // 视角居中
  viewCenter() {
    const view = this.map.getView();
    view.setCenter([96, 35.2]);
    view.setZoom(6.5);
  }

  // 增加信息弹窗
  addPolygonOverlay(element) {
    this.polygonOverlay = new Overlay({
      element,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
      positioning: 'top-right',
    });
    this.map.addOverlay(this.polygonOverlay);
    this.polygonOverlay.setPosition(undefined);

    this.selectClick = new Select({
      condition: pointerMove,
      style: new Style({
        fill: new Fill({
          color: 'red',
        }),
        stroke: new Stroke({
          color: '#333',
          width: 0.5,
        }),
      }),
    });
    this.map.addInteraction(this.selectClick);
    this.selectClick.on('select', (e) => {
      if (e.selected[0]) {
        // eslint-disable-next-line no-param-reassign
        element.style.display = 'block';

        const position = e.selected[0].getGeometry().getCoordinates();
        const innerPosition = position[0][0].reduce((x, y) => [x[0] + y[0], x[1] + y[1]]);
        const innerPositionReal = innerPosition.map((x) => x / position[0][0].length);

        this.polygonOverlay.setPosition(innerPositionReal);
        // eslint-disable-next-line no-underscore-dangle
        this.featureInfo = e.selected[0].values_;
      } else {
        this.polygonOverlay.setPosition(undefined);
      }
    });
  }

  // 移除mark点弹出
  removePointOverlay() {
    this.map.removeOverlay(this.pointOverlay);
  }
}

export default OLVector;
