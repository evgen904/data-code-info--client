<template>
  <input
    :value="modelValue"
    @input="updateInput"
    class="ui-input"
    :class="{ block: isBlock }"
    :type="type"
    :disabled="disabled"
  />
</template>

<script>
export default {
  name: "UiInput",
  props: {
    modelValue: [String, Number],
    type: {
      type: String,
      default: "text",
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.ui-input {
  outline-style: none;
  display: inline-block;
  vertical-align: top;
  border: 1px solid #ccc;
  padding: 8px 10px;
  margin: 0;
  font-size: 14px;
  background: #fff;
  &.block {
    display: block;
    width: 100%;
  }
  &[disabled] {
    opacity: 0.8;
  }
}
</style>
