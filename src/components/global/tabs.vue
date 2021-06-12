<template>
  <ion-page>
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/home">
          <ion-icon :icon="homeOutline" />
          <ion-label>Accueil</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/rss">
          <ion-icon :icon="logoRss" />
          <ion-label>Mes RSS</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="tab3" href="/fav">
          <ion-icon :icon="bookmarksOutline" />
          <ion-label>Mes articles</ion-label>
        </ion-tab-button>
        
     

        <ion-tab-button tab="tab4" href="/settings">
          <ion-icon :icon="settingsOutline" />
          <ion-label>Options</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from '@ionic/vue';
import { homeOutline, bookmarksOutline, logoRss, settingsOutline } from 'ionicons/icons';
export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      homeOutline, 
      bookmarksOutline, 
      logoRss,
      settingsOutline,
    }
  }
}
</script>