import axios from "axios";

const contactService = {
  async getContact() {
    const req = await axios.get("https://back.ifly.com.uz/api/contact", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return req?.data;
  },
  async deleteContact(id, token) {
    const req = await axios.delete(
      `https://back.ifly.com.uz/api/contact/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return req?.data;
  },

  async postContact(data, token) {
    const req = await axios.post("https://back.ifly.com.uz/api/contact", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return req?.data;
  },

  async getIdContact(id) {
    const req = await axios.get(`https://back.ifly.com.uz/api/contact/${id}`);
    return req?.data;
  },

  async patchContact(id, data, token) {
    const req = await axios.patch(
      `https://back.ifly.com.uz/api/contact/${id}`,
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

export default contactService;
