<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title style="margin-bottom: 2%">{{rss.title}}</ion-card-title>
      <ion-chip color="secondary" v-for="(cat, i) in rss.categories" :key="i" >{{cat}}</ion-chip>
    </ion-card-header>

    <ion-card-content v-html="rss.content" />

    <ion-card-content>
      <h3 class="read"><a :href="rss.guid">Lire l'article</a></h3>
      <h2 v-if="home">  {{ rss.creator }} </h2>
      <h2>  {{ formatDate(rss.pubDate)}} </h2>
      <ion-button @click="addToFav()" fill="clear"> <ion-icon :icon="bookmarkOutline" /> </ion-button> 
      <ion-button @click="null" fill="clear"> <ion-icon :icon="heartOutline" /> </ion-button>
      <ion-button @click="null" fill="clear"> <ion-icon :icon="shareSocialOutline" /> </ion-button>
    </ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { IonCard, IonCardHeader, IonCardTitle, IonChip, IonCardContent, IonButton ,IonIcon } from '@ionic/vue';
import { bookmarkOutline, heartOutline, shareSocialOutline } from 'ionicons/icons';

import { day, month } from '../../utils/date'

export default {
  name: "card",
  props: ['rss', 'home'],
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonChip,
    IonCardContent,
    IonButton,
    IonIcon,
  },
  setup(){
    return { bookmarkOutline, heartOutline, shareSocialOutline }
  },
  methods: {
    formatDate(pubDate: string){
      const dateArr = pubDate.split(' ')

      function getDay(dayString: string){
        const dayIndex = dayString.replace(',', '');
        const unknownKey = dayIndex as keyof Day;
        return day[unknownKey]
      }

      function getMonth(monthString: any) {
        const monthIndex = monthString.replace(',', '');
        const unknownKey = monthIndex as keyof Month;
        return month[unknownKey]
      }

      return `${getDay(dateArr[0])} ${dateArr[1]} ${getMonth(dateArr[2])} ${dateArr[3]} à ${dateArr[4]}`;
    },

    addToFav() {
      console.log('This card is to add to fav')
    }
  }
}
</script>

<style scoped>
.read{ margin: 2% 0; }
</style>