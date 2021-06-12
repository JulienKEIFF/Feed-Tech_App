<template>
  <ion-header :translucent="true">
    <ion-toolbar>
      <ion-title>{{appName}}</ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script>
import { IonHeader, IonTitle, IonToolbar } from '@ionic/vue';

export default {
  name: 'title-bar',
  components: {
    IonHeader,
    IonTitle,
    IonToolbar
  },
  data(){
    return{
      appName: window.appName
    }
  }
}
</script>

<style>

</style>