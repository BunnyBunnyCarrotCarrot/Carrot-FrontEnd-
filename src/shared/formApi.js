import axios from "axios";
import { getCookie } from "./Cookie";

export const formapi = axios.create({
  baseURL: "formapi",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

formapi.interceptors.request.use(function (config) {
  const token = getCookie("authorization");

  config.headers.common["authorization"] = `${token}`;
  return config;
});

const formApis = {
  // 게시글 작성
  posting: (formdata) => formapi.post("/item", {formdata}),
};

export default formApis;