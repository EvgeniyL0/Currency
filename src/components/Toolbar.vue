<template>
  <div class="toolbar">
    <p class="toolbar__title">Курс {{ currency }} сегодня</p>
    <button
      type="button"
      class="toolbar__button toolbar__button_slide toolbar__button_slide_back"
      v-on:click="shift += shiftStep"
      v-bind:disabled="shift == 45"
    >
      <svg
        width="8"
        height="12"
        viewBox="0 0 8 12"
        fill="#CCAE68"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.40991 10.58L2.82991 6L7.40991 1.41L5.99991 0L-8.7738e-05 6L5.99991 12L7.40991 10.58Z"
        />
      </svg>
    </button>
    <div class="toolbar__tabs" v-bind:style="{ left: shift + 'px' }">
      <button
        type="button"
        class="toolbar__button toolbar__button_tab"
        v-bind:class="{ 'toolbar__button_tab_active':(item === currency) }"
        v-for="item in tabs"
        v-bind:key="item"
        v-on:click="$emit('changeActiveTab', item)"
        v-bind:disabled="block"
      >{{ item }}</button>
    </div>
    <button
      type="button"
      class="toolbar__button toolbar__button_slide toolbar__button_slide_forward"
      v-on:click="shift -= shiftStep"
      v-bind:disabled="Math.abs(shift) >= maxshift"
    >
      <svg
        width="8"
        height="12"
        viewBox="0 0 8 12"
        fill="#CCAE68"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.590088 10.58L5.17009 6L0.590088 1.41L2.00009 0L8.00009 6L2.00009 12L0.590088 10.58Z"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: ["currency", "tabs", "block"],
  data() {
    return {
      shift: 45,
      startShift: 45,
      shiftStep: 90,
      maxWidth: 720
    };
  },
  computed: {
    maxshift() {
      if (document.documentElement.clientWidth < this.maxWidth) {
        return (
          this.tabs.length * this.shiftStep -
          document.documentElement.clientWidth
        );
      } else {
        return this.tabs.length * this.shiftStep - this.maxWidth;
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
  font-family: "Roboto", sans-serif;
}

.toolbar__title {
  margin-left: 24px;
  margin-top: 0;
  margin-bottom: 8px;
  font-size: 21px;
  line-height: 25px;
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
  color: #ccae68;
  border: none;
  outline: none;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  line-height: 16px;
}

.toolbar__button_tab {
  width: 90px;
  flex-shrink: 0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.toolbar__button_tab_active {
  background-color: white;
  color: black;
}

.toolbar__button_slide {
  position: absolute;
  top: 63px;
  width: 45px;
  z-index: 1;
}

.toolbar__button_slide:disabled > svg {
  fill: #ffe782;
}

.toolbar__button_slide_forward {
  right: 0;
}

.toolbar__button_slide_back {
  left: 0;
}
</style>