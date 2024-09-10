// import './assets/main.css'
// import '@/assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp} from 'vue'
import App from './App'
import router from "./router"
import { initializeApp } from "firebase/app";

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
// import DataTable from 'primevue/datatable'
// import Column from 'primevue/Column'

// export let isAuthenticated = ref(false);

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

// app.component('DataTable', DataTable)
// app.component('Column', Column)

const firebaseConfig = {
  apiKey: "AIzaSyAnjGrRMUeHro4NNKDqR1IbBzVkCSHWN4Y",
  authDomain: "week7-yiwei-48067.firebaseapp.com",
  projectId: "week7-yiwei-48067",
  storageBucket: "week7-yiwei-48067.appspot.com",
  messagingSenderId: "342743216861",
  appId: "1:342743216861:web:be62f31b7547a0aa5ba134"
};

// Initialize Firebase
initializeApp(firebaseConfig);

app.mount('#app')
