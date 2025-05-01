import axios from "axios";

const faqService = {
  async getFaq() {
    const req = await axios.get("https://back.ifly.com.uz/api/faq", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return req?.data;
  },
  async deleteFaq(id, token) {
    const req = await axios.delete(`https://back.ifly.com.uz/api/faq/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return req?.data;
  },

  async postFaq(data, token) {
    const req = await axios.post("https://back.ifly.com.uz/api/faq", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return req?.data;
  },

  async getIdFaq(id) {
    const req = await axios.get(`https://back.ifly.com.uz/api/faq/${id}`);
    return req?.data;
  },

  async patchFaq(id, data, token) {
    const req = await axios.patch(
      `https://back.ifly.com.uz/api/faq/${id}`,
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

export default faqService;
