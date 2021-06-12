<template>
  <ion-app>
    <ion-router-outlet />
    <tabs />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import tabs from './components/global/tabs.vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    tabs
  }
});
</script>