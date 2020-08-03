import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
      rates: []      
    },
    getters: {
      getRate: state => currency => {
        return state.rates.find(item => item.base === currency);
      }
    },
    mutations: {
      addRate(state, payload) {
        state.rates.push(payload);
      }
    },
    actions: {
      requestRate(context, baseCurrency) {
        return fetch(`https://api.openrates.io/latest?base=${baseCurrency}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`${res.statusText}`);
        })
        .then((data) => {
          context.commit('addRate', data);
          return data;
        })
      }
    }
});