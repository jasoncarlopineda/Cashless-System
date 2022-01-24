import axios from "axios";
import { getToken } from "./helpers";

export const apiUrl = "http://127.0.0.1:5000";

axios.defaults.baseURL = apiUrl + "/api";
const sleepDuration = 0;

axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(undefined, (error) => {
  throw error.response;
});

const responseBody = (response) => response.data;

const sleep = (ms) => (response) =>
  new Promise((resolve) => setTimeout(() => resolve(response), ms));

const requests = {
  get: (url) => axios.get(url).then(sleep(sleepDuration)).then(responseBody),
  post: (url, body) =>
    axios.post(url, body).then(sleep(sleepDuration)).then(responseBody),
  put: (url, body) =>
    axios.put(url, body).then(sleep(sleepDuration)).then(responseBody),
  delete: (url) =>
    axios.delete(url).then(sleep(sleepDuration)).then(responseBody),
};

const User = {
  login: (formValues) => requests.post("/auth/login", formValues),
  currentUser: () => requests.get("/auth/me"),
  logout: () => requests.post("/auth/logout"),
  list: (page) => requests.get(`/users?page=${page}`),
  find: (id) => requests.get(`/users/${id}`),
};

const Student = {
  list: (page) => requests.get(`/students?page=${page}`),
  create: (req) => requests.post(`/students`, req),
  find: (id) => requests.get(`/students/${id}`),
};

const Rfid = {
  enroll: (request) => requests.post(`/rfids/enroll`, request),
  reduce: (request) => requests.post(`/rfids/reduce`, request),
};

const agent = {
  User,
  Student,
  Rfid,
};

export default agent;
