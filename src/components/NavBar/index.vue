<template>
  <a-menu v-model:selectedKeys="current" mode="horizontal" @select="handleSelectMenu">
    <a-menu-item key="zhihu">
      <template #icon>
        <icon-font type="icon-nongye" :style="iconStyle" />
      </template>
      知乎
    </a-menu-item>
    <a-menu-item key="map">
      <a-sub-menu key="sub1">
        <template #icon>
          <icon-font type="icon-map" :style="iconStyle" />
        </template>
        <template #title>Maps</template>
        <a-menu-item key="cesium">Cesium</a-menu-item>
        <a-menu-item key="ol">OpenLayers</a-menu-item>
        <a-menu-item key="mapbox-gl">MapBox-gl</a-menu-item>
      </a-sub-menu>
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts">
import { Menu } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';
import { createFromIconfontCN } from '@ant-design/icons-vue';
import { SelectInfo } from 'ant-design-vue/lib/menu/src/interface';
import { useRouter } from 'vue-router';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4022896_aulyvjzw1pv.js',
});

const MenuItem = Menu.Item;
const { SubMenu } = Menu;

export default defineComponent({
  components: {
    AMenu: Menu,
    AMenuItem: MenuItem,
    ASubMenu: SubMenu,
    IconFont,
  },
  setup() {
    const current = ref<string[]>(['mail']);
    const router = useRouter();

    const handleSelectMenu = (data: SelectInfo) => {
      const { item, key, selectedKeys } = data || {};
      console.warn('handleSelectMenu', item, key, selectedKeys);
      router.push(`/${key}`);
    };

    return {
      current,
      iconStyle: { verticalAlign: 'middle' },
      handleSelectMenu,
    };
  },
});
</script>
<style lang="less" scoped>
.ant-menu-horizontal {
  line-height: 60px;
}

.ant-menu-title-content {
  font-size: 16px;
}
</style>
