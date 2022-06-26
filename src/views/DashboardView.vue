<template>
  <WrapContent>
    <h1>Info</h1>
    <p>
      Сайт как записная книжка, все в одном месте, <br>
      можно создавать (снипеты - статьи), <br>
      разделять по категориям, категории можно создавать свои.
    </p>
    <p>
      Также есть общий список категорий, который можно пополнять снипетами-статьями <br>
      (публикуются после модерации админом)
    </p>
  </WrapContent>
</template>

<script>
import WrapContent from "@/components/WrapContent";

export default {
  name: "DashboardView",
  components: {
    WrapContent,
  },
};
</script>

<style lang="scss" scoped>
</style>
