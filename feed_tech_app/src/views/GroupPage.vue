<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ t("pages.groups") }}</ion-title>
        <ion-button slot="end" fill="none"><ion-icon :icon="createOutline" /></ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 2</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ion-grid>
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

        </ion-row>
      </ion-grid>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { createOutline } from 'ionicons/icons';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCol, IonRow, IonGrid,
 IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon } from '@ionic/vue';
import { useI18n } from "vue-i18n";
import axiosInstance from '../utils/axios';

export default defineComponent({
  name: 'GroupPage',
  setup() {
    const { t } = useI18n();
    const groups = ref([]);

    onMounted(async () => {
      const {data} = await axiosInstance.get('/api/v1/user/62542206ceea926f83b509ce/group');
      groups.value = data;
    });

    return {
      t,
      groups,
      createOutline,
    }
  },
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCol, IonRow, IonGrid,
   IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon }
});
</script>
