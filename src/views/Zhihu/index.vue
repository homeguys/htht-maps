<template>
  <section id="zhihu">
    <nav-bar :user="user" />
    <section class="mainContent">
      <router-view />
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NavBar } from '@/components/Zhihu';

const userData = {
  isLogin: false,
  name: 'Mking',
};

export default defineComponent({
  name: 'Index',
  components: {
    NavBar,
  },
  setup() {
    return {
      user: userData,
    };
  },
});
</script>

<style lang="less">
#zhihu {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.mainContent {
  flex: 1 1;
}
</style>
