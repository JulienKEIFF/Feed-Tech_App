<template>
  <ion-page>

    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>{{appName}}</ion-title>
        <ion-button slot="end" shape="round" fill="clear" color="medium">
          <ion-icon :icon="refreshOutline"></ion-icon>
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-progress-bar type="indeterminate" v-if="loading"></ion-progress-bar>

    <ion-content>
      <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
        <ion-refresher-content />
      </ion-refresher>
      <ion-title style="margin: 2% 0; font-size:1.7rem">Les derniers articles</ion-title>
      <div v-for="(rss, i) in rssToDisplay" :key="i"> <g-card :rss="rss" :home="true" /> </div>
    </ion-content>

  </ion-page>
</template>

<script lang="js">
import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon, IonProgressBar, IonRefresher, IonRefresherContent } from '@ionic/vue';
import { refreshOutline } from 'ionicons/icons';
import { defineComponent, reactive, ref } from 'vue';

import GCard from '../components/global/g_card.vue'

import { getNewFeed } from '../utils/rssParser';

export default defineComponent({
  name: 'Home',
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    IonProgressBar,
    IonRefresher,
    IonRefresherContent,
    GCard
  },
  setup(){
    return{ appName: window.appName, refreshOutline }
  },
  data(){
    return {
      loading: true,
      rssToDisplay: [],
    }
  }, 

  methods:{
    refresh(ev) {
      getNewFeed(40)
      .then(res => {
        this.rssToDisplay = res;
        this.loading = false;
        ev.target.complete()
        console.log(this.rssToDisplay)
      })
    }
  },

  mounted() {
    this.refresh()
  }
});
</script>

<style scoped>
</style>