<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/app/home">
          <ion-icon :icon="home" />
          <ion-label>{{ t("pages.home") }}</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="tab2" href="/app/groups">
          <ion-icon :icon="apps" />
          <ion-label>{{ t("pages.groups") }}</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/app/feeds">
          <ion-icon :icon="logoRss" />
          <ion-label>{{ t("pages.feeds") }}</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="tab4" href="/app/settings">
          <ion-icon :icon="settings" />
          <ion-label>{{ t("pages.settings") }}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { apps, settings, home, logoRss } from 'ionicons/icons';
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: 'TabsPage',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    const { t } = useI18n();
    return {
      apps, 
      settings, 
      home,
      logoRss,
      t
    }
  }
});
</script>
