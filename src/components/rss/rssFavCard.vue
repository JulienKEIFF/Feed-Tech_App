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
    <ion-button fill="clear" @click="removeFav">
      <ion-icon :icon="close" />
    </ion-button>
    <ion-button fill="clear">
      <ion-icon :icon="shareSocialOutline" />
    </ion-button>
  </ion-card>
</template>

<script>
import { IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonBadge, IonButton, IonIcon } from '@ionic/vue';
import { close, shareSocialOutline } from 'ionicons/icons';
export default {
  name: "rssFavCard",
  props: ['title', 'category', 'description', 'pubDate', 'from'],
  components: { IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonBadge, IonButton, IonIcon },
  setup() {
    return { close, shareSocialOutline }
  },
  data(){
    return{
      
    }
  },
  methods:{
    removeFav: async function(){
      await this.$dexie.article.where({title: this.title}).toArray()
      .then(async data=>{
        await this.$dexie.article.delete(data[0].id);
        this.$emit('reload')
      });
    }
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