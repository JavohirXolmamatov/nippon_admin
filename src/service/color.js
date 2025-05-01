import axios from "axios";

const colorService = {
  async getColor() {
    const req = await axios.get("https://back.ifly.com.uz/api/colors", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return req?.data;
  },
  async deleteColor(id, token) {
    const req = await axios.delete(
      `https://back.ifly.com.uz/api/colors/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return req?.data;
  },

  async postColor(data, token) {
    const req = await axios.post("https://back.ifly.com.uz/api/colors", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return req?.data;
  },

  async getIdColor(id) {
    const req = await axios.get(`https://back.ifly.com.uz/api/colors/${id}`);
    return req?.data;
  },

  async patchColor(id, data, token) {
    const req = await axios.patch(
      `https://back.ifly.com.uz/api/colors/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return req;
  },
};

export default colorService;
