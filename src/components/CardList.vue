<template>
  <Card v-for="item in posts" :key="item._id" :data-post="item" />
  <div v-if="!posts.length">
    <h2>Постов нет</h2>
  </div>
</template>

<script setup>
  import Card from "@/components/Card";
  import { ref, computed, watch, onMounted } from "vue";
  import { useStore } from "vuex";
  import { useRoute } from 'vue-router'

  const route = useRoute();
  const store = useStore();

  const posts = ref([]);
  const folder = computed(() => {
    return route.params.folder;
  });

  const init = () => {
    const isUserFolder = route.query?.folder === "user";
    store.dispatch("posts/getPosts", { folder: folder.value, isUserFolder })
      .then((res) => {
        if (res.data.length) {
          posts.value = res.data;
          if (window.hljs) {
            setTimeout(() => {
              document.querySelectorAll("pre code").forEach((block) => {
                window.hljs.highlightBlock(block);
              });
            }, 100);
          }
        } else {
          posts.value = [];
        }
      })
      .catch((err) => console.log(err));
  }

  watch(folder, () => {
    init();
  });

  onMounted(() => {
    init();
  });

  defineExpose({
    posts,
    init,
  })
</script>

<style scoped></style>
