<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
        <ion-button slot="end" fill="clear" @click="dismiss">Valider</ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h1>Flux RSS de base</h1>
      <ion-list>
        <ion-item class="ion-activatable ripple-parent" v-for="(item, i) in official" :key="i" >
          <IonLabel v-if="item.rsslink !== 'init'"> {{item.name}} </IonLabel>
          <ion-ripple-effect></ion-ripple-effect>
        </ion-item>
      </ion-list>

      <h1>Flux RSS personalisé</h1>
      <ion-list v-if="perso.length > 0">
        <ion-item class="ion-activatable ripple-parent" v-for="(item, i) in perso" :key="i">
          <IonLabel>Source de RSS</IonLabel>
          <ion-ripple-effect></ion-ripple-effect>
        </ion-item>
      </ion-list>

      <ion-button class="add">Ajouter un RSS personalisé</ion-button>

    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, modalController } from '@ionic/vue';
import { IonList, IonItem, IonLabel, IonRippleEffect } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Modal',
  components: { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonList, IonItem, IonLabel, IonRippleEffect },
  props: {
    title: { type: String, default: 'Modal' },
  },
  data() {
    return {
      official: [],
      perso: []
    }
  },
  methods:{
    dismiss: function(){
      modalController.dismiss();
    },
    loadOff: function(){
      this.$dexie.transaction('rw', this.$dexie.rssOff, async()=>{ //check if the rss table is empty
        this.official = await this.$dexie.rssOff.where("rsslink").notEqual('init').toArray();
      });
    },
    loadPerso: function(){
      this.$dexie.transaction('rw', this.$dexie.rssPerso, async()=>{ //check if the rss table is empty
        if ((await this.$dexie.rssPerso.where({rsslink: 'init'}).count()) > 0) {
          this.perso = await this.$dexie.rssPerso.toArray();
        }
      });
    },
    addRss: function(){
      console.log()
    },
    delRssOff: function(value){
      this.$dexie.transaction('rw', this.$dexie.rssOff, async()=>{
        await this.$dexie.rssOff.delete(value)
      });
    }
  },
  mounted: function(){
    this.loadOff();
    this.loadPerso();    
  }
});
</script>

<style scoped>
ion-button.add{
  margin-left: 50%;
  transform: translateX(-50%);
}
</style>