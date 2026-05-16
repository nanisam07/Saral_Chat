import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:1337/api",
});

export const authAPI = {
  async login(identifier, password) {
    const res = await API.post(
      "/auth/local",
      {
        identifier,
        password,
      }
    );

    return res.data;
  },

  async register(data) {
    const res = await API.post(
      "/auth/local/register",
      data
    );

    return res.data;
  },
};

export const messagesAPI = {
  async getByRoom(room) {
    try {
      const res = await API.get(
        "/messages"
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
          text,
          username,
          room,
      });
    } catch (err) {
      console.error(err);
    }
  },
};

export default API;