<template>
  <button class="ui-btn" :class="[size, color, { block: isBlock }]">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "UiButton",
  props: {
    size: {
      type: String,
      default: "",
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.ui-btn {
  cursor: pointer;
  display: inline-block;
  vertical-align: top;
  padding: 8px 16px;
  margin: 0;
  outline-style: none;
  font-size: 14px;
  border-radius: 3px;
  color: #000000;
  border: 1px solid #ccc;
  background: #f0f0f0;
  transition: background 0.3s ease;
  &.basic {
    background: #f0f0f0;
    color: #000000;
    border-color: #ccc;
    &:hover {
      background: #fff;
      color: #000000;
      border-color: #ccc;
    }
  }
  &.default {
    background: #fff;
    color: #000000;
    border-color: #ccc;
    &:hover {
      background: #fff;
      color: #000000;
      border-color: #ccc;
    }
  }
  &.primary {
    background: #337ab7;
    color: #fff;
    border-color: #2e6da4;
    &:hover {
      background: #3789cf;
      color: #fff;
      border-color: #2e6da4;
    }
  }
  &.success {
    background: #5cb85c;
    color: #fff;
    border-color: #4cae4c;
    &:hover {
      background: #6cd96c;
      color: #fff;
      border-color: #4cae4c;
    }
  }
  &.info {
    background: #5bc0de;
    color: #fff;
    border-color: #46b8da;
    &:hover {
      background: #63d5f6;
      color: #fff;
      border-color: #46b8da;
    }
  }
  &.warning {
    background: #f0ad4e;
    color: #fff;
    border-color: #eea236;
    &:hover {
      background: #ffbd5f;
      color: #fff;
      border-color: #eea236;
    }
  }
  &.danger {
    background: #d9534f;
    color: #fff;
    border-color: #d43f3a;
    &:hover {
      background: #f5615d;
      color: #fff;
      border-color: #d43f3a;
    }
  }
  &.link {
    background: transparent;
    color: #c00;
    border: none;
    text-decoration: underline;
    padding: 0;
    &:hover {
      text-decoration: none;
    }
  }

  &.block {
    display: block;
    width: 100%;
  }
  &.large {
    font-size: 16px;
    padding: 10px 20px;
  }
  &.small {
    font-size: 12px;
    padding: 6px 14px;
  }
  &:hover {
    background: #fff;
  }
}
</style>
