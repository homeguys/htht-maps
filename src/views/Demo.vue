<template>
  <div id="demo">
    <Suspense>
      <template #default>
        <async-show />
      </template>

      <template #fallback>
        <h1>Loading</h1>
      </template>
    </Suspense>
    <button @click="onModalOpen">打开弹出框</button>
    <modal :isOpen="isOpen" @close-modal="onModalClose" />
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ref } from 'vue';
import AsyncShow from '@/components/AsyncShow';
import Modal from '@/components/Modal.vue';

export default {
  name: 'Demo',
  components: {
    AsyncShow,
    Modal,
  },
  setup() {
    const isOpen = ref(false);
    const onModalOpen = () => {
      isOpen.value = true;
    };
    const onModalClose = () => {
      isOpen.value = false;
    };

    return {
      isOpen,
      onModalOpen,
      onModalClose,
    };
  },
};
</script>

<style lang="less">
#demo {
  height: 200px;
}
</style>
