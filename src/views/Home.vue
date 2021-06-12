<template>
  <ion-page>

    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>{{appName}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-progress-bar type="indeterminate" v-if="loadingTime"></ion-progress-bar>

    <ion-content>
      <h1>Main Content</h1>
    </ion-content>

  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonProgressBar } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonProgressBar
  },
  data(){
    return{
      appName: window.appName,
      loadingTime: true,
    }
  }
  
});
</script>

<style scoped>
</style>