import { chatApi } from "./http";

const getMessages = (sender, reciever) => {
  return chatApi.get(`/${sender}/${reciever}`);
};

export default {
  getMessages,
};
