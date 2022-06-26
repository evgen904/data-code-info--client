<template>
  <WrapContent>
    <router-view />
  </WrapContent>
</template>

<script>
import WrapContent from "@/components/WrapContent";

export default {
  name: "PostsView",
  components: {
    WrapContent,
  },
};
</script>

<style lang="scss" scoped>
</style>
