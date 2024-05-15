import axios from "axios";

export const SERVER_HOST = "http://localhost:3000";

const server = axios.create({
  baseURL: SERVER_HOST,
  withCredentials: true,
});

export default server;
