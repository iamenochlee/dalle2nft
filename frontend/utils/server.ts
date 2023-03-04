import axios from "axios";

const server = axios.create({
  baseURL: "http://dalle-ipfshost-server.onrender.com",
});

export default server;
