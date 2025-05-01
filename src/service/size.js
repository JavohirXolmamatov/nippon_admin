import axios from "axios";

const sizeService = {
  async getSize() {
    const req = await axios.get("https://back.ifly.com.uz/api/sizes", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return req?.data;
  },
  async deleteSize(id, token) {
    const req = await axios.delete(`https://back.ifly.com.uz/api/sizes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return req?.data;
  },

  async postSize(data, token) {
    const req = await axios.post("https://back.ifly.com.uz/api/sizes", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return req?.data;
  },

  async getIdSize(id) {
    const req = await axios.get(`https://back.ifly.com.uz/api/sizes/${id}`);
    return req?.data;
  },

  async patchSize(id, data, token) {
    const req = await axios.patch(
      `https://back.ifly.com.uz/api/sizes/${id}`,
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

export default sizeService;
