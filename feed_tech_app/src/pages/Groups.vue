<template>
  <ion-page v-if="loading">
    <ion-progress-bar type="indeterminate"></ion-progress-bar>
  </ion-page>

  <ion-page v-else>
    <ion-content>
      <ion-card v-for="(group, i) in groups" :key="i">
        <ion-card-header>
          <ion-card-title>{{ group.name }}</ion-card-title>
        </ion-card-header>

        <ion-card-content>{{group.description}}</ion-card-content>
      </ion-card>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { RssGroup } from '../global';

import { defineComponent, ref, onMounted } from 'vue';
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonProgressBar } from '@ionic/vue';
import { useI18n } from "vue-i18n";
import axiosInstance from '../utils/axios';

export default defineComponent({
  name: 'GroupPage',
  setup() {
    const { t } = useI18n();
    const groups = ref([]);
    let loading = ref(true);

    onMounted(async () => {
      const { data } = await axiosInstance.get('/api/v1/group');
      groups.value = data;
      loading.value = false;
    });

    return {
      t,
      groups,
      loading,
    }
  },
  components: { IonContent, IonPage, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonProgressBar },
});
</script>

<style>
</style>