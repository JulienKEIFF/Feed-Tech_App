<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ t("pages.groups") }}</ion-title>
        <ion-button slot="end" fill="none"><ion-icon :icon="createOutline" /></ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

      <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      
      <ion-grid v-if="showGroups">
        <ion-row>
          <ion-col v-for="(group, i) in groups" :key="i" size="6">
            <ion-card style="height: 33vh">
              <ion-card-header>
                <ion-card-title>{{group?.name}}</ion-card-title>
              </ion-card-header>

              <ion-card-content>
                {{group?.description}}
              </ion-card-content>
            </ion-card>
          </ion-col>

          <ion-col size="6">
            <ion-card style="height: 33vh" @click="openGroups">
              <ion-card-content style="font-size: 20vw; display: flex; align-items: center; justify-content: center; height: 33vh">
                <ion-icon :icon="addOutline" />
              </ion-card-content>
            </ion-card>
          </ion-col>

        </ion-row>
      </ion-grid>

      <ion-card v-else>
        <ion-card-header>
          <ion-card-title>Utilisateur Anonyme</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          Créer un compte ou connectez-vous pour profiter de la fonction des groupes
        </ion-card-content>
      </ion-card>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { createOutline, addOutline } from 'ionicons/icons';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCol, IonRow, IonGrid,
 IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, modalController,
 IonRefresher, IonRefresherContent, onIonViewDidEnter } from '@ionic/vue';
import { useI18n } from "vue-i18n";

import axiosInstance from '../utils/axios';
import { isConnected, getUser } from '../utils/user';
import Group from '../pages/Groups.vue';

export default defineComponent({
  name: 'GroupPage',
  setup() {
    const { t } = useI18n();
    const groups = ref([]);
    const showGroups = ref(false);

    

    const refresh = async (event: any) => {
      if (isConnected()) {
        const userId = getUser()._id;
        const {data} = await axiosInstance.get('/api/v1/user/' + userId + '/group');
        groups.value = data;
        showGroups.value = true;
      } else showGroups.value = false;
      if (event != null) event.target.complete();
    }

    onMounted(async () => {
      refresh(null);
    });

    const openGroups = async (e: any) => {
       const modal = await modalController.create({
        component: Group,
        breakpoints: [0, 0.5, 1],
        initialBreakpoint: 0.5,
      });

      modal.present();
    }

    onIonViewDidEnter(() => {
      refresh(null);
    });

    return {
      t,
      refresh,
      openGroups,
      
      groups,
      showGroups,

      createOutline,
      addOutline,
    }
  },
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCol, IonRow, IonGrid,
   IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, IonRefresher, IonRefresherContent }
});
</script>
