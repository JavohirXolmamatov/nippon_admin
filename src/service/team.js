import axios from "axios";

const teamService = {
  async getTeam() {
    const req = await axios.get("https://back.ifly.com.uz/api/team-section", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return req?.data;
  },
  async deleteTeam(id, token) {
    const req = await axios.delete(
      `https://back.ifly.com.uz/api/team-section/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return req?.data;
  },

  async postTeam(data, token) {
    const formData = new FormData();

    formData.append("file", data.file);
    formData.append("full_name", data.full_name);
    formData.append("position_de", data.position_de);
    formData.append("position_ru", data.position_ru);
    formData.append("position_en", data.position_en);

    const req = await axios.post(
      "https://back.ifly.com.uz/api/team-section",
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

  async getIdTeam(id) {
    const req = await axios.get(
      `https://back.ifly.com.uz/api/team-section/${id}`
    );
    return req?.data;
  },

  async patchTeam(id, data, token) {
    try {
      const formData = new FormData();
      if (data.file) {
        formData.append("file", data.file);
      }
      formData.append("full_name", data.full_name || "");
      formData.append("position_de", data.position_de || "");
      formData.append("position_ru", data.position_ru || "");
      formData.append("position_en", data.position_en || "");

      const req = await axios.patch(
        `https://back.ifly.com.uz/api/team-section/${id}`,
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

export default teamService;
