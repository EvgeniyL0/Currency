<template>
  <div id="app">
    <toolbar v-bind:currency="current" v-bind:tabs="currencies" v-on:changeActiveTab="getRate"></toolbar>
    <tab v-bind:currency="current" v-bind:rate="rate"></tab>
  </div>
</template>

<script>
import Tab from "./components/Tab.vue";
import Toolbar from "./components/Toolbar.vue";

export default {
  name: "App",
  components: {
    Tab,
    Toolbar
  },
  data() {
    return {
      currencies: [],
      current: "",
      rate: {},
      serverError: ""
    };
  },
  methods: {
    getRate(base) {
      this.current = base;
      fetch(`https://api.openrates.io/latest?base=${base}`)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`${res.status} ${res.statusText}`);
        })
        .then(data => {
          this.rate = data.rates;
        })
        .catch(err => {
          this.serverError = err;
        });
    }
  },
  created() {
    fetch("https://api.openrates.io/latest")
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`${res.status} ${res.statusText}`);
      })
      .then(data => {
        this.currencies = Object.keys(data.rates);
        this.currencies.unshift(data.base);
        this.current = data.base;
        this.rate = data.rates;
      })
      .catch(err => {
        this.serverError = err;
      });
  }
};
</script>

<style>
#app {
  width: 720px;
  margin: auto;
}
</style>
