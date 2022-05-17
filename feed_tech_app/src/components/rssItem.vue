<template>
  <div id="container">
    <strong>{{ name }}</strong>
    <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RssItem } from '../global';

export default defineComponent({
  name: 'rssItem',
  props: {
    rssItem: Object
  }
});
</script>

<style scoped>
</style>
