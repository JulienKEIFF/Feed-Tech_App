<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Mes RSS</ion-title>
        <ion-button slot="end" shape="round" fill="clear" color="medium" @click="presentRss">
          <ion-icon :icon="ellipsisVerticalOutline"></ion-icon>
        </ion-button>
      </ion-toolbar>
      <ion-progress-bar type="indeterminate" v-if="loadingTime"></ion-progress-bar>
    </ion-header>

    <ion-content>
      
      <h1>{{rssTitle[0]}}</h1>
      <h2>{{rssDescr[0]}}</h2>

      <card v-for="(item, i) in rssItems" 
        :key="i" 
        :title="item.title ? item.title[0] : 'Pas de Titre'" 
        :category="item.category ? item.category : []" 
        :description="item.description ? item.description[0] : 'Pas de description'"
        :pubDate="item.pubDate ? item.pubDate[0] : ''"
        :from="rssTitle[0]"
      /> 
     
    </ion-content>
  </ion-page>
</template>

<script lang="">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonProgressBar, actionSheetController } from '@ionic/vue';
import { ellipsisVerticalOutline, checkmarkOutline } from 'ionicons/icons';

import card from "../components/rss/rssCard" 

export default  {
  name: 'Tab3',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButton, IonIcon, IonProgressBar, card },
  setup() {
    return {
      ellipsisVerticalOutline,
      checkmarkOutline
    }
  },
  data(){
    return{
      rssLinkList: [],
      selectedSource: "",
      rssTitle: "",
      rssDescr: "",
      rssItems: [],
      rssToDisplay: [],
      favList: [],
      loadingTime: true
    }
  },
  methods:{
    getSource: function(link){
      this.loadingTime = true;
      this.$http.get("https://cors-anywhere.herokuapp.com/" + link)
      .then(res=>{
        this.$parseXML(res.data, (err, result)=>{
          this.sortRss(result.rss.channel[0]);
        })
      });
    },
    sortRss: async function(jsonRSS){
      this.rssItems = jsonRSS.item;
      this.rssTitle = jsonRSS.title;
      this.rssDescr = jsonRSS.description;      
      this.$nextTick(function () {
        this.loadingTime = false;
      })
    },
    presentRss: async function(){
      const button = [];
      for (let i = 0; i < this.rssLinkList.length; i++) {
        const el = this.rssLinkList[i];
        if(el.rsslink !== "init"){
          button.push({
            text: el.name,
            icon: this.selectedSource == el.rsslink ? checkmarkOutline : "",
            handler: () => {
              this.selectedSource = el.rsslink;
              this.getSource(el.rsslink)
            },
          })
        }
        
      }
      const actionSheet = await actionSheetController
        .create({
          header: 'Changer le flux RSS',
          buttons: button
        });
      return actionSheet.present();
    }
  },
  mounted: function(){
    this.$dexie.transaction('r', this.$dexie.rssOff, async ()=>{
      await this.$dexie.rssOff.toArray()
      .then(data => {
        this.rssLinkList = data;
        if(this.selectedSource === "" && this.rssLinkList.length > 0){
          this.selectedSource = this.rssLinkList[1].rsslink;
          this.getSource(this.selectedSource)
        }
      })
    });
  }
}
</script>

<style scoped>
h1{
  width: 94vw;
  margin: 0;
  margin-top: 5%;
  margin-left: 3%;
  font-size: 1.8em;
  font-weight: bolder;
}
h2{
  width: 94vw;
  margin: 0;
  margin-left: 3%;
  margin-bottom: 5%;
  font-size: 1em;
  font-style: italic;
}
</style>