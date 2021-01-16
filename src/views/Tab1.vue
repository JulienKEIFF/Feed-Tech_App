<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Accueil</ion-title>
      </ion-toolbar>
      <ion-progress-bar type="indeterminate" v-if="loadingTime"></ion-progress-bar>
    </ion-header>
    <ion-content :fullscreen="true">
      
      <rssCard v-for="(item, i) in rssToDisplay" 
        :key="i"
        :title="item.title ? item.title[0] : 'Pas de Titre'" 
        :category="item.category ? item.category : []" 
        :description="item.description ? item.description[0] : 'Pas de description'"
        :pubDate="item.pubDate ? item.pubDate[0] : ''"
        from="test"
      />

    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonProgressBar } from '@ionic/vue';
import rssCard from '../components/rss/rssCard'

export default  {
  name: 'Accueil',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonProgressBar, rssCard },
  data(){
    return{
      loadingTime: true,
      rssToDisplay: [],
      rssSrcList: []
    }
  },
  methods: {
    getDataFromSrc: function(){
      this.loadingTime = true;
      for (let i = 0; i < this.rssSrcList.length; i++) {
        const link = this.rssSrcList[i];
        if (link.rsslink !== "init"){
          this.$http.get("https://cors-anywhere.herokuapp.com/" + link.rsslink)
          .then(res=>{
            this.$parseXML(res.data, (err, result)=>{
              this.getFirstElements(result.rss.channel[0].item);
            });
          });
        }
        this.loadingTime = false;
      }
    },
    getFirstElements: function(items){
      for (let i = 0; i < 5; i++) {
        const element = items[i];
        this.rssToDisplay.push(element)
      }
    }
  },
  mounted: function(){
    this.$dexie.transaction('r', this.$dexie.rssOff, async ()=>{
      this.rssSrcList = await this.$dexie.rssOff.toArray();
      this.rssSrcList = this.rssSrcList.slice(0)
      this.getDataFromSrc();
    });
  }
}
</script>