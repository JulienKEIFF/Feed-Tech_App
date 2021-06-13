<template>
  <ion-app>
    <ion-router-outlet />
    <tabs />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import tabs from './components/global/g_tabs.vue';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    tabs
  },
  mounted() {
    const localStore = localStorage;
    const colorScheme = localStore.getItem('color-scheme'); 
    if(colorScheme) colorScheme == 'dark' ? document.body.classList.add('dark') : ''
    else{
      localStore.setItem('color-scheme', 'light');
    }
  }
});
</script>