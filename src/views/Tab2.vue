<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Mes articles</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      
    <rssFavCard v-for="(item, i) in articleList" 
      :key="i" 
      :title="item.title ? item.title : 'Pas de Titre'" 
      :category="item.category ? item.category : []" 
      :description="item.description ? item.description : 'Pas de description'"
      :pubDate="item.pubDate ? item.pubDate : ''"
      v-on:reload="refresh"
    />

    </ion-content>
  </ion-page>
</template>

<script lang="js">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import rssFavCard from '../components/rss/rssFavCard'

export default  {
  name: 'Tab2',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, rssFavCard },
  data(){
    return{
      articleList:[]
    }
  },
  methods:{
    refresh: function(){
      this.$dexie.article.toArray()
      .then(data=> {this.articleList = data})
    }
  },
  mounted: function(){
    this.refresh();
  },
  watch: {
    $route() {
      this.$nextTick(this.refresh());
    }   
  },
}
</script>