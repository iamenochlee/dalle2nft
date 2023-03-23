import axios from "axios";

const server = axios.create({
  baseURL: "https://dalle-ipfshost-server.onrender.com/",
});

export default server;
