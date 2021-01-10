<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{title}}</ion-card-title>
      <div class="cat" style="display: flex" >
        <ion-badge class="cat-item" v-for="(cat, i) in category" :key="i" >{{cat}}</ion-badge>
      </div>
    </ion-card-header>

    <ion-card-content v-if="typeof description !== 'undefined'">
      <div v-html="description" ></div>
    </ion-card-content>

    <ion-card-content>{{pubDate}}</ion-card-content>
    <ion-button fill="clear" @click="checkFav">
      <ion-icon :icon="iconBookmark" />
    </ion-button>
    <ion-button fill="clear" @click="logFav">
      <ion-icon :icon="shareSocialOutline" ref="iconBookMark" />
    </ion-button>
  </ion-card>
</template>

<script>
import { IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonBadge, IonButton, IonIcon } from '@ionic/vue';
import { bookmarkOutline, bookmarksOutline, shareSocialOutline } from 'ionicons/icons';
export default {
  name: "rssCard",
  props: ['title', 'category', 'description', 'pubDate', 'from'],
  components: { IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonBadge, IonButton, IonIcon },
  setup() {
    return { bookmarkOutline, bookmarksOutline, shareSocialOutline }
  },
  data(){
    return{
      iconBookmark: bookmarkOutline
      }
  },
  methods:{
    checkFav: function(){
      this.$dexie.article.where({title: this.title}).count()
      .then(async(data)=>{
        if(data == 0){ //Si pas d'entrée
          await this.$dexie.article.add({
            from: this.from,
            title: this.title,
            category: this.category,
            description: this.description,
            pubDate: this.pubDate,
          })
          this.iconBookmark = bookmarksOutline;
        }else{ //Sinon
          await this.$dexie.article.where({title: this.title}).toArray()
          .then(async data=>{
            await this.$dexie.article.delete(data[0].id)
            this.iconBookmark = bookmarkOutline;
          })
        }
      })
    },
    logFav: function(){
      console.log(this.iconBookmark)
    },
    initFav: async function(){
      this.$dexie.transaction('r', this.$dexie.article, async()=>{
        await this.$dexie.article.where({title: this.title}).toArray()
        .then(async data=>{
          if(data.length !== 0) this.iconBookmark = bookmarksOutline;
          else this.iconBookmark = bookmarkOutline
        })
        .catch(err=>{console.error(err)})
      })
      .then(data=>console.log('ok'))
      .catch(err=>console.error(err))
    }
  },
  updated: function(){
    this.initFav()
  },
  mounted: function(){
    this.initFav()
  }
}
</script>

<style scoped>
.cat{
  margin-top: 3%;
  display: flex;
  flex-wrap: wrap;
  gap: 3%;
}
.cat-item{
  margin-bottom: 2%;
}
</style>