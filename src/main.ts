import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

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

const app = createApp(App)
  .use(IonicVue)
  .use(router);
  
router.isReady().then(() => {
  app.mount('#app');
});

window.appName = "Feed Tech";

declare global {
  interface Window { appName: string }
  interface Day {
    "Mon": string;
    "Tue": string;
    "Wed": string;
    "Thu": string;
    "Fri": string;
    "Sat": string;
    "Sun": string;
  }
  interface Month {
    "Jan": string;
    "Feb": string;
    "Mar": string;
    "Apr": string;
    "May": string;
    "Jun": string;
    "Jul": string;
    "Aug": string;
    "Sep": string;
    "Oct": string;
    "Nov": string;
    "Dec": string;
  }
}