<template>
  <WrapContent>
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
          Ваш email
          <span class="error" v-if="!user.isActivated">не подтвержден</span>
          <span class="success" v-else>подтвержден</span>
        </div>
        <ui-input
          :isBlock="true"
          v-model.trim="userEmail"
          type="text"
          placeholder="Ваш email"
          disabled="disabled"
        />
        <div class="profile--link" :class="{'loading':loadActivationmail}" v-if="!user.isActivated">
          Подтвердите email для добавления постов,
          ссылка для подтверждения отправлена на Ваш email <span @click="sendMail">отправить повторно</span>
        </div>
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
        <template v-if="userImage.image_url">
          <div class="img-user">
            <img :src="userImage.image_url" alt="">
          </div>
          <div v-if="false" class="img-user-del">
            <span @click="removeAvatar" class="link">Удалить фото</span>
          </div>
        </template>
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
  </WrapContent>
</template>

<script>
import WrapContent from "@/components/WrapContent";
import {mapActions, mapState} from "vuex";

export default {
  name: "ProfileView",
  components: {
    WrapContent,
  },
  data() {
    return {
      userName: "",
      userEmail: "",
      userImage: {
        userImage: ""
      },
      sendImage: null,
      avatarUrl: "",
      warning: "",
      success: false,
      loadActivationmail: false,
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
      "activationmail",
    ]),
    init() {
      if (this.user) {
        this.userName = this.user.nameUser
        this.userEmail = this.user.email
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
    sendMail() {
      this.loadActivationmail = true
      this.activationmail()
        .then(() => {})
        .catch((err) => console.log(err))
        .finally(() => {
          this.loadActivationmail = false
        })
    },
    removeAvatar() {
      this.userImage.image_url = ""
      this.sendImage = undefined
    },
  }
}
</script>

<style lang="scss" scoped>
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
  &--link {
    margin-top: 10px;
    font-size: 14px;
    margin-bottom: 6px;
    position: relative;
    span {
      cursor: pointer;
      color: #0025d9;
    }
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
  .img-user-del {
    font-size: 14px;
    margin-top: 10px;
  }
}
</style>
