<template>
  <ion-page>
    <ion-content>
      <ion-list lines="full" class="ion-no-margin">

        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input placeholder="john.doe@email.com" inputmode="email" type="email" v-model="email"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Mots de passe</ion-label>
          <ion-input placeholder="xxxxxx" type="password" v-model="password"></ion-input>
        </ion-item>

        <ion-item >
          <ion-button expand="block" color="success" @click="login">Valider</ion-button>
          <ion-button expand="block">Créer un compte</ion-button>
          <ion-button expand="block" color="danger" @click="close">Annuler</ion-button>
        </ion-item>

      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { IonPage, IonContent, IonList, IonLabel, IonInput, IonItem, IonButton, toastController, modalController } from '@ionic/vue';
import { useI18n } from "vue-i18n";
import axiosInstance from '../utils/axios';

export default defineComponent({
  name: 'LoginPage',
  setup(props, ctx) {
    const { t } = useI18n();
    const email = ref('');
    const password = ref('');

    const close = async () => {
      modalController.dismiss();
    }

    const login = async () => {
      const mail = email.value;
      const pass = password.value;

      try {
        const { data } = await axiosInstance.post('/api/v1/auth/login', {email: mail, password: pass});
      
        if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
        if (data.token) localStorage.setItem('token', data.token);

        close();
      } catch (err) {
        const toast = await toastController.create({
          message: 'Error when connecting (' + err + ')', 
          duration: 2000,
        });
        toast.present();
      }
    }

    

    return {
      t,
      login,
      close,
      email,
      password,
    }
  },
  components: { IonContent, IonPage, IonList, IonLabel, IonInput, IonItem, IonButton },
});
</script>

<style>
</style>