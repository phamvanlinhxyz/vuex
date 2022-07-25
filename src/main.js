import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import MLoading from "./components/bases/MLoading.vue";

const app = createApp(App);

app
  .component("MLoading", MLoading)
  .use(router)
  .use(store)
  .use(ElementPlus)
  .mount("#app");
