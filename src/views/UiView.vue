<template>
  <div>
    <div>
      <p>
        <ui-button size="small"> Кнопка </ui-button>
        <ui-button> Кнопка </ui-button>
        <ui-button size="large"> Кнопка </ui-button>
      </p>
      <p>
        <ui-button @click="showDialog" :is-block="true"> Show modal </ui-button>
      </p>
      <p>
        <ui-button color="basic"> basic </ui-button>
        <ui-button color="default"> default </ui-button>
        <ui-button color="primary"> primary </ui-button>
        <ui-button color="success"> success </ui-button>
        <ui-button color="info"> info </ui-button>
        <ui-button color="warning"> warning </ui-button>
        <ui-button color="danger"> danger </ui-button>
        <ui-button color="link"> link </ui-button>
      </p>
    </div>
    <ui-modal v-if="modalVisible" @close="modalVisible = false">
      <template v-slot:header>
        <h2>Card Header Title</h2>
      </template>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim iste quas
        quod repudiandae vero. Consequuntur dolores doloribus facilis fugiat
        ipsum non quas reiciendis temporibus. Enim excepturi fugiat voluptatem
        voluptates. Adipisci aspernatur doloremque enim, esse explicabo fugiat
        fugit illum in ipsam ipsum itaque laborum laudantium magnam nihil odio
        porro rerum vel, veritatis voluptas voluptatibus. Eos facilis nisi
        saepe? Aut corporis debitis distinctio dolores facilis id iste libero,
        minima molestiae nam, natus necessitatibus nisi praesentium quasi
        quibusdam quidem quisquam repellendus rerum voluptate voluptates! A
        aliquam amet architecto dolorem eveniet iure molestiae nesciunt nulla
        ullam voluptatum? Aut dolorem et laboriosam quos suscipit unde.
      </p>
    </ui-modal>
  </div>
  <div>
    <ui-input v-model="inputText" />
  </div>
</template>

<script>
import UiButton from "@/components/UI/UiButton";
export default {
  name: "UiView",
  components: { UiButton },
  data() {
    return {
      dialogVisible: false,
      inputText: 111,
      modalVisible: false,
    };
  },
  methods: {
    showDialog() {
      this.modalVisible = true;
    },
  },
};
</script>

<style scoped></style>
