<template>
  <transition appear name="modal" @after-enter="show = true">
    <div class="ui-dialog" @click="show = false">
      <transition name="modal-content" @after-leave="$emit('close')">
        <div v-if="show" @click.stop class="ui-dialog--content">
          <div class="ui-dialog--close" @click="show = false"></div>
          <div v-if="!!this.$slots['header']" class="ui-dialog--title">
            <slot name="header"></slot>
          </div>
          <slot></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: "UiModal",
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.modal-enter-active {
  animation: modal 0.2s ease-out;
}

.modal-leave-active {
  animation: modal 0.2s ease-out reverse;
}

@keyframes modal {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content-enter-active {
  animation: modal-content 0.2s ease-out;
}

.modal-content-leave-active {
  animation: modal-content 0.2s ease-out reverse;
}

@keyframes modal-content {
  from {
    opacity: 0;
    transform: translateY(-350px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.ui-dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.3);
  text-align: center;
  &:after {
    content: "";
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: middle;
  }
  &--content {
    text-align: left;
    display: inline-block;
    vertical-align: middle;
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    font-size: 14px;
    position: relative;
    width: 100%;
    max-width: 560px;
    margin: 0 auto;
  }
  &--close {
    cursor: pointer;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 10px;
    right: 10px;
    &:after,
    &:before {
      content: "";
      display: block;
      width: 20px;
      height: 2px;
      background: #000;
      position: absolute;
      top: 0;
      left: 0;
      margin: 8px 0 0 0;
      border-radius: 2px;
    }
    &:after {
      transform: rotate(-45deg);
    }
    &:before {
      transform: rotate(45deg);
    }
  }
}
</style>
