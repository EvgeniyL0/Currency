<template>
  <div id="app">
    <div class="toolbar">
      <p class="toolbar__title">Курс {{ current }} на сегодня</p>
      <button type="button" class="toolbar__button toolbar__button_slide toolbar__button_slide_left">L</button>
      <div class="toolbar__tabs">
        <button
          type="button"
          class="toolbar__button toolbar__button_tab"
          v-bind:class="{ 'toolbar__button_tab_active':(item === current) }"
          v-for="item in currencies"
          v-bind:key="item"
          v-on:click="getRate(item)"
        >{{ item }}</button>
      </div>
      <button type="button" class="toolbar__button toolbar__button_slide toolbar__button_slide_right">R</button>
    </div>
    <tab v-bind:currency="current" v-bind:rate="rate"></tab>
  </div>
</template>

<script>
import Tab from "./components/Tab.vue";

export default {
  name: "App",
  components: {
    Tab
  },
  data() {
    return {
      currencies: [],
      current: "",
      rate: {},
      numberOfTabs: 7,
      serverError: ""
    };
  },
  methods: {
    getRate(currency) {
      this.current = currency;
      fetch(`https://api.openrates.io/latest?base=${currency}`)
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

.toolbar {
  box-sizing: border-box;
  height: 111px;
  padding-top: 30px;
  background-color: #ffe782;
}

.toolbar__title {
  margin-left: 24px;
  margin-top: 0;
  margin-bottom: 8px;
}

.toolbar__tabs {
  width: 630px;
  height: 48px;
  display: inline-block;
  overflow: hidden;
}

.toolbar__button {
  cursor: pointer;
  color: black;
  border: none;
}

.toolbar__button_tab {
  width: 90px;
  height: 48px;
  background-color: #ffe782;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.toolbar__button_tab_active {
  background-color: white;
}

.toolbar__button_slide {
  width: 45px;
}

.toolbar__button_slide_left {
  background-image: url();
}

.toolbar__button_slide_right {
  background-image: url();
}

</style>
