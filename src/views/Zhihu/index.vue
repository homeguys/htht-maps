<template>
  <section id="zhihu">
    <nav-bar :user="user" />
    <section class="mainContent">
      <router-view />
    </section>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { NavBar } from '@/components/Zhihu';
import store from '@/store';

export default defineComponent({
  name: 'Index',
  components: {
    NavBar,
  },
  setup() {
    const currentUser = computed(() => store.state.user);
    return {
      user: currentUser,
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
