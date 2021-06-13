<template>
  <ion-page>

    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>{{appName}}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-item lines="full">
          <ion-icon slot="start" :name="moonOutline"></ion-icon>
          <ion-label>
            Toggle Dark Theme
          </ion-label>
          <ion-toggle id="themeToggle" slot="end" :checked="color == 'dark' ? 'true' : 'false'" @ionChange="toggleDarkTheme"></ion-toggle>
        </ion-item>
      </ion-list>
    </ion-content>

  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonList, IonIcon, IonLabel, IonToggle } from '@ionic/vue';
import { moonOutline } from 'ionicons/icons';

export default {
  name: "setting",
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar, 
    IonItem,
    IonList, 
    IonIcon, 
    IonLabel, 
    IonToggle
  },
  setup(){
    return{ appName: window.appName, moonOutline, color: 'light' }
  },
  methods: {
    toggleDarkTheme(ev) {
      const localStore = localStorage;
      const toggle = document.querySelector('#themeToggle');
      document.body.classList.toggle('dark', ev.detail.checked);

      if(document.body.classList.contains('dark')) localStore.setItem('color-scheme', 'dark');
      else localStore.setItem('color-scheme', 'light');
    }
  },
  mounted() {
    const localStore = localStorage;
    this.color = localStore.getItem('color-scheme');
    console.log(this.color)
  }
}
</script>

<style>

</style>