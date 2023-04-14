<template>
  <a-menu v-model:selectedKeys="current" mode="horizontal">
    <a-menu-item key="mail">
      <template #icon>
        <icon-font type="icon-nongye" :style="iconStyle" />
      </template>
      知乎
    </a-menu-item>
    <a-menu-item key="app">
      <template #icon>
        <appstore-outlined :style="iconStyle" />
      </template>
      Cesium
    </a-menu-item>
    <a-menu-item key="alipay">
      <a-sub-menu key="sub1">
        <template #icon>
          <setting-outlined :style="iconStyle" />
        </template>
        <template #title>Maps</template>
        <a-menu-item key="setting:1">Cesium</a-menu-item>
        <a-menu-item key="setting:2">OpenLayers</a-menu-item>
      </a-sub-menu>
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts">
import { Menu } from 'ant-design-vue'
import { defineComponent, ref } from 'vue'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue'
import { createFromIconfontCN } from '@ant-design/icons-vue'

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2292044_3hg7xbgbeaj.js'
})

const MenuItem = Menu.Item
const MenuItemGroup = Menu.ItemGroup
const SubMenu = Menu.SubMenu

export default defineComponent({
  components: {
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
    AMenu: Menu,
    AMenuItem: MenuItem,
    AMenuItemGroup: MenuItemGroup,
    ASubMenu: SubMenu,
    IconFont
  },
  setup() {
    const current = ref<string[]>(['mail'])
    return {
      current,
      iconStyle: { verticalAlign: 'middle' }
    }
  }
})
</script>
