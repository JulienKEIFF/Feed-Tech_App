<template>
  <ion-page>
    <ion-content :fullscreen="true">
      
      <div id="top">
        <h1 id="username">{{username}}</h1>
        <h1 id="orga">WIP</h1>
        <div id="outer">
          <ion-icon :icon="personCircleOutline" />
        </div>
      </div>
     
      <div id="badge">
        <div class="badge">

        </div>

        <div class="badge">

        </div>
      </div>

      <div id="option-list">

        <h1>Mes paramètre</h1>
        <ion-list>
          <ion-item class="ion-activatable ripple-parent">
            <IonLabel>Se connecter / Voir mon profil (WIP)</IonLabel>
            <ion-ripple-effect></ion-ripple-effect>
          </ion-item>

          <ion-item class="ion-activatable ripple-parent" lines="none">
            <IonLabel>Mon organisation (WIP)</IonLabel>
            <ion-ripple-effect></ion-ripple-effect>
          </ion-item>

        </ion-list>

        <h1>Paramètre de contenu</h1>
        <ion-list>
          <ion-item class="ion-activatable ripple-parent" lines="none" @click="rssSource">
            <IonLabel>Source de RSS</IonLabel>
            <ion-ripple-effect></ion-ripple-effect>
          </ion-item>
        </ion-list>

        <h1>Paramètres graphique</h1>
        <ion-list>
          <ion-item lines="none">
            <IonLabel>Activer le mode sombre</IonLabel>
            <IonToggle />
          </ion-item>
        </ion-list>
      </div>
    
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonIcon, IonList, IonItem, IonLabel, IonToggle, IonRippleEffect } from '@ionic/vue';
import { modalController } from '@ionic/vue';
import { personCircleOutline } from 'ionicons/icons';

import rssModal from '../components/modals/sett-rssSrc.vue'

export default  {
  name: 'Tab4',
  components: { IonContent, IonPage, IonIcon, IonList, IonItem, IonLabel, IonToggle, IonRippleEffect },
  setup(){
    return{
      personCircleOutline
    }
  },
  data(){
    return{
      username: "Non conecté(e) - WIP"
    }
  },
  methods:{
    profile: function(){
      console.log();//TODO
    },
    orga: function(){
      console.log();//TODO
    },
    rssSource: async function(){
      const modal = await modalController
        .create({
          component: rssModal,
          componentProps: {
            title: 'Mes flux RSS'
          },
        })
      return modal.present();
    },
    darkTheme: function(){
      console.log();//TODO
    }
  }
}
</script>

<style scoped>
#top{
  position: relative;
  top: -2.8vh;
  width: 100%;
  height: 20vh;
  background: var(--ion-color-primary);
}
#username{
  position: relative;
  top: 2vh;
  text-align: center;
}
#orga{
  text-align: center;
}
#outer{
  height: 40vw;
  width: 40vw;
  margin: -1vh auto;
  border-radius: 50%;
  background: var(--ion-color-primary);
  border: var(--ion-color-primary) 1vh solid;
  overflow: hidden;
}
ion-icon{
  position: relative;
  left: -15%;
  top: -15%;
  height: 130%;
  width: 130%;
}

#option-list{
  margin-top: 12vh;
}
#option-list h1{
  margin-left: 2%;
  font-size: 1.5em;
}
</style>