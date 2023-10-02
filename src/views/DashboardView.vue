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
    <p>
      <router-link to="/test-render">test render</router-link>
    </p>
    <p>
      <a href="/repa1/calendar">Прямой переход на стр. Calendar</a>
    </p>
    <p>
      <a href="/repa2/chat">Прямой переход на стр. Chat</a>
    </p>
    <p>
      <a href="/repa2/objects">Прямой переход на стр. Objects</a>
    </p>
    <br>
    <p>
      <router-link to="/calendar">module federation - Calendar</router-link>
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
