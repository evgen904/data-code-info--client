<template>
  <label class="ui-checkbox" :class="{ 'ui-checkbox--disabled': disabled }">
    <input
      class="ui-checkbox--input"
      :disabled="disabled"
      type="checkbox"
      @input="updateCheckbox"
      :value="modelValue"
      :checked="modelValue"
    />
    <span class="ui-checkbox--mark"></span>
    <span>
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  name: "UiCheckbox",
  inheritAttrs: false,
  model: {
    prop: "checked",
    event: "input",
  },
  props: {
    modelValue: [Boolean],
    disabled: {
      type: Boolean,
    },
  },
  methods: {
    updateCheckbox(event) {
      this.$emit("update:modelValue", event.target.checked);
    },
  },
};
</script>

<style lang="scss" scoped>
.ui-checkbox {
  font-size: 14px;
  line-height: 16px;
  color: #464646;
  vertical-align: top;
  min-height: 1.5rem;
  margin-bottom: 0px;
  position: relative;
  display: flex;
  user-select: none;
  input {
    display: none;
  }
  &--mark {
    display: inline-block;
    height: 15px;
    width: 15px;
    min-width: 15px;
    margin-right: 6px;
    position: relative;
    top: 1px;
    background-image: url("assets/unchecked.svg");
  }
  & input:checked ~ .ui-checkbox--mark {
    background-image: url("assets/checked.svg");
  }
  & input:active ~ .ui-checkbox--mark {
    background-image: url("assets/checked.svg");
    opacity: 0.5;
  }
  &--disabled {
    filter: contrast(0.4);
    opacity: 0.75;
  }
}
</style>
