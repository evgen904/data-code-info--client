<template>
  <Header />
  <div class="page-profile">
    <div class="page-profile--sidebar">
      <Folders />
    </div>
    <div class="page-profile--content">
      <div class="profile">
        <h2>Редактировать профиль</h2>
        <div class="profile--field name">
          <div class="profile--title">
            Ваше имя
          </div>
          <ui-input
            :isBlock="true"
            v-model.trim="userName"
            type="text"
            placeholder="Ваше имя"
          />
        </div>
        <div class="profile--field name">
          <div class="profile--title">
            Фото профиля
          </div>
          <div class="load-image">
            <input
              ref="files"
              class="load-image--dropzone"
              type="file"
              multiple
              @change="handleFilesUpload('files')"
            />
            <div class="load-image--img">
              <img src="~assets/file-load.png" alt="">
            </div>
            Перетащите картинку или нажмите
          </div>
          <div class="img-user" v-if="userImage">
            <img :src="userImage.image_url" alt="">
          </div>
        </div>
        <div class="profile--field">
          <div class="warning" :class="{'error': !success, 'success': success}" v-if="warning">
            {{ warning }}
          </div>
          <ui-button type="click" color="success" @click="setUserBtn"
          >Сохранить</ui-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Folders from "@/components/Folders";
import {mapActions, mapState} from "vuex";

export default {
  name: "ProfileView",
  components: {
    Header,
    Folders,
  },
  data() {
    return {
      userName: "",
      userImage: {
        userImage: ""
      },
      sendImage: null,
      avatarUrl: "",
      warning: "",
      success: false,
    }
  },
  computed: {
    ...mapState("user", ["user"]),
  },
  watch: {
    user() {
      this.init()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions("user", [
      "setUserApi",
    ]),
    init() {
      if (this.user) {
        this.userName = this.user.nameUser
        if (this.user.avatarUrl) {
          if (process.env.NODE_ENV === "production") {
            this.avatarUrl = `${location.protocol}//${location.host}/static/${this.user.avatarUrl}`
          } else {
            this.avatarUrl = `http://localhost:5000/static/${this.user.avatarUrl}`
          }
          this.userImage.image_url = this.avatarUrl
        }
      }
    },
    handleFilesUpload(files) {
      let filesSubmit = [];
      for (var i = 0; i < this.$refs[files].files.length; i++) {
        if (/\.(jpe?g|png|gif)$/i.test(this.$refs[files].files[i].name)) {
          filesSubmit.push(this.$refs[files].files[i]);
        }
      }
      this.sendImage = filesSubmit[0]
      this.submitFiles(filesSubmit);
      this.$refs[files].value = "";
    },
    submitFiles(files) {
      let imageBlobIndexes = [];
      files.forEach((item, index) => {
        this.userImage = {
          loading: true,
          image_url: window.URL.createObjectURL(files[index]),
          inLocalBlob: true,
          blobIndex: (imageBlobIndexes[index] = Date.now() + index),
        }
      });
    },
    setUserBtn() {
      const formData = new FormData()
      if (this.userName) {
        formData.append('nameUser', this.userName)
      }
      if (this.sendImage) {
        formData.append('image', this.sendImage)
      }
      this.setUserApi(formData)
        .then(res => {
          if (res?.message) {
            this.warning = res.message
            this.success = false
          } else {
            this.warning = ""
            this.success = false
          }
          if (res?.userDataSet?.acknowledged) {
            this.warning = "Изменения внесены"
            this.success = true
          } else {
            this.warning = ""
            this.success = false
          }
        })
        .catch(err => console.log(err))
    },
  }
}
</script>

<style lang="scss" scoped>
.page-profile {
  display: grid;
  grid-template-columns: 1fr 240px 20px minmax(100px, 1000px) 1fr;
  grid-template-areas: ". sidebar . content .";
  &--sidebar {
    grid-area: sidebar;
  }
  &--content {
    grid-area: content;
    .profile {
      margin-bottom: 30px;
      h2 {
        margin-bottom: 20px;
      }
      &--field {
        margin-bottom: 20px;
        &.name {
          max-width: 300px;
        }
        .warning {
          font-size: 14px;
          margin-bottom: 14px;
          &.error {
            color: #cc0000;
          }
          &.success {
            color: #4cae4c;
          }
        }
      }
      &--title {
        font-size: 14px;
        margin-bottom: 6px;
      }
      .load-image {
        position: relative;
        border: 1px dashed #ccc;
        font-size: 14px;
        padding: 20px;
        text-align: center;
        border-radius: 5px;
        &--img {
          margin-bottom: 10px;
        }
        &--dropzone {
          cursor: pointer;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          width: 100%;
          opacity: 0;
        }
      }
      .img-user {
        border: 1px solid #ccc;
        max-width: 100px;
        margin-top: 14px;
        img {
          display: inline-block;
          vertical-align: top;
          width: 100%;
        }
      }
    }
  }
}
</style>
