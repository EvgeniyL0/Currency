<template>
  <form class="results-form">
    <input type="text" class="results-form__input" v-model="factor">
    <p v-for="item in Object.entries(rate)" v-bind:key="item[0]">{{ item[0] }}:{{ item[1] * factor}}</p>
  </form>
</template>

<script>
export default {
  props: ["currency", "rate"],
  data() {
    return {
      factor: 1
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
}
</style>