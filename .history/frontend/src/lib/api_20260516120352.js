import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:1337/api",
});

export const messagesAPI = {
  async getByRoom(room) {
    try {
      const res = await API.get(
        `/messages`
      );

      return res.data.data.filter(
        (msg) =>
          msg.room === room ||
          msg.attributes?.room === room
      );
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  async create(
    text,
    username,
    room
  ) {
    try {
      await API.post("/messages", {
        data: {
          text,
          username,
          room,
        },
      });
    } catch (err) {
      console.error(err);
    }
  },
};

export default API;