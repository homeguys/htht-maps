<template id="123">
  <section id="mapBox-gl"></section>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import mapboxgl from 'mapbox-gl';

onMounted(() => {
  mapboxgl.accessToken = 'pk.eyJ1IjoibXItaG9uZXkiLCJhIjoiY2w2eG80NzdjMGc0eTNkbXlyZWNrcmxjNiJ9.ZXJMXjM_JUQc5b2W-FpoAw';
  const map = new mapboxgl.Map({
    container: 'mapBox-gl',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [0, 0],
    zoom: 0.6,
    projection: 'naturalEarth', // starting projection
  });
});
</script>
<style lang="less">
#mapBox-gl {
  width: 100%;
  height: 100%;
}
</style>
