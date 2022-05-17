<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ t("pages.feeds") }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab feed</ion-title>
        </ion-toolbar>
      </ion-header>
      
    <ion-card v-for="(feed,i) in feeds" :key="i" @click="openModal(feed)">
      <ion-card-header>
        <ion-card-title>[{{feed.language.toUpperCase()}}] {{feed.rssDisplayName}}</ion-card-title>
      </ion-card-header>
    </ion-card>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { ellipsisVerticalOutline } from 'ionicons/icons';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, 
IonCardTitle, modalController } from '@ionic/vue';

import Feed from '../pages/Feed.vue';
import { useI18n } from "vue-i18n";
import axios from 'axios';

export default defineComponent({
  name: 'FeedPage',
  setup() {
    const { t } = useI18n();
    const feeds = ref([]);
    
    let currentPopover;

    onMounted(async () => {
      const {data} = await axios.get('http://localhost:3000/api/v1/feed/');
      feeds.value = data;      
    });

    const openModal = async (e: any) => {
      console.log(e);
      const modal = await modalController.create({
        component: Feed,
        componentProps: { 'feed': e },
        breakpoints: [0, 0.5, 1],
        initialBreakpoint: 0.5,
      });

      modal.present();
    };

    return {
      t,
      openModal,
      feeds,
      ellipsisVerticalOutline,
    }
  },
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCard, IonCardHeader, 
  IonCardTitle },
});
</script>
