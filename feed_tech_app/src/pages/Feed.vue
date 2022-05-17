<template>
  <ion-page v-if="loading">
    <ion-progress-bar type="indeterminate"></ion-progress-bar>
  </ion-page>

  <ion-page v-else>
    <ion-content>
        <ion-card v-for="(feed,i) in feeds" :key="i">
        <ion-card-header>
            <ion-card-title>{{feed.title}}</ion-card-title>
        </ion-card-header>

        <ion-card-content v-html="feed.content"> </ion-card-content>
        </ion-card>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { RssFeed } from '../global';

import { defineComponent, ref, onMounted } from 'vue';
import { IonPage, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonProgressBar } from '@ionic/vue';
import { useI18n } from "vue-i18n";
import axios from 'axios';

export default defineComponent({
  name: 'FeedPage',
  props: {
    feed: Object,
  },
  setup(props) {
    const { t } = useI18n();
    const feeds = ref([]);
    let loading = ref(true);

    onMounted(async () => {
      const feed = props['feed'];
      const {data} = await axios.get('http://localhost:3000/api/v1/feed/' + feed._id);
      feeds.value = data;
      loading.value = false;
    });

    return {
      t,
      feeds,
      loading,
    }
  },
  components: { IonContent, IonPage, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonProgressBar },
});
</script>

<style>

</style>