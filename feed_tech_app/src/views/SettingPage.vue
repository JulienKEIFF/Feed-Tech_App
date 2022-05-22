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
          <ion-list-header> Informations personnels </ion-list-header>

          <ion-item @click="login()" v-if="!haveUserConnected">
            <ion-label>
              {{ t("settings.login") }}
            </ion-label>
          </ion-item>

          <ion-item v-else>
            Compte connecté: {{username}}
            <ion-button slot="end" color="danger" @click="disconnect"><ion-icon :icon="logOutOutline" /></ion-button>
          </ion-item>

        </ion-list>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import Login from '../pages/Login.vue';
import { defineComponent, onMounted, ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonListHeader,
IonLabel, IonList, IonItem, IonIcon, IonButton, modalController } from '@ionic/vue';
import { logOutOutline } from 'ionicons/icons'
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: 'SettingPage',
  setup() {
    const { t } = useI18n();
    const haveUserConnected = ref(false);
    const username = ref('');

    const reloadUser = async () => {
      if (localStorage.getItem('token') && localStorage.getItem('user')) {
        const user = localStorage.getItem('user');
        if (user) username.value = JSON.parse(user).username;
        haveUserConnected.value = true;
      } else {
         haveUserConnected.value = false;
      }
    }

    onMounted(() => {
      reloadUser();
    })

    const login = async () => {
      const modal = await modalController.create({
        component: Login,
        breakpoints: [0, 1],
        initialBreakpoint: 1,
      });

      modal.onDidDismiss().then(reloadUser);
      modal.present();
    }

     const disconnect = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      reloadUser();
    }


    return {
      t,
      login,
      disconnect,

      username,
      haveUserConnected,

      logOutOutline,
    }
  },
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonLabel, IonList, IonListHeader, IonItem, IonButton, IonIcon }
});
</script>
