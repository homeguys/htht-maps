/*
 * @Author: 王磊
 * @Date: 2020-12-08 19:25:26
 * @LastEditors: 王磊
 * @LastEditTime: 2021-04-02 17:24:36
 * @Description:  地图相关配置
 * @FilePath: \src\utils\OLMap\mapConfig.js
 */
/**
 * 说明：地图的基本配置
 * @return {Object}
 */
// const token = 'f12e9e49e23e0bda902fa825ac71f52f';
// const token = '76323e8adeeeff788ca904dca362e02a';
// const token = 'c961c524a06a13874e7953ee5652aa76';
const token = 'b5aea23b237475f79091155f39ffdefa';

const mapConfigs = {
  target: 'map-container', // 地图容器
  projection: 'EPSG:4326', // 空间参考
  center: [115.1708958178185, 28.84161111741602], // 地图中心点
  zoom: 10.8, // 显示级别
  minZoom: 5, // 最小缩放级别
  maxZoom: 20, // 最大缩放级别
  // token: '', // 天地图token

  onlineTdtLayers: {
    vec: {
      name: '地形图',
      value: 'baseLayer_vect',
      url: `http://t{0-7}.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${token}`, // 天地图矢量
    },
    vecCva: {
      name: '地形图标注',
      value: 'baseLayer_vect',
      url: `http://t{0-7}.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${token}`, // 天地图矢量注记
    },
    img: {
      name: '影像图',
      value: 'baseLayer_image',
      url: `http://t{0-7}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=${token}`, // 天地图影像
    },
    imgCia: {
      name: '影像图标注',
      value: 'baseLayer_image',
      url: `http://t{0-7}.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=${token}`, // 天地图影像注记
    },
  },
};

export default mapConfigs;
