<template>
  <div class="wrap-page">
    <h1>Test render</h1>
    <ul class="list-gal">
      <li v-for="item in list" :key="item.id">
        <div class="title">
          {{ item.created_at }}
        </div>
        <div>
          <img :src="item.urls.thumb" alt="">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "TestRender",
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.init({
      client_id: '3r8CIWg9-7z66Y2_s3f1uWcF6YF71NMUc8R-ekBMOzY',
      per_page: 15,
      page: 1,
    });
  },
  methods: {
    init(payload) {
      axios
        .get("https://api.unsplash.com/users/michellem18/photos", {
          params: payload
        })
        .then(response => {
          if (response?.data) {
            this.list = response.data;
            console.log(this.list, 'this.list');
            let event = new Event('renderer-ready');
            window.document.dispatchEvent(event)
          }
        })
        .catch(error => console.error(error))
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap-page {
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  padding: 10px 0;
  h1 {
    margin-bottom: 20px;
  }
}
.list-gal {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  > li {
    width: 200px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 0 10px 10px 0;
    padding: 10px;
    img {
      width: 100%;
      object-fit: cover;
    }
    .title {
      font-size: 14px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
