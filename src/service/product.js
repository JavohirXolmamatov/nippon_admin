import axios from "axios";

const productService = {
  async getProduct() {
    const req = await axios.get("https://back.ifly.com.uz/api/product", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return req?.data;
  },

  async deleteProduct(id, token) {
    const req = await axios.delete(
      `https://back.ifly.com.uz/api/product/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return req?.data;
  },

  async postProduct(data, token) {
    const formData = new FormData();

    // Fayllarni birma-bir qo‘shish
    if (data.files.length > 1) {
      // Bir nechta fayl yuborilsa
      for (let i = 0; i < data.files.length; i++) {
        formData.append("files[]", data.files[i]); // Fayllarni array sifatida yuborish
      }
    } else if (data.files.length === 1) {
      // Faqat bitta fayl yuborilsa
      formData.append("files", data.files[0]); // Faqat bitta faylni "file" nomi bilan yuborish
    }

    formData.append("title_en", data.title_en);
    formData.append("title_ru", data.title_ru);
    formData.append("title_de", data.title_de);
    formData.append("description_en", data.description_en);
    formData.append("description_ru", data.description_ru);
    formData.append("description_de", data.description_de);
    formData.append("category_id", data.category_id);
    formData.append("min_sell", data.min_sell);
    formData.append("discount_id", data.discount_id);
    formData.append("price", data.price);

    if (data.sizes_id && data.sizes_id.length > 0) {
      data.sizes_id.forEach((id) => {
        formData.append("sizes_id[]", id);
      });
    }

    if (data.colors_id && data.colors_id.length > 0) {
      data.colors_id.forEach((id) => {
        formData.append("colors_id[]", id);
      });
    }

    const req = await axios.post(
      "https://back.ifly.com.uz/api/product",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "multipart/form-data" — bu avtomatik qo‘shiladi
        },
      }
    );

    return req?.data;
  },

  async getIdProduct(id) {
    const req = await axios.get(`https://back.ifly.com.uz/api/product/${id}`);
    return req?.data;
  },

  async patchProduct(id, data, token) {
    console.log(data);

    try {
      const formData = new FormData();

      // Fayllarni birma-bir qo‘shish
      if (data.files.length > 1) {
        // Bir nechta fayl yuborilsa
        for (let i = 0; i < data.files.length; i++) {
          formData.append("files[]", data.files[i]); // Fayllarni array sifatida yuborish
        }
      } else if (data.files.length === 1) {
        // Faqat bitta fayl yuborilsa
        formData.append("files", data.files[0]); // Faqat bitta faylni "file" nomi bilan yuborish
      }

      formData.append("title_en", data.title_en);
      formData.append("title_ru", data.title_ru);
      formData.append("title_de", data.title_de);
      formData.append("description_en", data.description_en);
      formData.append("description_ru", data.description_ru);
      formData.append("description_de", data.description_de);
      formData.append("category_id", data.category_id);
      formData.append("min_sell", data.min_sell);
      formData.append("discount_id", data.discount_id);
      formData.append("price", data.price);

      if (data.sizes_id && data.sizes_id.length > 0) {
        data.sizes_id.forEach((id) => {
          formData.append("sizes_id[]", id);
        });
      }

      if (data.colors_id && data.colors_id.length > 0) {
        data.colors_id.forEach((id) => {
          formData.append("colors_id[]", id);
        });
      }

      const req = await axios.patch(
        `https://back.ifly.com.uz/api/product/${id}`,
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

export default productService;
