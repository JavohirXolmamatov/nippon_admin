import axios from "axios";

const newsService = {
  async getNews() {
    const req = await axios.get("https://back.ifly.com.uz/api/news", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return req?.data;
  },
  async deleteNews(id, token) {
    const req = await axios.delete(`https://back.ifly.com.uz/api/news/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return req?.data;
  },

  async postNews(data, token) {
    const formData = new FormData();

    formData.append("file", data.file);
    formData.append("title_en", data.title_en);
    formData.append("title_ru", data.title_ru);
    formData.append("title_de", data.title_de);
    formData.append("description_en", data.description_en);
    formData.append("description_ru", data.description_en);
    formData.append("description_de", data.description_en);

    const req = await axios.post(
      "https://back.ifly.com.uz/api/news",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          //   "Content-Type": "multipart/form-data",
        },
      }
    );
    return req?.data;
  },

  async getIdNews(id) {
    const req = await axios.get(`https://back.ifly.com.uz/api/news/${id}`);
    return req?.data;
  },

  async patchNews(id, data, token) {
    try {
      const formData = new FormData();
      if (data.file) {
        formData.append("file", data.file);
      }
      formData.append("title_en", data.title_en || "");
      formData.append("title_ru", data.title_ru || "");
      formData.append("title_de", data.title_de || "");
      formData.append("description_en", data.description_en || "");
      formData.append("description_ru", data.description_en || "");
      formData.append("description_de", data.description_en || "");

      const req = await axios.patch(
        `https://back.ifly.com.uz/api/news/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return req.data;
    } catch (error) {
      console.error(
        "PATCH error:",
        error.response?.data?.message || error.message
      );
      throw error;
    }
  },
};

export default newsService;
