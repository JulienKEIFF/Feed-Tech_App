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
      <div v-for="(item, i) in displayRSS.items" :key="i">
        <g-card :rss="item" />
      </div>
    </ion-content>

  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonHeader, IonButton, IonTitle, IonToolbar, IonProgressBar, IonIcon, actionSheetController } from '@ionic/vue';
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
            parseURL(link.link)
            .then(res=>{
              this.displayRSS = res;
              this.loadingTime = false;
              console.log(res)
            })
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