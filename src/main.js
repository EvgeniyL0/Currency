import './assets/normalize.css'
import Vue from 'vue'
import App from './App.vue'
import store from "./storage/index.js";

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
