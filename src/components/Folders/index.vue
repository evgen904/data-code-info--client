<template>
  <div class="menu-wrap">
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
    </ul>
    <template v-if="foldersUser.length">
      <hr />
      <div class="folder-name">Свои категории</div>
      <ul class="menu">
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
      </ul>
    </template>
  </div>
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
.menu-wrap {
  position: sticky;
  top: 0;
  @media all and (max-width: 640px) {
    position: relative;
    padding-top: 10px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
    padding-bottom: 10px;
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
    @media all and (max-width: 640px) {
      padding: 10px 20px;
    }
  }
}
.menu {
  padding: 0;
  margin: 0;
  list-style: none;
  @media all and (max-width: 640px) {
    overflow: auto;
    display: flex;
    width: 100%;
    padding: 0 8px;
  }
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
      @media all and (max-width: 640px) {
        padding: 4px 12px;
      }
      &:hover, &.router-link-active {
        background: #f9f9f9;
      }
    }
  }
}
</style>
