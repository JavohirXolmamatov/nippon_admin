import { Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Isloading, Modal } from "../components";
import Input from "../components/ui/Input";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { getSizeFailure, getSizeStart, getSizeSuccess } from "../slice/size";
import sizeService from "../service/size";
function Sizes() {
  const dispatch = useDispatch();
  const { size, isLoading } = useSelector((state) => state.size);

  const token = localStorage.getItem("Token");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    size: null,
  });

  function openModal() {
    setModalIsOpen(true);
  }
  function editOpenModal() {
    setEditModalIsOpen(true);
  }

  // get sizes
  const getSizes = async () => {
    dispatch(getSizeStart());
    try {
      const res = await sizeService.getSize();
      dispatch(getSizeSuccess(res?.data));
    } catch (error) {
      console.log(error);
      dispatch(getSizeFailure(error?.message));
    }
  };

  useEffect(() => {
    getSizes();
  }, []);

  // delete sizes
  const deleteSizes = async (id) => {
    try {
      const res = await sizeService.deleteSize(id, token);
      getSizes();
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
    } catch (error) {
      console.log(error?.message);
    }
  };

  // create sizes
  const addSizes = async (e) => {
    e.preventDefault();
    const data = {
      size: e.target.size.value,
    };
    try {
      const res = await sizeService.postSize(data, token);
      getSizes();
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
      setModalIsOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  // get size id
  const editSize = async (id) => {
    try {
      const res = await sizeService.getIdSize(id);
      setEditData({
        size: res?.data?.size || "",
      });
      editOpenModal();
      setEditId(id);
    } catch (error) {
      console.log(error);
    }
  };

  //Edit size
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await sizeService.patchSize(editId, editData, token);
      Toastify({
        text: "Sizes updated successfully",
        duration: 3000,
        gravity: "top",
        position: "right",
      }).showToast();
      setEditModalIsOpen(false);
      getSizes();
      e.target.reset();
      setEditModalIsOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full overflow-hidden">
      <div className="flex justify-between items-center pb-3">
        <span className="text-xl font-bold">Sizes</span>
        <Button type="primary" size="large" onClick={openModal}>
          Add Sizes
        </Button>
      </div>

      <div className="bg-black/10 h-full w-full">
        {modalIsOpen && (
          <Modal
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            buttonTitle={"Add Sizes"}
            submitTitle={addSizes}
            modalTitle={"Add Sizes"}
          >
            <Input
              name={"size"}
              type={"number"}
              placeholder={"Sizes"}
              required={true}
            />
          </Modal>
        )}
      </div>
      <div className="bg-black/10 h-full w-full">
        {editModalIsOpen && (
          <Modal
            modalIsOpen={editModalIsOpen}
            setModalIsOpen={setEditModalIsOpen}
            buttonTitle={"Edit Size"}
            submitTitle={handleEditSubmit}
            modalTitle={"Edit Size"}
          >
            <Input
              type="number"
              title={""}
              name={"en"}
              value={editData.size}
              onChange={(e) =>
                setEditData({ ...editData, size: e.target.value })
              }
              required={true}
            />
          </Modal>
        )}
      </div>

      <table className="table-fixed w-full border-collapse border border-black/10">
        <thead className="bg-black/20 h-12">
          <tr>
            <th className="w-[6%] border border-black/10 px-2">№</th>
            <th className="w-[74%] border border-black/10 px-2">Sizes</th>
            <th className="w-[20%] border border-black/10 px-2">Actions</th>
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
            size.map((item, index) => (
              <tr className="hover:bg-gray-100 h-16" key={index}>
                <td className="border border-black/10 px-2 text-center">
                  {index + 1}
                </td>
                <td
                  className={`border border-black/10 px-2 text-center ${
                    item?.size ? "text-green-500" : "text-yellow-500"
                  }`}
                >
                  {item?.size}
                </td>
                <td className="border border-black/10 px-2">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      type="primary"
                      size="large"
                      onClick={(e) => {
                        editSize(item.id);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      danger
                      size="large"
                      onClick={() => {
                        deleteSizes(item?.id);
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

export default Sizes;
