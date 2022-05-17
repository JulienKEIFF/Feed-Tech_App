<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ t("pages.home") }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <ExploreContainer name="Tab 1 page" />
    </ion-content>
    
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { useI18n } from "vue-i18n";

export default  defineComponent({
  name: 'HomePage',
  setup() {
    const { t } = useI18n();
    return {
      t
    }
  },
  components: { ExploreContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
});
</script>
