<template>
  <form class="results-form">
    <input type="text" class="results-form__input" v-model="factor">
    <div v-for="item in range" v-bind:key="item[0]">
      <p>{{ item[0] }}:{{ item[1] * factor}}</p>
    </div>
  </form>
</template>

<script>
export default {
  props: ["currency", "rate"],
  data() {
    return {
      factor: 1,
      startIndex: 0
    }
  },
  computed: {
    range() {
      return Object.entries(this.rate).slice(this.startIndex, 4);
    }
  }
};
</script>

<style>
.results-form {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 582px;
  font-family: 'Roboto', sans-serif;
}
</style>