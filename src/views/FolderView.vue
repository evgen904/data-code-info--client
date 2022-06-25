<template>
  <Header />
  <div class="edit-folders">
    <div class="edit-folders--sidebar">
      <Folders />
    </div>
    <div class="edit-folders--content">
      <div class="folder">
        <h2>Добавить категорию</h2>
        <div class="folder--field">
          <ui-input
            :isBlock="true"
            v-model.trim="titleFolder"
            type="text"
            placeholder="Название категории"
          />
        </div>
        <div v-if="addWarning" class="folder--warning">
          {{ addWarning }}
        </div>
        <ui-button type="click" color="success" @click="addFolderBtn"
          >Добавить</ui-button
        >
      </div>
      <div class="folder" v-if="foldersPublic.length || folders.length">
        <h2>Редактировать категории</h2>
        <template v-if="isAdmin && foldersPublic.length">
          <h3>Категории для всех</h3>
          <div class="folder--list">
            <ul>
              <transition-group name="list">
                <li v-for="item in foldersPublic" :key="item._id">
                  <div class="folder-name">
                    <div class="folder-input">
                      <ui-input
                        :isBlock="true"
                        v-model.trim="item.title"
                        type="text"
                        placeholder="Название категории"
                      />
                    </div>
                    <div v-if="isAdmin" class="folder-type">
                      <ui-checkbox v-model="item.isPublic">
                        Публичная категория
                      </ui-checkbox>
                    </div>
                  </div>
                  <div class="folder-del">
                    <ui-button
                      type="click"
                      color="success"
                      @click="setFolderBtn(item._id)"
                      >Сохранить</ui-button
                    >
                    <ui-button
                      type="click"
                      color="danger"
                      @click="delFolderBtn(item._id)"
                      >Удалить</ui-button
                    >
                  </div>
                </li>
              </transition-group>
            </ul>
          </div>
          <hr />
        </template>
        <div class="folder--list">
          <ul>
            <transition-group name="list">
              <li v-for="item in folders" :key="item._id">
                <div class="folder-name">
                  <div class="folder-input">
                    <ui-input
                      :isBlock="true"
                      v-model.trim="item.title"
                      type="text"
                      placeholder="Название категории"
                    />
                  </div>
                  <div v-if="isAdmin" class="folder-type">
                    <ui-checkbox v-model="item.isPublic">
                      Публичная категория
                    </ui-checkbox>
                  </div>
                </div>
                <div class="folder-del">
                  <ui-button
                    type="click"
                    color="success"
                    @click="setFolderBtn(item._id)"
                    >Сохранить</ui-button
                  >
                  <ui-button
                    type="click"
                    color="danger"
                    @click="delFolderBtn(item._id)"
                    >Удалить</ui-button
                  >
                </div>
              </li>
            </transition-group>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Folders from "@/components/Folders";
import cyrillicToTranslit from "cyrillic-to-translit-js";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "FolderView",
  components: {
    Header,
    Folders,
  },
  data() {
    return {
      titleFolder: "",
      nameFolder: "",
      addWarning: "",
      folders: [],
      foldersPublic: [],
    };
  },
  mounted() {
    this.initFolders();
  },
  computed: {
    ...mapState("user", ["user"]),
    ...mapGetters("user", ["isAdmin"]),
  },
  methods: {
    ...mapActions("folders", [
      "addFolder",
      "setFolder",
      "removeFolder",
      "getFolder",
      "getFoldersUser",
      "getFoldersAll",
    ]),
    initFolders() {
      this.getFoldersUser()
        .then((res) => {
          if (res.data.length) {
            this.folders = res.data;
          }
        })
        .catch((err) => console.log(err));
      if (this.isAdmin) {
        this.getFoldersAll()
          .then((res) => {
            if (res.data.length) {
              this.foldersPublic = res.data;
            }
          })
          .catch((err) => console.log(err));
      }
    },
    addFolderBtn() {
      let nameFolder = cyrillicToTranslit().transform(
        this.titleFolder.toLocaleLowerCase(),
        "_"
      );
      const addFolder = {
        name: `${nameFolder}_${this.user.id}`,
        title: this.titleFolder,
      };
      if (this.titleFolder) {
        this.addFolder(addFolder)
          .then((res) => {
            if (res?.data?.message) {
              this.addWarning = res.data.message;
            } else {
              this.addWarning = "";
            }
            if (res?.data?.folderData?.name) {
              this.titleFolder = "";
              this.initFolders();
            }
          })
          .catch((err) => console.log(err));
      }
    },
    setFolderBtn(id) {
      const folderEdit = this.folders.find((item) => item._id === id);
      let nameFolder = cyrillicToTranslit().transform(
        folderEdit.title.toLocaleLowerCase(),
        "_"
      );
      this.setFolder({
        name: `${nameFolder}_${this.user.id}`,
        title: folderEdit.title,
        isPublic: folderEdit.isPublic,
      })
        .then((res) => {
          if (res.data.folderData) {
            console.log("folderData");
          }
        })
        .catch((err) => console.log(err));
    },
    delFolderBtn(id) {
      this.removeFolder({ _id: id })
        .then((res) => {
          if (res?.data?.deletedCount) {
            let indexFolder = this.folders.findIndex((item) => item._id === id);
            this.folders.splice(indexFolder, 1);
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}

.edit-folders {
  display: grid;
  grid-template-columns: 1fr 240px 20px minmax(100px, 1000px) 1fr;
  grid-template-areas: ". sidebar . content .";
  &--sidebar {
    grid-area: sidebar;
  }
  &--content {
    grid-area: content;
    h2 {
      margin-bottom: 20px;
    }
    .folder {
      margin-bottom: 40px;
      h3 {
        margin-bottom: 10px;
      }
      hr {
        margin: 20px 0;
      }
      &--field {
        margin-bottom: 10px;
      }
      &--warning {
        font-size: 14px;
        color: #cc0000;
        margin-bottom: 10px;
      }
      &--list {
        ul {
          padding: 0;
          margin: 0;
          list-style: none;
          li {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            background: #f0f0f0;
            margin-bottom: 10px;
            .folder-name {
              width: 100%;
            }
            .folder-input {
            }
            .folder-del {
              margin-left: 10px;
              display: flex;
              flex-wrap: nowrap;
              align-items: flex-start;
              .ui-btn {
                margin-left: 10px;
              }
            }
            .folder-type {
              padding-top: 10px;
              margin-bottom: -6px;
            }
          }
        }
      }
    }
  }
}
</style>
