<template>
  <ion-page>

    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>{{ appName}} </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-progress-bar type="indeterminate" v-if="loadingTime"></ion-progress-bar>

    <ion-content>
    </ion-content>

  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonProgressBar } from '@ionic/vue';
import { checkmarkOutline } from 'ionicons/icons';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  setup() {
    return { checkmarkOutline }
  },

  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonProgressBar,
  },

  data(){
    return{
      appName: window.appName,
      loadingTime: false,
    }
  },

  methods: {
    
  },

});
</script>

<style scoped>

</style>