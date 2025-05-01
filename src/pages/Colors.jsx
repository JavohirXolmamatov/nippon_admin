import { Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getColorFailure,
  getColorStart,
  getColorSuccess,
} from "../slice/color";
import colorService from "../service/color";
import { Isloading, Modal } from "../components";
import Input from "../components/ui/Input";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

function Colors() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("Token");
  const { color, isLoading } = useSelector((state) => state.color);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [editData, setEditData] = useState({
    color_en: "",
    color_ru: "",
    color_de: "",
  });
  const [editId, setEditId] = useState(null);

  function openModal() {
    setModalIsOpen(true);
  }
  function editOpenModal() {
    setEditModalIsOpen(true);
  }

  // get color
  const getColor = async () => {
    dispatch(getColorStart());
    try {
      const res = await colorService.getColor();
      dispatch(getColorSuccess(res?.data));
    } catch (error) {
      dispatch(getColorFailure(error?.message));
    }
  };

  useEffect(() => {
    getColor();
  }, []);

  // delete color
  const deleteColor = async (id) => {
    try {
      const res = await colorService.deleteColor(id, token);
      Toastify({
        text: res?.data?.message,
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
      getColor();
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

  // create color
  const addColor = async (e) => {
    e.preventDefault();
    const data = {
      color_en: e.target.color_en.value,
      color_de: e.target.color_de.value,
      color_ru: e.target.color_ru.value,
    };
    try {
      const res = await colorService.postColor(data, token);
      getColor();
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

  // get color id
  const editColor = async (id) => {
    try {
      const res = await colorService.getIdColor(id);
      setEditData({
        color_en: res?.data?.color_en || "",
        color_de: res?.data?.color_de || "",
        color_ru: res?.data?.color_ru || "",
      });
      editOpenModal();
      setEditId(id);
    } catch (error) {
      console.log(error);
    }
  };

  //Edit color
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await colorService.patchColor(editId, editData, token);
      Toastify({
        text: "Color updated successfully",
        duration: 3000,
        gravity: "top",
        position: "right",
      }).showToast();
      setEditModalIsOpen(false);
      getColor();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full overflow-hidden">
      <div className="flex justify-between items-center pb-3">
        <span className="text-xl font-bold">Color</span>
        <Button type="primary" size="large" onClick={openModal}>
          Add Product
        </Button>
      </div>

      <div className="bg-black/10 h-full w-full">
        {modalIsOpen && (
          <Modal
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            buttonTitle={"Add Colors"}
            submitTitle={addColor}
            modalTitle={"Add Colors"}
          >
            <Input title={"Color (EN)"} name={"color_en"} required={true} />
            <Input title={"Color (RU)"} name={"color_ru"} required={true} />
            <Input title={"Color (DE)"} name={"color_de"} required={true} />
          </Modal>
        )}
      </div>
      <div className="bg-black/10 h-full w-full">
        {editModalIsOpen && (
          <Modal
            modalIsOpen={editModalIsOpen}
            setModalIsOpen={setEditModalIsOpen}
            buttonTitle={"Edit Color"}
            submitTitle={handleEditSubmit}
            modalTitle={"Edit Color"}
          >
            <Input
              title={"Color (EN)"}
              name={"color_en"}
              value={editData.color_en}
              onChange={(e) =>
                setEditData({ ...editData, color_en: e.target.value })
              }
              required={true}
            />
            <Input
              title={"Color (RU)"}
              name={"color_ru"}
              value={editData.color_ru}
              onChange={(e) =>
                setEditData({ ...editData, color_ru: e.target.value })
              }
              required={true}
            />
            <Input
              title={"Color (DE)"}
              name={"color_de"}
              value={editData.color_de}
              onChange={(e) =>
                setEditData({ ...editData, color_de: e.target.value })
              }
              required={true}
            />
          </Modal>
        )}
      </div>

      <table className="table-fixed w-full border-collapse border border-black/10">
        <thead className="bg-black/20 h-12">
          <tr>
            <th className="w-[5%] border border-black/10 px-2">№</th>
            <th className="w-[18%] border border-black/10 px-2">Colors En</th>
            <th className="w-[18%] border border-black/10 px-2">Colors Ru</th>
            <th className="w-[18%] border border-black/10 px-2">Colors De</th>
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
            color.map((item, index) => (
              <tr className="hover:bg-gray-100 h-16" key={index}>
                <td className="border border-black/10 px-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-black/10 px-2 text-center">
                  {item?.color_en}
                </td>
                <td className="border border-black/10 px-2 text-center">
                  {item?.color_ru}
                </td>
                <td className="border border-black/10 px-2 text-center">
                  {item?.color_de}
                </td>
                <td className="border border-black/10 px-2">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      type="primary"
                      size="large"
                      onClick={(e) => {
                        editColor(item.id);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      danger
                      size="large"
                      onClick={() => {
                        deleteColor(item?.id);
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

export default Colors;
