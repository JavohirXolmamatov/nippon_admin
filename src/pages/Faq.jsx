import { Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFaqFailure, getFaqStart, getFaqSuccess } from "../slice/faq";
import { Isloading, Modal } from "../components";
import Input from "../components/ui/Input";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import faqService from "../service/faq";

function Faq() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("Token");
  const { faq, isLoading } = useSelector((state) => state.faq);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [editData, setEditData] = useState({
    question_en: "",
    question_ru: "",
    question_de: "",
    answer_en: "",
    answer_ru: "",
    answer_de: "",
  });
  const [editId, setEditId] = useState(null);

  function openModal() {
    setModalIsOpen(true);
  }
  function editOpenModal() {
    setEditModalIsOpen(true);
  }

  // get faq
  const getFaq = async () => {
    dispatch(getFaqStart());
    try {
      const res = await faqService.getFaq();
      dispatch(getFaqSuccess(res?.data));
    } catch (error) {
      dispatch(getFaqFailure(error?.message));
    }
  };

  useEffect(() => {
    getFaq();
  }, []);

  // delete faq
  const deleteFaq = async (id) => {
    try {
      const res = await faqService.deleteFaq(id, token);
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
      getFaq();
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

  // create faq
  const addFaq = async (e) => {
    e.preventDefault();

    const data = {
      question_en: e.target.question_en.value,
      question_ru: e.target.question_ru.value,
      question_de: e.target.question_de.value,
      answer_en: e.target.answer_en.value,
      answer_ru: e.target.answer_ru.value,
      answer_de: e.target.answer_de.value,
    };
    try {
      const res = await faqService.postFaq(data, token);
      getFaq();
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

  // get faq id
  const editFaq = async (id) => {
    try {
      const res = await faqService.getIdFaq(id);
      setEditData({
        question_en: res?.data?.question_en || "",
        question_ru: res?.data?.question_ru || "",
        question_de: res?.data?.question_de || "",
        answer_en: res?.data?.answer_en || "",
        answer_ru: res?.data?.answer_ru || "",
        answer_de: res?.data?.answer_de || "",
      });
      editOpenModal();
      setEditId(id);
    } catch (error) {
      console.log(error);
    }
  };

  //Edit Faq
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await faqService.patchFaq(editId, editData, token);
      Toastify({
        text: "Faq updated successfully",
        duration: 3000,
        gravity: "top",
        position: "right",
      }).showToast();
      setEditModalIsOpen(false);
      getFaq();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full overflow-hidden">
      <div className="flex justify-between items-center pb-3">
        <span className="text-xl font-bold">Faq</span>
        <Button type="primary" size="large" onClick={openModal}>
          Add Faq
        </Button>
      </div>

      <div className="bg-black/10 h-full w-full">
        {modalIsOpen && (
          <Modal
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            buttonTitle={"Add Faq"}
            submitTitle={addFaq}
            modalTitle={"Add Faq"}
          >
            <Input title={"question_en"} name={"question_en"} required={true} />
            <Input title={"question_ru"} name={"question_ru"} required={true} />
            <Input title={"question_de"} name={"question_de"} required={true} />
            <Input title={"answer_en"} name={"answer_en"} required={true} />
            <Input title={"answer_ru"} name={"answer_ru"} required={true} />
            <Input title={"answer_de"} name={"answer_de"} required={true} />
          </Modal>
        )}
      </div>
      <div className="bg-black/10 h-full w-full">
        {editModalIsOpen && (
          <Modal
            modalIsOpen={editModalIsOpen}
            setModalIsOpen={setEditModalIsOpen}
            buttonTitle={"Edit Faq"}
            submitTitle={handleEditSubmit}
            modalTitle={"Edit Faq"}
          >
            <Input
              title={"question_en"}
              name={"question_en"}
              value={editData.question_en}
              onChange={(e) =>
                setEditData({ ...editData, question_en: e.target.value })
              }
              required={true}
            />
            <Input
              title={"question_ru"}
              name={"question_ru"}
              value={editData.question_ru}
              onChange={(e) =>
                setEditData({ ...editData, question_ru: e.target.value })
              }
              required={true}
            />
            <Input
              title={"question_de"}
              name={"question_de"}
              value={editData.question_de}
              onChange={(e) =>
                setEditData({ ...editData, question_de: e.target.value })
              }
              required={true}
            />
            <Input
              title={"answer_en"}
              name={"answer_en"}
              value={editData.answer_en}
              onChange={(e) =>
                setEditData({ ...editData, answer_en: e.target.value })
              }
              required={true}
            />
            <Input
              title={"answer_ru"}
              name={"answer_ru"}
              value={editData.answer_ru}
              onChange={(e) =>
                setEditData({ ...editData, answer_ru: e.target.value })
              }
              required={true}
            />
            <Input
              title={"answer_de"}
              name={"answer_de"}
              value={editData.answer_de}
              onChange={(e) =>
                setEditData({ ...editData, answer_de: e.target.value })
              }
              required={true}
            />
          </Modal>
        )}
      </div>

      <table className="table-fixed w-full border-collapse border border-black/10">
        <thead className="bg-black/20 h-12">
          <tr>
            <th className="w-[4%] border border-black/10 px-2">№</th>
            <th className="w-[35%] border border-black/10 px-2">
              Question (EN)
            </th>
            <th className="w-[35%] border border-black/10 px-2">Answer (EN)</th>
            <th className="w-[26%] border border-black/10 px-2">Actions</th>
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
            faq.map((item, index) => (
              <tr className="hover:bg-gray-100 h-16" key={index}>
                <td className="border border-black/10 px-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-black/10 px-2 text-center">
                  {item?.question_en}
                </td>
                <td className="border border-black/10 px-2 text-center">
                  {item?.answer_en}
                </td>

                <td className="border border-black/10 px-2">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      type="primary"
                      size="large"
                      onClick={(e) => {
                        editFaq(item.id);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      danger
                      size="large"
                      onClick={() => {
                        deleteFaq(item?.id);
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

export default Faq;
