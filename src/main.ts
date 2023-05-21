import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import matrixWorkerPlugin from "./matrixWorkerPlugin";

const app = createApp(App);

app.use(router);
app.use(matrixWorkerPlugin);

app.mount("#app");
