import axios from "axios";

const discountService = {
  async getDiscount() {
    const req = await axios.get("https://back.ifly.com.uz/api/discount", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return req?.data;
  },
  async deleteDiscount(id, token) {
    const req = await axios.delete(
      `https://back.ifly.com.uz/api/discount/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return req?.data;
  },

  async postDiscount(data, token) {
    const req = await axios.post(
      "https://back.ifly.com.uz/api/discount",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return req?.data;
  },

  async getIdDiscount(id) {
    const req = await axios.get(`https://back.ifly.com.uz/api/discount/${id}`);
    return req?.data;
  },

  async patchDiscount(id, data, token) {
    const req = await axios.patch(
      `https://back.ifly.com.uz/api/discount/${id}`,
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

export default discountService;
