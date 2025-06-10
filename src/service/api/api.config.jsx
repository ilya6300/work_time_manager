import axios from "axios";
import config from "../../config.json";

export const req = axios.create({
  baseURL: config.url_api,
});

req.interceptors.request.use((config) => {
  return config;
});

req.interceptors.response.use(
  (config) => {
    return config;
  },
  (e) => {
    console.error("Метод запроса", e);
    if (e.request.status === 0) {
      return alert("Отсутствует подключение к серверу!")
    }
    if (axios.isAxiosError(e)) {
      throw e;
    }
  }
);
