<template>
  <Header />
  <div class="edit-post">
    <div class="edit-post--sidebar">
      <Folders />
    </div>
    <div class="edit-post--content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Folders from "@/components/Folders";

export default {
  name: "PostsView",
  components: {
    Header,
    Folders,
  },
};
</script>

<style lang="scss" scoped>
.edit-post {
  display: grid;
  grid-template-columns: 1fr 240px 20px minmax(100px, 1000px) 1fr;
  grid-template-areas: ". sidebar . content .";
  &--sidebar {
    grid-area: sidebar;
  }
  &--content {
    grid-area: content;
  }
}
</style>
