<template>
  <ion-page>

    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>{{ displayRSS.title || appName}} </ion-title>
        <ion-button slot="end" shape="round" fill="clear" color="medium" @click="presentRss">
          <ion-icon :icon="ellipsisVerticalOutline"></ion-icon>
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-progress-bar type="indeterminate" v-if="loadingTime"></ion-progress-bar>

    <ion-content>
      <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
        <ion-refresher-content />
      </ion-refresher>
      <div v-for="(item, i) in displayRSS.items" :key="i">
        <g-card :rss="item" />
      </div>
    </ion-content>

  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonHeader, IonButton, IonTitle, IonToolbar, IonProgressBar, IonIcon, IonRefresher, IonRefresherContent, actionSheetController } from '@ionic/vue';
import { ellipsisVerticalOutline, checkmarkOutline } from 'ionicons/icons';
import { defineComponent } from 'vue';
import GCard from '../components/global/g_card.vue'

import { parseURL } from '../utils/rssParser';
import { rssLinks } from '../utils/rssLinks';

export default defineComponent({
  name: 'Home',
  setup() {
    return { ellipsisVerticalOutline, checkmarkOutline }
  },

  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonButton,
    IonTitle,
    IonToolbar,
    IonProgressBar,
    IonIcon,
    IonRefresher,
    IonRefresherContent,
    GCard
  },

  data(){
    return{
      appName: window.appName,
      loadingTime: false,
      rssLinks: [],
      displayRSS: {},
      selectedSource: "",
    }
  },

  methods: {
    refresh(ev: any) {
      parseURL(this.selectedSource)
        .then(res=>{
          this.displayRSS = res;
          this.loadingTime = false;
          if(ev !== null) ev.target.complete()
        })
    },

    async presentRss() {
      const button: any[] = [];
      for (let i = 0; i < rssLinks.length; i++) {
        const link = rssLinks[i];
        button.push({
          text: link.name,
          icon: this.selectedSource == link.link ? checkmarkOutline : "",
          handler: () => {
            this.loadingTime = true;
            this.selectedSource = link.link;
            this.refresh(null);
          },
        })
      }
      const actionSheet = await actionSheetController
        .create({
          header: 'Changer le flux RSS',
          buttons: button
        });
      return actionSheet.present();
    }
  },

});
</script>

<style scoped>
</style>