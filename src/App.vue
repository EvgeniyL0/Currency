<template>
  <div id="app">
    <toolbar
      v-bind:currency="current"
      v-bind:tabs="currencies"
      v-bind:block="waitingForResponse"
      v-on:changeActiveTab="getCurrencyRate"
    ></toolbar>
    <p class="error-text" v-if="serverError">{{ serverErrorText }}</p>
    <tab v-bind:currency="current" v-bind:cards="Object.entries(rate)"></tab>
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
      serverError: false,
      serverErrorText: "",
      waitingForResponse: false
    };
  },
  methods: {
    getCurrencyRate(base) {
      const newRate = this.$store.getters.getRate(base);

      this.current = base;
      if (newRate === undefined) {
        this.serverError = false;
        this.serverErrorText = "";
        this.waitingForResponse = true;
        this.$store
          .dispatch("requestRate", base)
          .then(data => {
            this.rate = data.rates;
            this.waitingForResponse = false;
          })
          .catch(err => {
            this.serverError = true;
            this.serverErrorText = err;
            this.waitingForResponse = false;
          });
      } else {
        Object.assign(this.rate, newRate.rates);
      }
    }
  },
  async created() {
    await this.$store
      .dispatch("requestRate", "EUR")
      .then(data => {
        this.currencies = Object.keys(data.rates);
        this.currencies.unshift(data.base);
        this.current = data.base;
        this.rate = data.rates;
      })
      .catch(err => {
        this.serverError = true;
        this.serverErrorText = err;
      });
  }
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
