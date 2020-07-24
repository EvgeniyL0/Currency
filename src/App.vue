<template>
  <div id="app">
    <toolbar v-bind:currency="current" v-bind:tabs="currencies" v-on:changeActiveTab="getRate"></toolbar>
    <p class="error-text" v-if="serverError">{{ serverErrorText }}</p>
    <tab v-bind:currency="current" v-bind:rates="Object.entries(rates)"></tab>
  </div>
</template>

<script>
import Tab from "./components/Tab.vue";
import Toolbar from "./components/Toolbar.vue";

export default {
  name: "App",
  components: {
    Tab,
    Toolbar,
  },
  data() {
    return {
      currencies: [],
      current: "",
      rates: {},
      serverError: false,
      serverErrorText: "",
    };
  },
  methods: {
    getRate(base) {
      this.serverError = false;
      this.serverErrorText = "";
      this.current = base;
      fetch(`https://api.openrates.io/latest?base=${base}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`${res.statusText}`);
        })
        .then((data) => {
          this.rates = data.rates;
        })
        .catch((err) => {
          this.serverError = true;
          this.serverErrorText = err;
        });
    },
  },
  created() {
    fetch("https://api.openrates.io/latest")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`${res.statusText}`);
      })
      .then((data) => {
        this.currencies = Object.keys(data.rates);
        this.currencies.unshift(data.base);
        this.current = data.base;
        this.rates = data.rates;
      })
      .catch((err) => {
        this.serverError = true;
        this.serverErrorText = err;
      });
  },
};
</script>

<style>
#app {
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
}

.error-text {
  font-family: "Roboto", sans-serif;
  font-size: 21px;
  line-height: 25px;
  color: #787878;
  text-align: center;
}
</style>
