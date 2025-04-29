import axios from "axios";

const categoryService = {
  async getCategory() {
    const req = await axios.get("https://back.ifly.com.uz/api/category", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return req?.data;
  },
  async deleteCategory(id, token) {
    const req = await axios.delete(
      `https://back.ifly.com.uz/api/category/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return req?.data;
  },

  async postCategory(data, token) {
    const req = await axios.post(
      "https://back.ifly.com.uz/api/category",
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

  async getIdcategory(id) {
    const req = await axios.get(`https://back.ifly.com.uz/api/category/${id}`);
    return req?.data;
  },

  async patchCategory(id, data, token) {
    const req = await axios.patch(
      `https://back.ifly.com.uz/api/category/${id}`,
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

export default categoryService;
