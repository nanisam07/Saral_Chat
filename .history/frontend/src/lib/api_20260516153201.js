

import axios from "axios";

const API = axios.create({
  baseURL:
    "https://saral-chat.onrender.com/api",
});

export const authAPI = {
  async login(
    identifier,
    password
  ) {
    const res = await API.post(
      "/auth/local",
      {
        identifier,
        password,
      }
    );

    return res.data;
  },

  async register({
    username,
    email,
    password,
  }) {
    const res = await API.post(
      "/auth/local/register",
      {
        username,
        email,
        password,
      }
    );

    return res.data;
  },
};

export const messagesAPI = {
  // GET ALL MESSAGES OF ROOM
  async getByRoom(room) {
    try {
      const res = await API.get(
        "/messages?pagination[pageSize]=1000"
      );

      console.log(
        "ALL MESSAGES:",
        res.data
      );

      const messages =
        res.data.data || [];

      return messages
        .map((msg) => ({
          id: msg.id,

          text:
            msg.text ||
            msg.attributes?.text,

          username:
            msg.username ||
            msg.attributes
              ?.username,

          room:
            msg.room ||
            msg.attributes
              ?.room,

          createdAt:
            msg.createdAt ||
            msg.attributes
              ?.createdAt,
        }))
        .filter(
          (msg) =>
            msg.room === room
        )
        .sort(
          (a, b) =>
            new Date(
              a.createdAt
            ) -
            new Date(
              b.createdAt
            )
        );
    } catch (err) {
      console.error(
        "GET MESSAGE ERROR:",
        err.response?.data ||
          err.message
      );

      return [];
    }
  },

  // CREATE NEW MESSAGE
  async create(
    text,
    username,
    room
  ) {
    try {
      const res = await API.post(
        "/messages",
        {
          data: {
            text,
            username,
            room,
          },
        }
      );

      console.log(
        "MESSAGE SAVED:",
        res.data
      );

      return res.data;
    } catch (err) {
      console.error(
        "CREATE MESSAGE ERROR:",
        err.response?.data ||
          err.message
      );

      throw err;
    }
  },
};

export default API;