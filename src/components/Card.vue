<template>
  <div class="card">
    <div class="card--title">
      {{ dataPost.title }}
    </div>
    <div class="card--body" v-html="dataPost.description"></div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    dataPost: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  &--title {
    font-size: 18px;
    margin-bottom: 20px;
    font-weight: bold;
  }
  &--body {
    font-size: 14px;
    line-height: 1.5;
    h3 {
      font-size: 16px;
      font-weight: normal;
      margin-bottom: 10px;
    }
    ::v-deep(p) {
      margin: 0 0 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
