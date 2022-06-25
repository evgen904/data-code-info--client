<template>
  <ul class="menu">
    <li v-for="item in foldersAll" :key="item._id">
      <router-link
        :to="{
          name: 'CardList',
          params: { folder: item.name },
        }"
        >{{ item.title }}</router-link
      >
    </li>
    <template v-if="foldersUser.length">
      <li>
        <hr />
        <div class="folder-name">Свои категории</div>
      </li>
      <li v-for="item in foldersUser" :key="item._id">
        <router-link
          :to="{
            name: 'CardList',
            query: {
              folder: 'user',
            },
            params: { folder: item.name },
          }"
          >{{ item.title }}</router-link
        >
      </li>
    </template>
  </ul>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Folder",
  computed: {
    ...mapState("user", ["isAuth"]),
    ...mapState("folders", ["foldersAll", "foldersUser"]),
  },
  methods: {
    ...mapActions("folders", ["getFoldersAll", "getFoldersUser"]),
  },
  mounted() {
    this.getFoldersAll();
    if (this.isAuth) {
      this.getFoldersUser();
    }
  },
};
</script>

<style lang="scss" scoped>
.menu {
  padding: 0;
  margin: 0;
  list-style: none;
  position: sticky;
  top: 0;
  li {
    margin-bottom: 1px;
    a {
      display: block;
      padding: 10px 12px;
      color: #000000;
      text-decoration: none;
      font-size: 14px;
      background: #fff;
      transition: background 0.3s ease;
      &:hover, &.router-link-active {
        background: #f9f9f9;
      }
    }
    hr {
      height: 1px;
      border: none;
      background: #ccc;
    }
    .folder-name {
      color: #000000;
      padding: 10px 12px;
      font-weight: bold;
    }
  }
}
</style>
