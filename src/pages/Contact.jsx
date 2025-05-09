import { Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getContactFailure,
  getContactStart,
  getContactSuccess,
} from "../slice/contact";
import colorService from "../service/color";
import { Isloading, Modal } from "../components";
import Input from "../components/ui/Input";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import contactService from "../service/contact";

function Contact() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("Token");
  const { contact, isLoading } = useSelector((state) => state.contact);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [editData, setEditData] = useState({
    phone_number: "",
    email: "",
    address_en: "",
    address_ru: "",
    address_de: "",
  });
  const [editId, setEditId] = useState(null);

  function openModal() {
    setModalIsOpen(true);
  }
  function editOpenModal() {
    setEditModalIsOpen(true);
  }

  // get contact
  const getContact = async () => {
    dispatch(getContactStart());
    try {
      const res = await contactService.getContact();
      dispatch(getContactSuccess(res?.data));
    } catch (error) {
      dispatch(getContactFailure(error?.message));
    }
  };

  useEffect(() => {
    getContact();
  }, []);

  // delete contact
  const deleteContact = async (id) => {
    try {
      const res = await contactService.deleteContact(id, token);
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
      getContact();
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

  // create contact
  const addContact = async (e) => {
    e.preventDefault();

    const data = {
      phone_number: e.target.phone_number.value,
      email: e.target.email.value,
      address_en: e.target.address_en.value,
      address_ru: e.target.address_ru.value,
      address_de: e.target.address_de.value,
    };
    try {
      const res = await contactService.postContact(data, token);
      getContact();
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

  // get contact id
  const editContact = async (id) => {
    try {
      const res = await contactService.getIdContact(id);
      setEditData({
        phone_number: res?.data?.phone_number || "",
        email: res?.data?.email || "",
        address_en: res?.data?.address_en || "",
        address_ru: res?.data?.address_ru || "",
        address_de: res?.data?.address_de || "",
      });
      editOpenModal();
      setEditId(id);
    } catch (error) {
      console.log(error);
    }
  };

  //Edit contact
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await contactService.patchContact(editId, editData, token);
      Toastify({
        text: "Color updated successfully",
        duration: 3000,
        gravity: "top",
        position: "right",
      }).showToast();
      setEditModalIsOpen(false);
      getContact();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full overflow-hidden">
      <div className="flex justify-between items-center pb-3">
        <span className="text-xl font-bold">Contact</span>
        <Button type="primary" size="large" onClick={openModal}>
          Add Contact
        </Button>
      </div>

      <div className="bg-black/10 h-full w-full">
        {modalIsOpen && (
          <Modal
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            buttonTitle={"Add Contact"}
            submitTitle={addContact}
            modalTitle={"Add Contact"}
          >
            <Input
              title={"phone_number"}
              type="number"
              name={"phone_number"}
              required={true}
            />
            <Input title={"Email"} name={"email"} required={true} />
            <Input title={"address_en"} name={"address_en"} required={true} />
            <Input title={"address_ru"} name={"address_ru"} required={true} />
            <Input title={"address_de"} name={"address_de"} required={true} />
          </Modal>
        )}
      </div>
      <div className="bg-black/10 h-full w-full">
        {editModalIsOpen && (
          <Modal
            modalIsOpen={editModalIsOpen}
            setModalIsOpen={setEditModalIsOpen}
            buttonTitle={"Edit Contact"}
            submitTitle={handleEditSubmit}
            modalTitle={"Edit Contact"}
          >
            <Input
              title={"phone_number"}
              name={"phone_number"}
              value={editData.phone_number}
              onChange={(e) =>
                setEditData({ ...editData, phone_number: e.target.value })
              }
              required={true}
            />
            <Input
              title={"email"}
              name={"email"}
              value={editData.email}
              onChange={(e) =>
                setEditData({ ...editData, email: e.target.value })
              }
              required={true}
            />
            <Input
              title={"address_en"}
              name={"address_en"}
              value={editData.address_en}
              onChange={(e) =>
                setEditData({ ...editData, address_en: e.target.value })
              }
              required={true}
            />
            <Input
              title={"address_ru"}
              name={"address_ru"}
              value={editData.address_ru}
              onChange={(e) =>
                setEditData({ ...editData, address_ru: e.target.value })
              }
              required={true}
            />
            <Input
              title={"address_de"}
              name={"address_de"}
              value={editData.address_de}
              onChange={(e) =>
                setEditData({ ...editData, address_de: e.target.value })
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
            <th className="w-[16%] border border-black/10 px-2">
              Phone Number
            </th>
            <th className="w-[20%] border border-black/10 px-2">Email</th>
            <th className="w-[20%] border border-black/10 px-2">
              Address (EN)
            </th>
            <th className="w-[20%] border border-black/10 px-2">
              Address (RU)
            </th>
            <th className="w-[20%] border border-black/10 px-2">
              Address (DE)
            </th>
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
            contact.map((item, index) => (
              <tr className="hover:bg-gray-100 h-16" key={index}>
                <td className="border border-black/10 px-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-black/10 px-2 text-center">
                  {item?.phone_number}
                </td>
                <td className="border border-black/10 px-2 text-center">
                  {item?.email}
                </td>
                <td className="border border-black/10 px-2 text-center">
                  {item?.address_en}
                </td>
                <td className="border border-black/10 px-2 text-center">
                  {item?.address_ru}
                </td>
                <td className="border border-black/10 px-2 text-center">
                  {item?.address_de}
                </td>
                <td className="border border-black/10 px-2">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      type="primary"
                      size="large"
                      onClick={(e) => {
                        editContact(item.id);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      danger
                      size="large"
                      onClick={() => {
                        deleteContact(item?.id);
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

export default Contact;
