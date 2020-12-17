<template>
  <div class="results">
    <input type="text" class="results__input" v-model="factor" />
    <span>{{ currency }}</span>
    <div class="results__cards-container">
      <div class="card" v-for="item in range" v-bind:key="item[0]">
        <p class="card__title">
          <span>{{ factor }}&ensp;</span>
          <span>{{ currency }} =</span>
        </p>
        <p class="card__text">
          <span>{{ (item[1] * factor).toFixed(2) }}&ensp;</span>
          <span>{{ item[0] }}</span>
        </p>
      </div>
    </div>
    <div class="results__paginator">
      <button
        class="results__button results__button_back"
        type="button"
        v-on:click="goBack"
        v-bind:disabled="startIndex == 0"
      >
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="#282828"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.40991 10.58L2.82991 6L7.40991 1.41L5.99991 0L-8.7738e-05 6L5.99991 12L7.40991 10.58Z"
          />
        </svg>
        назад
      </button>
      <button
        class="results__button results__button_forward"
        type="button"
        v-on:click="goForward"
        v-bind:disabled="endIndex >= cards.length"
      >
        далее
        <svg
          width="8"
          height="12"
          viewBox="0 0 8 12"
          fill="#282828"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.590088 10.58L5.17009 6L0.590088 1.41L2.00009 0L8.00009 6L2.00009 12L0.590088 10.58Z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["currency", "cards"],
  data() {
    return {
      factor: 1,
      startIndex: 0,
      endIndex: 4,
      numberOfCards: 4
    };
  },
  computed: {
    range() {
      return this.cards.slice(this.startIndex, this.endIndex);
    }
  },
  watch: {
    currency: function() {
      this.startIndex = 0;
      this.endIndex = 4;
    }
  },
  methods: {
    goForward() {
      this.startIndex += this.numberOfCards;
      this.endIndex += this.numberOfCards;
    },
    goBack() {
      this.startIndex -= this.numberOfCards;
      this.endIndex -= this.numberOfCards;
    }
  }
};
</script>

<style>
.results {
  box-sizing: border-box;
  position: relative;
  padding: 24px;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  text-align: end;
}

.results__input {
  width: 121px;
  height: 26px;
  margin-right: 9px;
  margin-bottom: 23px;
  border: none;
  border-bottom: 1px solid #d9d9d9;
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  line-height: 21px;
  text-align: end;
}

.results__input + span {
  font-size: 18px;
  line-height: 21px;
  color: #b9b9b9;
}

.results__button {
  width: 112px;
  height: 34px;
  background-color: white;
  box-shadow: 0px 5px 6px rgba(157, 157, 157, 0.16);
  border: none;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.results__button:last-of-type {
  margin-left: 19px;
}

.results__button:disabled {
  background-color: #efefef;
  color: #787878;
}

.results__button:disabled > svg {
  fill: #787878;
}

.results__button_back {
  padding-right: 25px;
  text-align: right;
}

.results__button_forward {
  padding-left: 25px;
  text-align: left;
}

.results__cards-container {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(274px, 327px));
  gap: 18px;
}

.results__paginator {
  width: 100%;
  margin-top: 41px;
  margin-bottom: 0;
  text-align: center;
}

.card {
  height: 138px;
  padding-left: 30px;
  padding-top: 18px;
  box-shadow: 0px 3px 6px rgba(157, 157, 157, 0.16);
  border-radius: 12px;
  text-align: start;
  overflow: hidden;
}

.card__title {
  margin-top: 0;
  margin-bottom: 19px;
  font-size: 24px;
  line-height: 28px;
}

.card__title > span:last-of-type {
  color: #787878;
}

.card__text {
  margin: 0;
  font-size: 48px;
  line-height: 56px;
}

.card__text > span:last-of-type {
  font-size: 24px;
  line-height: 28px;
}

@media screen and (max-width: 720px) {
  .card__title {
    font-size: 18px;
    line-height: 21px;
    margin-bottom: 33px;
  }

  .card__text {
    font-size: 36px;
    line-height: 42px;
  }
}
</style>