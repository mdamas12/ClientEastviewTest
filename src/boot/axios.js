import { boot } from "quasar/wrappers";
import axios from "axios";

const API_URL = "https://rest-carga-inteligente.online/";

const api = axios.create({ baseURL: API_URL });

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;

  app.config.globalProperties.$api = api;
});

export { axios, api };
