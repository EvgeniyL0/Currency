<template>
  <div class="toolbar">
    <p class="toolbar__title">Курс {{ currency }} на сегодня</p>
    <button
      type="button"
      class="toolbar__button toolbar__button_slide toolbar__button_slide_right"
      v-on:click="leftShift = leftShift + 90"
      v-bind:disabled="leftShift == 45"
    >R</button>
    <div class="toolbar__tabs" v-bind:style="{ left: leftShift + 'px' }">
      <button
        type="button"
        class="toolbar__button toolbar__button_tab"
        v-bind:class="{ 'toolbar__button_tab_active':(item === currency) }"
        v-for="item in tabs"
        v-bind:key="item"
        v-on:click="$emit('changeActiveTab', item)"
      >{{ item }}</button>
    </div>
    <button
      type="button"
      class="toolbar__button toolbar__button_slide toolbar__button_slide_left"
      v-on:click="leftShift = leftShift - 90"
      v-bind:disabled="leftShift == maxLeftShift"
    >L</button>
  </div>
</template>

<script>
export default {
  props: ["currency", "tabs"],
  data() {
    return {
      leftShift: 45
    };
  },
  computed: {
    maxLeftShift() {
      if (document.documentElement.clientWidth < 720) {
        return (
          document.documentElement.clientWidth - 45 - this.tabs.length * 90
        );
      } else {
        return 675 - this.tabs.length * 90;
      }
    }
  }
};
</script>

<style>
.toolbar {
  position: relative;
  box-sizing: border-box;
  height: 111px;
  padding-top: 30px;
  background-color: #ffe782;
  overflow: hidden;
  font-family: 'Roboto', sans-serif;
}

.toolbar__title {
  margin-left: 24px;
  margin-top: 0;
  margin-bottom: 8px;
}

.toolbar__tabs {
  position: absolute;
  top: 63px;
  width: 630px;
  height: 48px;
  display: flex;
  flex-wrap: nowrap;
}

.toolbar__button {
  height: 48px;
  cursor: pointer;
  background-color: #ffe782;
  color: black;
  border: none;
  font-family: 'Roboto', sans-serif;
}

.toolbar__button_tab {
  width: 90px;
  flex-shrink: 0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.toolbar__button_tab_active {
  background-color: white;
}

.toolbar__button_slide {
  position: absolute;
  top: 63px;
  width: 45px;
  z-index: 1;
}

.toolbar__button_slide_left {
  right: 0;
  background-image: url();
}

.toolbar__button_slide_right {
  left: 0;
  background-image: url();
}
</style>