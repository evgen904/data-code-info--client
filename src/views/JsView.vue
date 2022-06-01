<template>
  <Header />
  <div class="site-content">
    <div class="site-content--sidebar">
      <Folders />
    </div>
    <div class="site-content--inner">
      <h1>Info</h1>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Header from "@/components/Header";
import Folders from "@/components/Folders";

export default {
  name: "JsView",
  components: {
    Header,
    Folders,
  },
};
</script>

<style lang="scss" scoped>
.site-content {
  display: grid;
  grid-template-columns: 1fr 240px 20px minmax(100px, 1000px) 1fr;
  grid-template-areas: ". sidebar . content .";
  &--sidebar {
    grid-area: sidebar;
  }
  &--inner {
    grid-area: content;
  }
}
</style>
