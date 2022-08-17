<template>
  <div class="card">
    <div class="user">
      <div class="user--avatar"><img width="30" height="30" :src="avatar" alt=""></div>
      <div class="user--info">
        <div class="user--login">{{ user }}</div>
        <div class="user--date">
          {{ datePost }}
        </div>
      </div>
    </div>
    <div class="card--title">
      {{ dataPost.title }}
    </div>
    <div class="card--body" v-html="dataPost.description"></div>
  </div>
</template>

<script setup>
  import { computed } from "vue";
  const props = defineProps({
    dataPost: Object
  })

  const datePost = computed(() => {
    return new Date(props.dataPost.date).toLocaleDateString(
      "ru-RU",
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      }
    )
  });
  const user = computed(() => {
    return props.dataPost?.user?.login || ""
  });
  const avatar = computed(() => {
    if (props.dataPost?.user?.avatarUrl) {
      return process.env.NODE_ENV === "production" ?
        `${location.protocol}//${location.host}/static/${props.dataPost.user.avatarUrl}` :
        `http://localhost:5000/static/${props.dataPost.user.avatarUrl}`
    }
    return require('assets/avatar.png')
  });

  defineExpose({
    datePost,
    user,
    avatar,
  })
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  &--title {
    font-size: 18px;
    margin-bottom: 20px;
    font-weight: bold;
  }
  &--body {
    font-size: 14px;
    line-height: 1.5;
    h3 {
      font-size: 16px;
      font-weight: normal;
      margin-bottom: 10px;
    }
    ::v-deep(p) {
      margin: 0 0 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .user {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    &--info {
      display: flex;
      @media all and (max-width: 640px) {
        flex-direction: column;
      }
    }
    &--avatar {
      width: 30px;
      height: 30px;
      img {
        width: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    &--login {
      font-size: 14px;
      margin-right: 10px;
      @media all and (max-width: 640px) {
        margin-bottom: 2px;
      }
    }
    &--date {
      font-size: 14px;
      color: #999;
    }
  }
}
</style>
