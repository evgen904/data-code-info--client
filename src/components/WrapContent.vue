<template>
  <Header />
  <div class="site-content">
    <div class="site-content--sidebar">
      <Folders />
    </div>
    <div class="site-content--inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Folders from "@/components/Folders";

export default {
  name: "WrapContent",
  components: {
    Header,
    Folders,
  }
}
</script>

<style lang="scss" scoped>
  .site-content {
    display: grid;
    grid-template-columns: 1fr 240px 20px minmax(100px, 980px) 1fr;
    grid-template-areas: ". sidebar . content .";
    @media all and (max-width: 640px) {
      grid-template-columns: 1fr;
      grid-template-areas: "sidebar"
      "content";
    }
    &--sidebar {
      grid-area: sidebar;
    }
    &--inner {
      grid-area: content;
      line-height: 1.4;
      @media all and (max-width: 640px) {
        padding: 10px 20px 0 20px;
      }
    }
  }
</style>
