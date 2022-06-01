<template>
  <textarea name="editor1" id="editor1" cols="30" rows="10"></textarea>
</template>

<script>
// https://ckeditor.com/cke4/builder
// https://ckeditor.com/docs/ckeditor4/latest/examples/codesnippet.html
import { ref, onMounted, watch } from "vue";

export default {
  name: "CkEditor",
  props: ["content"],
  setup(props, { emit }) {
    const content = ref(props.content);
    let ckeditor;

    onMounted(() => {
      ckeditor = window.CKEDITOR.replace("editor1");
      ckeditor.setData(content.value);
      ckeditor.on("change", () => {
        emit("sendContent", ckeditor.getData());
      });
    });
    watch(
      () => props.content,
      (first, second) => {
        if (first !== ckeditor.getData()) {
          ckeditor.setData(first);
        }
      }
    );
  },
};
</script>

<style lang="scss" scoped></style>
