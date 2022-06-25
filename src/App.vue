<template>
  <router-view />
  <div></div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "APP",
  methods: {
    ...mapActions("user", ["checkAuth"]),
  },
  computed: {
    ...mapState("user", ["isAuth"]),
  },
  mounted() {
    if (localStorage.getItem("token")) {
      this.checkAuth();
    }
  },
};
</script>

<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
}

* {
  box-sizing: border-box;
}

body {
  background: #fff;
  font-family: Arial, Avenir, Helvetica, sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  padding: 0;
  margin: 0;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.error {
  color: #cc0000;
}
.success {
  color: #4cae4c;
}
.link {
  cursor: pointer;
  color: #0025d9;
}
.loading {
  &.loading_dark {
    &:before {
      background-color: #838383;
    }
  }
  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.8;
    background-color: #f6f6f6;
    z-index: 1;
  }
  &:after {
    width: 20px;
    height: 20px;
    border: 2px solid #d8d8d8;
    border-top-color: #c00;
  }
  &:after {
    content: "";
    border-radius: 50%;
    -webkit-animation: spin 1s infinite linear;
    animation: spin 1s infinite linear;
    position: absolute;
    left: 50%;
    margin-left: -10px;
    top: 50%;
    margin-top: -12px;
    z-index: 2;
  }

  &_simple {
    &:before {
      background-color: transparent;
    }
  }

  &__block {
    &:before {
      background: rgba(0, 0, 0, 0.5);
      opacity: 1;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  &_full {
    &:before {
      opacity: 1;
    }
  }
  &_primary {
    &:before {
      background: #fff;
    }
  }
}
</style>
