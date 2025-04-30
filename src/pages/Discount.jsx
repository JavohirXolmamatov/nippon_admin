import { Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Isloading, Modal } from "../components";
import Input from "../components/ui/Input";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import discountService from "../service/discount";
import {
  getDiscountFailure,
  getDiscountStart,
  getDiscountSuccess,
} from "../slice/discount";

function Discount() {
  const dispatch = useDispatch();
  const { discount, isLoading } = useSelector((state) => state.discount);
  const token = localStorage.getItem("Token");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    discount: null,
    started_at: "",
    finished_at: "",
    status: "",
  });

  function openModal() {
    setModalIsOpen(true);
  }
  function editOpenModal() {
    setEditModalIsOpen(true);
  }

  // get Discount
  const getDiscount = async () => {
    dispatch(getDiscountStart());
    try {
      const res = await discountService.getDiscount();
      dispatch(getDiscountSuccess(res?.data));
    } catch (error) {
      console.log(error);
      dispatch(getDiscountFailure(error?.message));
    }
  };

  useEffect(() => {
    getDiscount();
  }, []);

  // delete category
  const deleteDiscount = async (id) => {
    try {
      const res = await discountService.deleteDiscount(id, token);
      getDiscount();
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
      console.log(error);
    }
  };

  // create discount
  const addDiscount = async (e) => {
    e.preventDefault();
    const data = {
      discount: Number(e.target.discount.value),
      started_at: e.target.created.value,
      finished_at: e.target.finished.value,
      status: e.target.status.checked,
    };

    try {
      const res = await discountService.postDiscount(data, token);
      getDiscount();
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
      setModalIsOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  // get discount id
  const editDiscount = async (id) => {
    try {
      const res = await discountService.getIdDiscount(id);
      setEditData({
        discount: Number(res?.data?.discount || ""),
        started_at: res?.data?.started_at || "",
        finished_at: res?.data?.finished_at || "",
        status: res?.data?.status || "",
      });
      editOpenModal();
      setEditId(id);
    } catch (error) {
      console.log(error);
    }
  };

  //Edit discount
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await discountService.patchDiscount(editId, editData, token);
      Toastify({
        text: "Discount updated successfully",
        duration: 3000,
        gravity: "top",
        position: "right",
      }).showToast();
      setEditModalIsOpen(false);
      getDiscount();
      e.target.reset();
      setEditModalIsOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full overflow-hidden">
      <div className="flex justify-between items-center pb-3">
        <span className="text-xl font-bold">Discounts</span>
        <Button type="primary" size="large" onClick={openModal}>
          Add Discount
        </Button>
      </div>

      <div className="bg-black/10 h-full w-full">
        {modalIsOpen && (
          <Modal
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            buttonTitle={"Add Discount"}
            submitTitle={addDiscount}
            modalTitle={"Add Discount"}
          >
            <Input
              name={"discount"}
              type={"number"}
              placeholder={"Discount %"}
              required={true}
            />
            <Input name={"created"} type="date" required={true} />
            <Input name={"finished"} type="date" required={true} />
            <Input
              type="checkbox"
              name={"status"}
              title={"Active"}
              witdh={"fit"}
            />
          </Modal>
        )}
      </div>
      <div className="bg-black/10 h-full w-full">
        {editModalIsOpen && (
          <Modal
            modalIsOpen={editModalIsOpen}
            setModalIsOpen={setEditModalIsOpen}
            buttonTitle={"Edit Discount"}
            submitTitle={handleEditSubmit}
            modalTitle={"Edit Discount"}
          >
            <Input
              type="number"
              title={""}
              name={"en"}
              value={editData.discount}
              onChange={(e) =>
                setEditData({ ...editData, discount: Number(e.target.value) })
              }
              required={true}
            />
            <Input
              type="date"
              title={""}
              name={"ru"}
              value={editData.started_at}
              onChange={(e) =>
                setEditData({ ...editData, started_at: e.target.value })
              }
              required={true}
            />
            <Input
              type="date"
              title={""}
              name={"de"}
              value={editData.finished_at}
              onChange={(e) =>
                setEditData({ ...editData, finished_at: e.target.value })
              }
              required={true}
            />
            <Input
              type="checkbox"
              name={"status"}
              title={"Active"}
              witdh={"fit"}
              checked={editData.status}
              onChange={(e) =>
                setEditData({ ...editData, status: e.target.checked })
              }
            />
          </Modal>
        )}
      </div>

      <table className="table-fixed w-full border-collapse border border-black/10">
        <thead className="bg-black/20 h-12">
          <tr>
            <th className="w-[5%] border border-black/10 px-2">№</th>
            <th className="w-[18%] border border-black/10 px-2">
              Discount (%)
            </th>
            <th className="w-[18%] border border-black/10 px-2">
              Created Date
            </th>
            <th className="w-[18%] border border-black/10 px-2">
              Finished Date
            </th>
            <th className="w-[18%] border border-black/10 px-2">Status</th>
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
            discount.map((item, index) => (
              <tr className="hover:bg-gray-100 h-16" key={index}>
                <td className="border border-black/10 px-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-black/10 px-2 text-center">
                  {item?.discount}%
                </td>
                <td className="border border-black/10 px-2 text-center">
                  {item?.started_at}
                </td>
                <td className="border border-black/10 px-2 text-center">
                  {item?.finished_at}
                </td>
                <td
                  className={`border border-black/10 px-2 text-center ${
                    item?.status ? "text-green-500" : "text-yellow-500"
                  }`}
                >
                  {item?.status ? "Active" : "inActive"}
                </td>
                <td className="border border-black/10 px-2">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      type="primary"
                      size="large"
                      onClick={(e) => {
                        editDiscount(item.id);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      danger
                      size="large"
                      onClick={() => {
                        deleteDiscount(item?.id);
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

export default Discount;
