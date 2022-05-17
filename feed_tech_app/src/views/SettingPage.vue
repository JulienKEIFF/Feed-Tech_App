<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ t("pages.settings") }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab Setting</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ion-list>
          <ion-list-header> Recent Conversations </ion-list-header>

          <ion-item>
            <ion-label>
              {{ t("settings.login") }}
            </ion-label>
          </ion-item>

        </ion-list>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonListHeader,
IonLabel, IonList, IonItem } from '@ionic/vue';
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: 'SettingPage',
  setup() {
    const { t } = useI18n();
    return {
      t
    }
  },
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonLabel, IonList, IonListHeader, IonItem }
});
</script>
