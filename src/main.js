import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import components from "@/components/UI";
import VueHighlightJS from "vue3-highlightjs";
import "highlight.js/styles/github.css";
//import "highlight.js/styles/nord.css";

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

app.use(store).use(VueHighlightJS).use(router).mount("#app");
