import { Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Isloading, Modal } from "../components";
import Input from "../components/ui/Input";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { getTeamFailure, getTeamStart, getTeamSuccess } from "../slice/team";
import teamService from "../service/team";
function Team() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("Token");
  const { team, isLoading } = useSelector((state) => state.team);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [editData, setEditData] = useState({
    file: "",
    full_name: "",
    position_de: "",
    position_ru: "",
    position_en: "",
  });

  const [editId, setEditId] = useState(null);

  function openModal() {
    setModalIsOpen(true);
  }
  function editOpenModal() {
    setEditModalIsOpen(true);
  }

  // get team
  const getTeam = async () => {
    dispatch(getTeamStart());
    try {
      const res = await teamService.getTeam();
      dispatch(getTeamSuccess(res?.data));
    } catch (error) {
      dispatch(getTeamFailure(error?.message));
    }
  };

  useEffect(() => {
    getTeam();
  }, []);

  // delete Team
  const deleteFaq = async (id) => {
    try {
      const res = await teamService.deleteTeam(id, token);
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
      getTeam();
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

  // create Team
  const addTeam = async (e) => {
    e.preventDefault();
    const data = {
      file: e.target.image.files[0],
      full_name: e.target.full_name.value,
      position_de: e.target.position_de.value,
      position_ru: e.target.position_ru.value,
      position_en: e.target.position_en.value,
    };
    try {
      const res = await teamService.postTeam(data, token);
      getTeam();
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

  // get Team id
  const editTeam = async (id) => {
    try {
      const res = await teamService.getIdTeam(id);
      setEditData({
        file: res?.data?.image || "",
        full_name: res?.data?.full_name || "",
        position_de: res?.data?.position_de || "",
        position_ru: res?.data?.position_ru || "",
        position_en: res?.data?.position_en || "",
      });
      editOpenModal();
      setEditId(id);
    } catch (error) {
      console.log(error);
    }
  };

  //Edit team
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await teamService.patchTeam(editId, editData, token);
      Toastify({
        text: "Team updated successfully",
        duration: 3000,
        gravity: "top",
        position: "right",
      }).showToast();
      setEditModalIsOpen(false);
      getTeam();
    } catch (error) {
      console.log(error?.response?.data?.message?.error);
      Toastify({
        text: "Error",
        duration: 3000,
        gravity: "top",
        position: "right",
      }).showToast();
    }
  };
  return (
    <div className="w-full overflow-hidden">
      <div className="flex justify-between items-center pb-3">
        <span className="text-xl font-bold">Team</span>
        <Button type="primary" size="large" onClick={openModal}>
          Add Team
        </Button>
      </div>

      <div className="bg-black/10 h-full w-full">
        {modalIsOpen && (
          <Modal
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            buttonTitle={"Add Team"}
            submitTitle={addTeam}
            modalTitle={"Add Team"}
          >
            <Input title={"image"} name={"image"} required={true} type="file" />
            <Input title={"full_name"} name={"full_name"} required={true} />
            <Input title={"position_de"} name={"position_de"} required={true} />
            <Input title={"position_ru"} name={"position_ru"} required={true} />
            <Input title={"position_en"} name={"position_en"} required={true} />
          </Modal>
        )}
      </div>
      <div className="bg-black/10 h-full w-full">
        {editModalIsOpen && (
          <Modal
            modalIsOpen={editModalIsOpen}
            setModalIsOpen={setEditModalIsOpen}
            buttonTitle={"Edit Team"}
            submitTitle={handleEditSubmit}
            modalTitle={"Edit Team"}
          >
            <Input
              title={"image"}
              type="file"
              name={"image"}
              // value={editData.file}
              onChange={(e) =>
                setEditData({ ...editData, file: e.target.files[0] })
              }
              required={true}
            />
            <Input
              title={"full_name"}
              name={"full_name"}
              value={editData.full_name}
              onChange={(e) =>
                setEditData({ ...editData, full_name: e.target.value })
              }
              required={true}
            />
            <Input
              title={"position_de"}
              name={"position_de"}
              value={editData.position_de}
              onChange={(e) =>
                setEditData({ ...editData, position_de: e.target.value })
              }
              required={true}
            />
            <Input
              title={"position_ru"}
              name={"position_ru"}
              value={editData.position_ru}
              onChange={(e) =>
                setEditData({ ...editData, position_ru: e.target.value })
              }
              required={true}
            />
            <Input
              title={"position_en"}
              name={"position_en"}
              value={editData.position_en}
              onChange={(e) =>
                setEditData({ ...editData, position_en: e.target.value })
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
            <th className="w-[14%] border border-black/10 px-2">Images</th>
            <th className="w-[22%] border border-black/10 px-2">Full Name</th>
            <th className="w-[22%] border border-black/10 px-2">Position</th>
            <th className="w-[22%] border border-black/10 px-2">Position</th>
            <th className="w-[16%] border border-black/10 px-2">Actions</th>
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
            team.map((item, index) => (
              <tr className="hover:bg-gray-100 h-16" key={index}>
                <td className="border border-black/10 px-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-black/10 px-2 text-center flex justify-center">
                  <img
                    src={`https://back.ifly.com.uz/${item.image}`}
                    alt={item?.image}
                    className="object-cover rounded-md m-2 w-56 h-34"
                  />
                </td>
                <td className="border border-black/10 px-2 text-center">
                  {item?.full_name}
                </td>
                <td className="border border-black/10 px-2 text-center">
                  {item?.position_de}
                </td>
                <td className="border border-black/10 px-2 text-center">
                  {item?.position_en}
                </td>

                <td className="border border-black/10 px-2">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      type="primary"
                      size="large"
                      onClick={(e) => {
                        editTeam(item.id);
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

export default Team;
