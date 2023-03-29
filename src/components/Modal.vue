<template>
  <teleport to="body">
    <div id="modal" v-if="isOpen">
      <h2><slot>this is a modal</slot></h2>
      <button @click="closeBtnClick">关闭</button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Modal',
  props: {
    isOpen: Boolean
  },
  emits: {
    'close-modal': null
  },
  setup(props, context) {
    const closeBtnClick = () => {
      console.warn('context', context)
      context.emit('close-modal')
    }

    return {
      closeBtnClick
    }
  }
})
</script>

<style scoped lang="less">
#modal {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 520px;
  height: 300px;
  background-color: #757594;
}
</style>
