<template>
  <Card v-for="item in posts" :key="item._id" :dataPost="item" />
  <div v-if="!posts.length">
    <h2>Постов нет</h2>
  </div>
</template>

<script>
import Card from "@/components/Card";
import { mapActions } from "vuex";

export default {
  name: "CardList",
  components: {
    Card,
  },
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    this.init(this.folder);
  },
  watch: {
    folder(val) {
      this.init(val);
    },
  },
  computed: {
    folder() {
      return this.$route.params.folder;
    },
  },
  methods: {
    ...mapActions("posts", ["getPosts", "getPostsFolderUser"]),
    init(val) {
      let isUserFolder = this.$route.query?.folder === "user" ? true : false;
      this.getPosts({ folder: val, isUserFolder })
        .then((res) => {
          if (res.data.length) {
            this.posts = res.data;
            if (window.hljs) {
              setTimeout(() => {
                document.querySelectorAll("pre code").forEach((block) => {
                  window.hljs.highlightBlock(block);
                });
              }, 100);
            }
          } else {
            this.posts = [];
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped></style>
