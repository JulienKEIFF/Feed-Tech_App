<template>
  <ion-app>
    <title-bar />

    <ion-router-outlet />

  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import titleBar from './components/global/titleBar.vue'

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    titleBar
  }
});
</script>