import { Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Isloading, Modal } from "../components";
import Input from "../components/ui/Input";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
} from "../slice/product";
import productService from "../service/product";
function Products() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("Token");
  const { product, isLoading } = useSelector((state) => state.product);
  const { category } = useSelector((state) => state.category);
  const { color } = useSelector((state) => state.color);
  const { discount } = useSelector((state) => state.discount);
  const { size } = useSelector((state) => state.size);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [editData, setEditData] = useState({
    title_en: "",
    title_ru: "",
    title_de: "",
    description_en: "",
    description_ru: "",
    description_de: "",
    price: "",
    category_id: "",
    sizes_id: [],
    colors_id: [],
    files: [],
    discount_id: [],
    min_sell: "",
  });

  const [editId, setEditId] = useState(null);

  function openModal() {
    setModalIsOpen(true);
  }
  function editOpenModal() {
    setEditModalIsOpen(true);
  }

  // get product
  const getProduct = async () => {
    dispatch(getProductStart());
    try {
      const res = await productService.getProduct();
      dispatch(getProductSuccess(res?.data?.products));
    } catch (error) {
      dispatch(getProductFailure(error?.message));
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  // delete product
  const deleteProduct = async (id) => {
    try {
      const res = await productService.deleteProduct(id, token);
      Toastify({
        text: res?.data,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {},
      }).showToast();
      getProduct();
    } catch (error) {
      console.log(error);
      Toastify({
        text: res?.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {},
      }).showToast();
    }
  };

  // create product
  const addProduct = async (e) => {
    e.preventDefault();
    const form = e.target;

    // `sizes_id` va `colors_id` bo'sh bo'lganda ularni bo'sh array sifatida yubormaslik uchun shart qo'shish
    const sizesId = Array.from(
      form.querySelectorAll('input[name="sizes_id"]:checked')
    ).map((cb) => cb.value);
    const colorsId = Array.from(
      form.querySelectorAll('input[name="colors_id"]:checked')
    ).map((cb) => cb.value);

    const formData = {
      title_en: form.title_en.value,
      title_ru: form.title_ru.value,
      title_de: form.title_de.value,
      description_en: form.description_en.value,
      description_ru: form.description_ru.value,
      description_de: form.description_de.value,
      price: form.price.value,
      category_id: form.category_id.value,
      sizes_id: sizesId.length > 0 ? sizesId : undefined,
      colors_id: colorsId.length > 0 ? colorsId : undefined,
      files: form.images.files,
      discount_id: form.discount_id.value,
      min_sell: form.min_sell.value,
    };

    try {
      const res = await productService.postProduct(formData, token);
      getProduct();
      Toastify({
        text: "Successfully created",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {},
      }).showToast();
      e.target.reset();
    } catch (error) {
      console.log(error.message);
    }
  };

  // get product id
  const editProduct = async (id) => {
    try {
      const res = await productService.getIdProduct(id);
      const product = res?.data;
      setEditData({
        title_en: product?.title_en,
        title_ru: product?.title_ru,
        title_de: product?.title_de,
        description_en: product?.description_en,
        description_ru: product?.description_ru,
        description_de: product?.description_de,
        price: product?.price,
        category_id: product?.category_id,
        sizes_id: product?.sizes_id || [], // mavjud bo‘lsa olish
        colors_id: product?.colors_id || [],
        images: product?.images || [],
        discount_id: product?.discount_id || "",
        min_sell: product?.min_sell,
      });

      editOpenModal();
      setEditId(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await productService.patchProduct(editId, editData, token);
      Toastify({
        text: "Successfully edited",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {},
      }).showToast();
      setEditModalIsOpen(false);
      getProduct();
    } catch (error) {
      Toastify({
        text: "error created",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {},
      }).showToast();
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="flex justify-between items-center pb-3">
        <span className="text-xl font-bold">Product</span>
        <Button type="primary" size="large" onClick={openModal}>
          Add Product
        </Button>
      </div>

      <div className="bg-black/10 h-full w-full">
        {modalIsOpen && (
          <Modal
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            buttonTitle={"Add Product"}
            submitTitle={addProduct}
            modalTitle={"Add Product"}
          >
            <Input title={"title_en"} name={"title_en"} required={true} />
            <Input title={"title_ru"} name={"title_ru"} required={true} />
            <Input title={"title_de"} name={"title_de"} required={true} />
            <Input
              title={"description_en"}
              name={"description_en"}
              required={true}
            />
            <Input
              title={"description_ru"}
              name={"description_ru"}
              required={true}
            />
            <Input
              title={"description_de"}
              name={"description_de"}
              required={true}
            />
            <Input
              title={"Price"}
              name={"price"}
              required={true}
              type="number"
            />
            <Input
              title={"Minimal nechta sotish"}
              name={"min_sell"}
              required={true}
              type="number"
            />
            <label className="py-2 block">
              <span className="block font-bold text-sm mb-2">Categry</span>
              <select
                name="category_id"
                id="category_id"
                className="w-full p-2 border rounded-md"
              >
                {category?.map((item, index) => (
                  <option key={index} value={item?.id}>
                    {item?.name_en}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-row gap-x-4 justify-start flex-wrap">
              <span className="block w-full font-bold text-sm mt-4">Sizes</span>
              {size &&
                size.map((item, index) => (
                  <Input
                    type="checkbox"
                    title={item.size}
                    name={"sizes_id"}
                    value={item.id}
                    key={index}
                  />
                ))}
            </label>
            <label className="flex flex-row gap-4 items-start">
              {color.map((item, index) => (
                <Input
                  key={index}
                  type="checkbox"
                  title={item.color_en}
                  name={"colors_id"}
                  value={item.id}
                />
              ))}
            </label>
            <label className="py-2 block">
              <span className="block font-bold mb-2">discount</span>
              <select
                name="discount_id"
                id="discount_id"
                className="w-full p-2 border rounded-md"
              >
                {discount &&
                  discount?.map((item, index) => (
                    <option key={index} value={item?.id}>
                      {item?.discount}
                    </option>
                  ))}
              </select>
            </label>
            <Input
              title={"Upload images"}
              name={"images"}
              required={true}
              type="file"
            />
          </Modal>
        )}
      </div>
      <div className="bg-black/10 h-full w-full">
        {editModalIsOpen && (
          <Modal
            modalIsOpen={editModalIsOpen}
            setModalIsOpen={setEditModalIsOpen}
            buttonTitle={"Edit Product"}
            submitTitle={handleEditSubmit}
            modalTitle={"Edit Product"}
          >
            <Input
              title={"Upload images"}
              name={"files"}
              type="file"
              onChange={(e) => {
                setEditData((prev) => ({
                  ...prev,
                  files: e.target.files,
                }));
              }}
            />

            <Input
              title={"Title (EN)"}
              name={"title_en"}
              value={editData.title_en}
              onChange={(e) =>
                setEditData({ ...editData, title_en: e.target.value })
              }
              required={true}
            />
            <Input
              title={"Title (RU)"}
              name={"title_ru"}
              value={editData.title_ru}
              onChange={(e) =>
                setEditData({ ...editData, title_ru: e.target.value })
              }
              required={true}
            />
            <Input
              title={"Title (DE)"}
              name={"title_de"}
              value={editData.title_de}
              onChange={(e) =>
                setEditData({ ...editData, title_de: e.target.value })
              }
              required={true}
            />
            <Input
              title={"Description (EN)"}
              name={"description_en"}
              value={editData.description_en}
              onChange={(e) =>
                setEditData({ ...editData, description_en: e.target.value })
              }
              required={true}
            />
            <Input
              title={"Description (RU)"}
              name={"description_ru"}
              value={editData.description_ru}
              onChange={(e) =>
                setEditData({ ...editData, description_ru: e.target.value })
              }
              required={true}
            />
            <Input
              title={"Description (DE)"}
              name={"description_de"}
              value={editData.description_de}
              onChange={(e) =>
                setEditData({ ...editData, description_de: e.target.value })
              }
              required={true}
            />
            <Input
              title={"Price"}
              name={"price"}
              type="number"
              value={editData.price}
              onChange={(e) =>
                setEditData({ ...editData, price: e.target.value })
              }
              required={true}
            />
            <Input
              title={"Minimal Sales"}
              name={"min_sell"}
              type="number"
              value={editData.min_sell}
              onChange={(e) =>
                setEditData({ ...editData, min_sell: e.target.value })
              }
              required={true}
            />
            <label className="py-2 block">
              <span className="block font-bold text-sm mb-2">Category</span>
              <select
                name="category_id"
                id="category_id"
                className="w-full p-2 border rounded-md"
                value={editData.category_id}
                onChange={(e) =>
                  setEditData({ ...editData, category_id: e.target.value })
                }
              >
                {category?.map((item, index) => (
                  <option key={index} value={item?.id}>
                    {item?.name_en}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-row gap-x-4 justify-start flex-wrap">
              <span className="block w-full font-bold text-sm mt-4">Sizes</span>
              {size &&
                size.map((item, index) => (
                  <Input
                    type="checkbox"
                    title={item.size}
                    name={"sizes_id"}
                    value={item.id}
                    key={index}
                    checked={editData.sizes_id.includes(String(item.id))} // check qilinishi
                    onChange={(e) => {
                      const { checked, value } = e.target;
                      setEditData((prev) => ({
                        ...prev,
                        sizes_id: checked
                          ? [...prev.sizes_id, value]
                          : prev.sizes_id.filter((id) => id !== value),
                      }));
                    }}
                  />
                ))}
            </label>

            <label className="flex flex-row gap-4 items-start">
              <span className="block w-full font-bold text-sm mt-4">
                Colors
              </span>
              {color.map((item, index) => (
                <Input
                  key={index}
                  type="checkbox"
                  title={item.color_en}
                  name={"colors_id"}
                  value={item.id}
                  checked={editData.colors_id.includes(String(item.id))}
                  onChange={(e) => {
                    const { checked, value } = e.target;
                    setEditData((prev) => ({
                      ...prev,
                      colors_id: checked
                        ? [...prev.colors_id, value]
                        : prev.colors_id.filter((id) => id !== value),
                    }));
                  }}
                />
              ))}
            </label>

            <label className="py-2 block">
              <span className="block font-bold mb-2">Discount</span>
              <select
                name="discount_id"
                id="discount_id"
                className="w-full p-2 border rounded-md"
                value={editData.discount_id}
                onChange={(e) =>
                  setEditData({ ...editData, discount_id: e.target.value })
                }
              >
                {discount?.map((item, index) => (
                  <option key={index} value={item?.id}>
                    {item?.discount}
                  </option>
                ))}
              </select>
            </label>
          </Modal>
        )}
      </div>

      <table className="table-fixed w-full border-collapse border border-black/10">
        <thead className="bg-black/20 h-12">
          <tr>
            <th className="w-[2%] border border-black/10 px-2">№</th>
            <th className="w-[10%] border border-black/10 px-2">Images</th>
            <th className="w-[10%] border border-black/10 px-2">Title</th>
            <th className="w-[32%] border border-black/10 px-2">Description</th>
            <th className="w-[4%] border border-black/10 px-2">Price</th>
            <th className="w-[6%] border border-black/10 px-2">Category</th>
            <th className="w-[5%] border border-black/10 px-2">Colors</th>
            <th className="w-[4%] border border-black/10 px-2">Sizes</th>
            <th className="w-[8%] border border-black/10 px-2">Discount</th>
            <th className="w-[7%] border border-black/10 px-2">Materials</th>
            <th className="w-[12%] border border-black/10 px-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={5}>
                <div className="flex justify-center items-center w-full h-32">
                  <Isloading />
                </div>
              </td>
            </tr>
          ) : (
            product.map((item, index) => (
              <tr className="hover:bg-gray-100 h-16" key={index}>
                <td className="border border-black/10 px-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-black/10 px-2 text-center flex justify-center">
                  <img
                    src={`https://back.ifly.com.uz/${item.images}`}
                    alt={item?.image}
                    className="object-cover rounded-md m-2 w-56 h-34"
                  />
                </td>
                <td className="border border-black/10 px-2 text-center">
                  {item?.title_en}
                </td>
                <td className="border border-black/10 px-2 text-center">
                  {item?.description_en}
                </td>
                <td className="border border-black/10 px-2 text-center">
                  {item?.price}$
                </td>
                <td className="border border-black/10 px-2 text-center">
                  {item?.category?.name_en}
                </td>
                <td className="border border-black/10 px-2 text-center">
                  {item?.colors.map((color, id) => (
                    <div key={id}>{color?.color_en}</div>
                  ))}
                </td>
                <td className="border border-black/10 px-2 text-center">
                  {item?.sizes?.map((size, id) => (
                    <div key={id} className="text-center">
                      {size?.size}
                    </div>
                  ))}
                </td>
                <td className="border border-black/10 px-2 text-center">
                  {item?.discount?.discount}%
                </td>
                <td className="border border-black/10 px-2 text-center">
                  {item?.materials &&
                    Object.entries(item.materials).map(([key, value]) => (
                      <div key={key}>
                        {key}: {value}%
                      </div>
                    ))}
                </td>

                <td className="border border-black/10 px-2">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      type="primary"
                      size="large"
                      onClick={(e) => {
                        editProduct(item.id);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      danger
                      size="large"
                      onClick={() => {
                        deleteProduct(item?.id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
