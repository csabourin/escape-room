import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import messages from "./locales/messages.js";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const defaultLocale = document.documentElement.lang || "en";
const i18n = createI18n({
  locale: defaultLocale, // set the default language
  fallbackLocale: "en",
  messages,
});

app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount("#app");
