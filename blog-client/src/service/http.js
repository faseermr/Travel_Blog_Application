import Axios from "axios";

export default Axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
  },
});

export const chatApi = Axios.create({
  baseURL: "http://localhost:5000/api/chat/",
  headers: {
    "Content-type": "application/json",
  },
});
