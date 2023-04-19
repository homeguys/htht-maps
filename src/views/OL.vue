<template>
  <section class="olMap">
    <BaseMap :params="{ init: true }" />
  </section>
</template>

<script>
import BaseMap from '@/components/BaseMap/index.vue';

export default {
  name: 'OL',
  components: { BaseMap },
};
</script>
<style lang="less">
.olMap {
  width: 100%;
  height: 300px;
}
</style>
