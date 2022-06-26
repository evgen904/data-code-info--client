<template>
  <div class="header">
    <div class="header--title">
      <router-link to="/"> Шпаргалка разработчика </router-link>
    </div>
    <div class="header--btn">
      <ui-button v-if="!isAuth" @click="auth" color="primary">Войти</ui-button>
      <template v-else>
        <div class="menu-item">
          <div class="menu-item--burger" :class="{'active': activeBurger}" @click="activeBurger = !activeBurger">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
          </div>
          <div class="menu-item--body" :class="{'active': activeBurger}">
            <div class="menu-item--name">
              {{ user.login }}
              <img :src="avatar" alt="">
            </div>
            <div class="menu-item--list">
              <ul>
                <li>
                  <div class="type-user">
                    Тип пользователя:
                    <span v-for="item in user.roles" :key="item.id">
                    {{ item }}
                  </span>
                  </div>
                  <div class="link-header">
                    <router-link :to="{ name: 'ProfileView' }"
                    >Редактировать профиль</router-link
                    >
                  </div>
                  <hr />
                </li>
                <li>
                  <router-link :to="{ name: 'FolderView' }"
                  >Добавить/Удалить категорию</router-link
                  >
                </li>
                <li>
                  <router-link :to="{ name: 'PostView' }"
                  >Добавить/Удалить пост</router-link
                  >
                </li>
                <li>
                  <hr />
                </li>
                <li>
                  <span @click="logout">Выйти</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
  <ui-modal
    class="modal-auth"
    v-if="modalVisible"
    @close="modalVisible = false"
  >
    <template v-slot:header>
      <h2 v-if="!isRegistration">Вход</h2>
      <h2 v-else>Регистрация</h2>
    </template>
    <form class="form-auth" @submit.prevent>
      <div class="form-auth--field">
        <ui-input :isBlock="true" v-model="login" placeholder="Логин" />
      </div>
      <div class="form-auth--field" v-if="isRegistration">
        <ui-input :isBlock="true" v-model="email" placeholder="email" />
      </div>
      <div class="form-auth--field">
        <ui-input
          :isBlock="true"
          v-model="password"
          type="password"
          placeholder="пароль"
        />
      </div>
      <div v-if="warningAuth" class="form-auth--warning">
        {{ warningAuth }}
      </div>
      <div class="form-auth--btn">
        <template v-if="!isRegistration">
          <ui-button type="click" color="primary" :class="{'loading': loadingLogin}" @click="loginUser">Войти</ui-button>
          <ui-button type="click" color="success" :class="{'loading': loadingRegistration}" @click="isRegistration = true"
          >Регистрация</ui-button
          >
        </template>
        <template v-else>
          <ui-button type="click" color="primary" :class="{'loading': loadingLogin}" @click="isRegistration = false">Вход</ui-button>
          <ui-button type="click" color="success" :class="{'loading': loadingRegistration}" @click="registration"
          >Регистрация</ui-button
          >
        </template>
      </div>
    </form>
  </ui-modal>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapState("user", ["isAuth", "user"]),
    avatar() {
      if (this?.user?.avatarUrl) {
        return process.env.NODE_ENV === "production" ?
          `${location.protocol}//${location.host}/static/${this.user.avatarUrl}` :
          `http://localhost:5000/static/${this.user.avatarUrl}`
      }
      return require('assets/avatar.png')
    },
  },
  watch: {
    isAuth() {
      this.activeBurger = false
    },
  },
  data() {
    return {
      modalVisible: false,
      warningAuth: "",
      isRegistration: false,
      email: "",
      login: "",
      password: "",
      loadingLogin: false,
      loadingRegistration: false,
      activeBurger: false,
    };
  },
  methods: {
    ...mapActions("user", ["userLogin", "userRegistration", "userLogout"]),
    ...mapActions("folders", ["getFoldersUser"]),
    ...mapMutations("folders", ["setFoldersUser"]),
    auth() {
      this.modalVisible = true;
    },
    loginUser() {
      const dataUser = {
        login: this.login,
        password: this.password,
      };
      this.loadingLogin = true
      this.userLogin(dataUser)
        .then((res) => {
          if (res?.data?.message) {
            this.warningAuth = res.data.message;
          } else {
            this.warningAuth = "";
          }
          if (res?.data?.accessToken) {
            this.modalVisible = false;
          }
          this.getFoldersUser();
        })
        .catch((err) => console.log(err))
        .finally(() => {
          this.loadingLogin = false
        })
    },
    registration() {
      const dataUser = {
        login: this.login,
        email: this.email,
        password: this.password,
      };
      this.loadingRegistration = true
      this.userRegistration(dataUser)
        .then((res) => {
          if (res?.data?.message) {
            this.warningAuth = res.data.message;
          } else {
            this.warningAuth = "";
          }
          if (res?.data?.accessToken) {
            this.modalVisible = false;
          }
        })
        .catch((err) => console.log(err))
        .finally(() => {
          this.loadingRegistration = false
        })
    },
    logout() {
      this.userLogout()
        .then(() => {
          this.setFoldersUser([]);
          this.$router.push({
            name: "DashboardView",
          });
        })
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  background: #f9f9f9;
  display: grid;
  grid-template-columns: 1fr minmax(100px, 640px) minmax(100px, 600px) 1fr;
  grid-template-areas: ". title btn .";
  margin-bottom: 20px;
  @media all and (max-width: 640px) {
    margin-bottom: 0;
    grid-template-columns: minmax(180px, 640px) minmax(100px, 600px);
    grid-template-areas: "title btn";
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0px 2px 4px rgba(0,0,0,.1);
  }
  &--title {
    grid-area: title;
    align-self: center;
    font-size: 20px;
    font-weight: bold;
    @media all and (max-width: 640px) {
      font-size: 15px;
      padding-left: 20px;
    }
    a {
      color: #000000;
      text-decoration: none;
    }
  }
  &--btn {
    grid-area: btn;
    justify-self: flex-end;
    align-self: center;
    .ui-btn {
      margin-left: 10px;
      @media all and (max-width: 640px) {
        margin-right: 10px;
      }
    }
  }
}
.modal-auth {
  .ui-dialog--content {
    max-width: 400px;
  }
  h2 {
    margin-bottom: 20px;
  }
}
.form-auth {
  padding: 0;
  margin: 0;
  &--field {
    margin-bottom: 10px;
  }
  &--warning {
    font-size: 14px;
    color: #cc0000;
    margin-bottom: 10px;
  }
  &--btn {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
  }
}
.menu-item {
  @media all and (min-width: 640px) {
    position: relative;
  }
  &--burger {
    display: none;
    width: 60px;
    height: 60px;
    padding: 17px 14px 20px 14px;
    flex-wrap: wrap;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    @media all and (max-width: 640px) {
      display: flex;
    }
    .line {
      height: 4px;
      width: 45px;
      background: #5e5e5e;
      margin: 3px auto;
      transition: all 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    &.active {
      outline-style: none;
      .line {
        &:nth-child(1) {
          transform: rotate(45deg) translate(8px, 8px);
        }
        &:nth-child(2) {
          visibility: hidden;
        }
        &:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }
      }
    }
  }
  &--body {
    @media all and (max-width: 640px) {
      display: none;
      position: absolute;
      right: 0;
      left: 0;
      top: 100%;
      background: #fff;
      border: 1px solid #ccc;
      z-index: 100;
      box-shadow: 0px 5px 10px rgba(0,0,0,.2);
      .menu-item--list {
        display: block;
        position: relative;
        width: 100%;
      }
    }
    &.active {
      display: block;
    }
  }
  &--name {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    cursor: pointer;
    transition: 0.3s background ease;
    @media all and (max-width: 640px) {
      border-bottom: 1px solid #ccc;
    }
    &:hover {
      @media all and (min-width: 640px) {
        background: #f0f0f0;
      }
    }
    img {
      display: inline-block;
      vertical-align: middle;
      margin-left: 10px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
  &--list {
    display: none;
    position: absolute;
    top: 100%;
    right: 0;
    width: 250px;
    background: #fff;
    border: 1px solid #ccc;
    z-index: 1000;
    @media all and (max-width: 640px) {
      border: none;
    }
    ul {
      padding: 10px 0;
      margin: 0;
      list-style: none;
      li {
        > a,
        > span, .link-header > a {
          display: block;
          cursor: pointer;
          padding: 8px 20px;
          color: #000000;
          font-size: 14px;
          text-decoration: none;
          transition: 0.3s background ease;
          &:hover {
            background: #f0f0f0;
          }
        }
        .activate-email {
          color: #cc0000;
          font-size: 14px;
          padding: 8px 20px;
          span {
            cursor: pointer;
            display: inline-block;
            margin-top: 10px;
            color: #0025d9;
          }
        }
        .type-user {
          color: #000;
          font-size: 14px;
          padding: 8px 20px;
        }
        hr {
          padding: 0;
          margin: 10px 0;
          height: 1px;
          border: none;
          background: #ccc;
        }
      }
    }
  }
  &:hover {
    .menu-item--name {
      @media all and (min-width: 640px) {
        background: #f0f0f0;
      }
    }
    .menu-item--list {
      display: block;
    }
  }
}
</style>
