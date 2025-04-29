import { Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryFailure,
  getCategoryStart,
  getCategorySuccess,
} from "../slice/category";
import categoryService from "../service/category";
import { Isloading, Modal } from "../components";
import Input from "../components/ui/Input";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

function Category() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("Token");
  const { category, isLoading } = useSelector((state) => state.category);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [editData, setEditData] = useState({
    name_en: "",
    name_de: "",
    name_ru: "",
  });
  const [editId, setEditId] = useState(null);

  function openModal() {
    setModalIsOpen(true);
  }
  function editOpenModal() {
    setEditModalIsOpen(true);
  }

  // get category
  const getCategory = async () => {
    dispatch(getCategoryStart());
    try {
      const res = await categoryService.getCategory();
      dispatch(getCategorySuccess(res?.data));
    } catch (error) {
      dispatch(getCategoryFailure(error?.message));
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  // delete category
  const deleteCategory = async (id) => {
    try {
      const res = await categoryService.deleteCategory(id, token);
      Toastify({
        text: res?.data?.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
      getCategory();
    } catch (error) {
      console.log(error);
      Toastify({
        text: res?.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  };

  // create category
  const addCategory = async (e) => {
    e.preventDefault();
    const data = {
      name_en: e.target.en.value,
      name_de: e.target.de.value,
      name_ru: e.target.ru.value,
    };
    try {
      const res = await categoryService.postCategory(data, token);
      getCategory();
      Toastify({
        text: "Successfully created",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
      e.target.reset();
    } catch (error) {
      console.log(error.message);
    }
  };

  // get category id
  const editCategory = async (id) => {
    try {
      const res = await categoryService.getIdcategory(id);
      setEditData({
        name_en: res?.data?.name_en || "",
        name_de: res?.data?.name_de || "",
        name_ru: res?.data?.name_ru || "",
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
      const res = await categoryService.patchCategory(editId, editData, token);
      Toastify({
        text: "Category updated successfully",
        duration: 3000,
        gravity: "top",
        position: "right",
      }).showToast();
      setEditModalIsOpen(false);
      getCategory();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="flex justify-between items-center pb-3">
        <span className="text-xl font-bold">Category</span>
        <Button type="primary" size="large" onClick={openModal}>
          Add Product
        </Button>
      </div>

      <div className="bg-black/10 h-full w-full">
        {modalIsOpen && (
          <Modal
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            buttonTitle={"Add Category"}
            submitTitle={addCategory}
            modalTitle={"Add Category"}
          >
            <Input title={"Category Name (EN)"} name={"en"} />
            <Input title={"Category Name (RU)"} name={"ru"} />
            <Input title={"Category Name (DE)"} name={"de"} />
          </Modal>
        )}
      </div>
      <div className="bg-black/10 h-full w-full">
        {editModalIsOpen && (
          <Modal
            modalIsOpen={editModalIsOpen}
            setModalIsOpen={setEditModalIsOpen}
            buttonTitle={"Edit Category"}
            submitTitle={handleEditSubmit}
            modalTitle={"Edit Category"}
          >
            <Input
              title={"Category Name (EN)"}
              name={"en"}
              value={editData.name_en}
              onChange={(e) =>
                setEditData({ ...editData, name_en: e.target.value })
              }
            />
            <Input
              title={"Category Name (RU)"}
              name={"ru"}
              value={editData.name_ru}
              onChange={(e) =>
                setEditData({ ...editData, name_ru: e.target.value })
              }
            />
            <Input
              title={"Category Name (DE)"}
              name={"de"}
              value={editData.name_de}
              onChange={(e) =>
                setEditData({ ...editData, name_de: e.target.value })
              }
            />
          </Modal>
        )}
      </div>

      <table className="table-fixed w-full border-collapse border border-black/10">
        <thead className="bg-black/20 h-12">
          <tr>
            <th className="w-[5%] border border-black/10 px-2">№</th>
            <th className="w-[18%] border border-black/10 px-2">Title En</th>
            <th className="w-[18%] border border-black/10 px-2">Title Ru</th>
            <th className="w-[18%] border border-black/10 px-2">Title De</th>
            <th className="w-[11%] border border-black/10 px-2">Actions</th>
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
            category.map((item, index) => (
              <tr className="hover:bg-gray-100 h-16" key={index}>
                <td className="border border-black/10 px-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-black/10 px-2 text-center">
                  {item?.name_en}
                </td>
                <td className="border border-black/10 px-2 text-center">
                  {item?.name_ru}
                </td>
                <td className="border border-black/10 px-2 text-center">
                  {item?.name_de}
                </td>
                <td className="border border-black/10 px-2">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      type="primary"
                      size="large"
                      onClick={(e) => {
                        editCategory(item.id);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      danger
                      size="large"
                      onClick={() => {
                        deleteCategory(item?.id);
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

export default Category;
