<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ t("pages.home") }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">

      <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <ion-card v-for="(item,i) in items" :key="i">
        <ion-card-header>
          <ion-card-title>{{item.title}}</ion-card-title>
        </ion-card-header>

        <ion-card-content v-html="item.content"> </ion-card-content>
      </ion-card>

    </ion-content>
    
  </ion-page>
</template>

<script lang="ts">
import axiosInstance from '../utils/axios';
import { defineComponent, ref, onMounted } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
IonRefresher, IonRefresherContent, onIonViewDidEnter } from '@ionic/vue';
import { useI18n } from "vue-i18n";

export default  defineComponent({
  name: 'HomePage',
  setup() {
    const { t } = useI18n();
    const items = ref([]);

    const refresh = async (event: any) => {
      const {data} = await axiosInstance.get('/api/v1/items/recent?limit=40');
      items.value = data;
      if (event != null) event.target.complete();
    }

    onMounted(async () => {
      refresh(null);
    });

    onIonViewDidEnter(() => {
      refresh(null);
    });

    return {
      t,
      refresh,
      items,
    }
  },
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonRefresher, IonRefresherContent }
});
</script>
