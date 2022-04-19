import axios from "axios";
import { getCookie } from "./Cookie";

const token = getCookie("authorization");

const instance = axios.create({
  baseURL: "http://52.78.238.235/",
});

instance.defaults.headers.common["authorization"] = token;

instance.interceptors.request.use(function (config) {
  const token = getCookie("authorization");

  config.headers["Content-Type"] =
    "application/json;charset=UTF-8; charset=UTF-8";
  config.headers.common["authorization"] = `${token}`;
  return config;
});

const apis = {
  // 회원가입
  signup: (id, nick, pwd, pwc, location) =>
    instance.post("/user/signup", {
      userId: id,
      userName: nick,
      userPw: pwd,
      userPwCheck: pwc,
      userLocation: location,
    }),

  // 아이디 중복 체크
  idcheck: (id) => instance.post("/user/idcheck", { userId: id }),

  // 로그인
  login: (id, pwd) =>
    instance.post("/user/login", { userId: id, userPw: pwd }),

  // 로그인 체크
  check: () => instance.get("/"),

  // 게시글 수정
  modifyPost: (postId, data) => instance.put("/post/" + postId, data),

  // 게시글 불러오기
  posts: () => instance.get("/post"),

  // 게시글 삭제
  postDel: (postId) => instance.delete("/post/" + postId),

  // 게시글 한개 불러오기
  getOnePost: (postId) => instance.get("/post/" + postId),
};

export default apis;