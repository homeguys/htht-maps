/*
 * @Author: 王磊
 * @Date: 2021-01-29 14:38:43
 * @LastEditors: 王磊
 * @LastEditTime: 2021-03-30 19:39:24
 * @Description: openlayers请求wms服务
 * @FilePath: \src\utils\OLMap\OLWMS.js
 */
import TileWMS from 'ol/source/TileWMS';
import TileLayer from 'ol/layer/Tile';
import axios from 'axios';

import Overlay from 'ol/Overlay';

class OLWMS {
  constructor(map) {
    this.map = map;
    this.WMSLayers = new Map(); // WMS服务图层
    this.WMSSource = null;
    this.WMSLayer = null;
    this.polygonOverlay = null;
    this.infoArray = {};
  }

  // 获取sld xml
  static getStyle(colorValue) {
    if (!colorValue) return '';
    const colors = [];
    const { reMaps } = colorValue;
    reMaps.forEach((item) => {
      colors.push({
        color: item.color && OLWMS.to16(item.color),
        value: parseFloat(item.value),
        opacity: item.color && item.color[3],
      });
    });

    // let colorsString = '';
    // colors.forEach((item) => {
    //   colorsString += `<ColorMapEntry color="${item.color}" quantity="${item.value}" />`;
    // });

    const result = `<?xml version="1.0" encoding="UTF-8"?>
    <StyledLayerDescriptor
      xmlns="http://www.opengis.net/sld"
      xmlns:ogc="http://www.opengis.net/ogc"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.opengis.net/sld
      http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
      version="1.0.0"
    >
      <NamedLayer>
        <Name>qh:DA</Name>
        <UserStyle>
          <Title>A raster style</Title>
          <FeatureTypeStyle>
            <Rule>
              <RasterSymbolizer>
                <Opacity>1.0</Opacity>
                <ColorMap type="intervals">
                  <ColorMapEntry color="#f0f0f0" quantity="-9999" />
                  <ColorMapEntry color="#f0f0f0" quantity="0.1" />
                  <ColorMapEntry color="#73b2ff" quantity="2" />
                  <ColorMapEntry color="#0084a8" quantity="5" />
                  <ColorMapEntry color="#ffff00" quantity="10" />
                  <ColorMapEntry color="#a87000" quantity="15" />
                  <ColorMapEntry color="#800015" quantity="20" />
                  <ColorMapEntry color="#ff0000" quantity="50" />
                </ColorMap>
              </RasterSymbolizer>
            </Rule>
          </FeatureTypeStyle>
        </UserStyle>
      </NamedLayer>
    </StyledLayerDescriptor>`;
    return result;
  }

  // rgb转16进制
  static to16(color) {
    const r = parseInt(color[0], 10);
    const g = parseInt(color[1], 10);
    const b = parseInt(color[2], 10);
    // eslint-disable-next-line no-bitwise
    const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    return hex;
  }

  // 增加栅格WMS图层
  addWMSLayer(options) {
    const { url, params = {}, layerParams = {} } = options;
    const { layers } = params;
    const { zIndex } = layerParams;
    this.WMSSource = new TileWMS({
      url,
      params: {
        service: 'WMS',
        format: 'image/png',
        version: '1.1.0',
        transparent: true,
        ...params,
      },
    });

    // 先移除镶嵌数据集图层
    // this.WMSLayers.delete(layers);
    // this.map.removeLayer(this.WMSLayer); // 会将上个图层删除
    if (this.WMSLayers.has(layers)) {
      this.WMSLayers.delete(layers);
      this.map.removeLayer(this.WMSLayers.get(layers));
    }
    this.WMSLayer = new TileLayer({
      visible: true,
      source: this.WMSSource,
      zIndex: zIndex || 10,
    });
    this.WMSLayer.set('name', layers);
    // console.warn(this.WMSLayer.getExtent());
    // console.warn(this.WMSSource);

    // 地图增加镶嵌数据集图层
    this.WMSLayers.set(layers, this.WMSLayer);
    this.map.addLayer(this.WMSLayer);

    // this.viewCenter();
    return this.WMSLayer;
  }

  // 移除栅格WMS图层
  removeWMSLayer(layers) {
    const WMSLayer = this.WMSLayers.get(layers);
    this.WMSLayers.delete(layers);
    this.map.removeLayer(WMSLayer);
    // 根据图层删除
    this.map.getLayers().forEach((layer) => {
      const layerType = layer?.get('name');
      if (layers === layerType) this.map.removeLayer(layer);
    });
  }

  // 视角居中
  viewCenter() {
    const view = this.map.getView();
    view.setCenter([96, 35.2]);
    view.setZoom(6.5);
  }

  // 增加信息弹窗
  addPolygonOverlay(element, layers) {
    this.polygonOverlay = new Overlay({
      element: document.getElementById(element),
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
      positioning: 'top-right',
    });
    this.map.addOverlay(this.polygonOverlay);
    this.polygonOverlay.setPosition(undefined);

    // 地图添加click事件
    this.probeClick = this.map.on('click', (evt) => {
      const view = this.map.getView();
      const viewResolution = view.getResolution();
      const url1 = this.WMSSource.getFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:4326', {
        INFO_FORMAT: 'application/json',
        QUERY_LAYERS: layers,
      });
      // console.warn(url1);
      if (url1) {
        axios.get(url1).then((res) => {
          if (res.data?.features[0]?.properties?.CODE) {
            document.getElementById('ol-popup').style.display = 'block';
            this.infoArray.name = `${res.data.features[0].properties.HHMC}(${res.data.features[0].properties.HDMC})`;
            if (this.polygonOverlay) this.polygonOverlay.setPosition(evt.coordinate);
          } else {
            // eslint-disable-next-line no-unused-expressions
            this.polygonOverlay?.setPosition(undefined);
          }
        });
      } else {
        // eslint-disable-next-line no-unused-expressions
        this.polygonOverlay?.setPosition(undefined);
      }
    });
  }
}

export default OLWMS;
