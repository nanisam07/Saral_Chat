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
  )

  return res.data
},
};

export const messagesAPI = {
  async getByRoom(room) {
  try {
    const res = await API.get(
      "/messages"
    )

    const messages =
      res.data.data || []

    return messages.filter(
      (msg) => {
        if (msg.room === room)
          return true

        if (
          msg.attributes?.room ===
          room
        )
          return true

        return false
      }
    )
  } catch (err) {
    console.error(
      "GET MESSAGE ERROR:",
      err.response?.data ||
        err.message
    )

    return []
  }
},

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
          text: text,
          username: username,
          room: room,
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
}};

export default API;