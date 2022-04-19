import axios from "axios";
import { getCookie } from "./Cookie";

const token = getCookie("authorization");

const instance = axios.create({
  baseURL: "http://52.78.238.235/",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

instance.interceptors.request.use(function (config) {
  const token = getCookie("authorization");

  config.headers.common["authorization"] = `${token}`;
  return config;
});

const formApis = {
  // 게시글 작성
  posting: (formdata) => instance.post("/post", formdata),
};

export default formApis;