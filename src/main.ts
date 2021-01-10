import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import axios from 'axios'
import VueAxios from 'vue-axios'

import { IonicVue } from '@ionic/vue';
import { Dexie } from 'dexie'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

const parseString = require('xml2js').parseString;

interface User {
  id?: number;
  username?: string;
  organisation?: string;
}

interface Rss {
  id?: number;
  rsslink?: string;
  name?: string;
}

interface Article {
  id?: number;
  from?: string;
  title?: string;
  category?: Array<string>;
  description?: string;
  pubDate?: string;
}

class FeedTechDB extends Dexie {
  public user: Dexie.Table<User, number>; // id is number in this case
  public rssOff: Dexie.Table<Rss, number>; // id is number in this case
  public rssPerso: Dexie.Table<Rss, number>; // id is number in this case
  public article: Dexie.Table<Article, number>; // id is number in this case

  public constructor() {
      super("FeedTechDB");
      this.version(1).stores({
          user: "++id,username,organisation",
          rssOff: "++id,rsslink,name",
          rssPerso: "++id,rsslink,name",
          article: "++id,from,title,category,description,pubDate"
      });
      this.user = this.table("user");
      this.rssOff = this.table("rssOff");
      this.rssPerso = this.table("rssPerso");
      this.article = this.table("article");
  }
}

const db = new FeedTechDB();

function initApp(){
  const app = createApp(App)
    .use(VueAxios, axios)
    .use(IonicVue)
    .use(router);

  app.config.globalProperties.$parseXML = parseString;
  app.config.globalProperties.$dexie = db;
  
  router.isReady().then(() => {
    app.mount('#app');
  });
  
}



db.transaction('rw', db.rssOff, async()=>{ //check if the rss table is empty
  if ((await db.rssOff.where({rsslink: 'init'}).count()) === 0) {
    await db.rssOff.add({rsslink: "init"});
    await db.rssOff.add({rsslink: "https://www.jesuisundev.com/feed/", name: "Je suis un dev"}); //FR
    await db.rssOff.add({rsslink: "https://news.humancoders.com/items/feed.rss", name: "Human Coders - News"}); //FR
    await db.rssOff.add({rsslink: "https://blog.humancoders.com/feed/", name: "Human Coders - Blog"}); //FR
    await db.rssOff.add({rsslink: "https://www.journalduhacker.net/rss", name: "Journal du hacker"}); //FR
    await db.rssOff.add({rsslink: "https://www.lalutineduweb.fr/blog/feed/", name: "La lutine du web"}); //FR
    await db.rssOff.add({rsslink: "https://putaindecode.io/api/articles/feeds/desc/feed.xml", name: "Putain de code"}); //FR
    await db.rssOff.add({rsslink: "http://www.planete-php.fr/rss.php", name: "Planete PHP Fr"}); //FR
    await db.rssOff.add({rsslink: "https://css-tricks.com/feed/", name: "CSS Trick"}); //EN
    await db.rssOff.add({rsslink: "https://hacks.mozilla.org/feed/", name: "Hack Mozilla"}); //EN
    await db.rssOff.add({rsslink: "https://developers.google.com/web/updates/atom.xml", name: "Google Web Update"}); //EN
    await db.rssOff.add({rsslink: "http://reactjs.org/feed.xml", name: "React"}); //EN
    await db.rssOff.add({rsslink: "https://bitsofco.de/rss/", name: "BitsofCode"}); //EN
  }
})
.then(()=>{
  initApp();
});