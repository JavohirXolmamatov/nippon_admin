import { Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Isloading, Modal } from "../components";
import Input from "../components/ui/Input";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { getNewsFailure, getNewsStart, getNewsSuccess } from "../slice/news";
import newsService from "../service/news";
function News() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("Token");
  const { news, isLoading } = useSelector((state) => state.news);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [editData, setEditData] = useState({
    file: "",
    title_en: "",
    title_ru: "",
    title_de: "",
    description_en: "",
    description_ru: "",
    description_de: "",
  });

  const [editId, setEditId] = useState(null);

  function openModal() {
    setModalIsOpen(true);
  }
  function editOpenModal() {
    setEditModalIsOpen(true);
  }

  // get news
  const getNews = async () => {
    dispatch(getNewsStart());
    try {
      const res = await newsService.getNews();
      dispatch(getNewsSuccess(res?.data));
    } catch (error) {
      dispatch(getNewsFailure(error?.message));
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  // delete News
  const deleteNews = async (id) => {
    try {
      const res = await newsService.deleteNews(id, token);
      console.log(res);

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
      getNews();
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

  // create news
  const addNews = async (e) => {
    e.preventDefault();
    const data = {
      file: e.target.image.files[0],
      title_en: e.target.title_en.value,
      title_ru: e.target.title_ru.value,
      title_de: e.target.title_de.value,
      description_en: e.target.description_en.value,
      description_ru: e.target.description_ru.value,
      description_de: e.target.description_de.value,
    };
    try {
      const res = await newsService.postNews(data, token);
      getNews();
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

  // get News id
  const editNews = async (id) => {
    try {
      const res = await newsService.getIdNews(id);
      setEditData({
        file: res?.data?.image || "",
        title_en: res?.data?.title_en || "",
        title_ru: res?.data?.title_ru || "",
        title_de: res?.data?.title_de || "",
        description_en: res?.data?.description_en || "",
        description_ru: res?.data?.description_ru || "",
        description_de: res?.data?.description_de || "",
      });
      editOpenModal();
      setEditId(id);
    } catch (error) {
      console.log(error);
    }
  };

  //Edit News
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newsService.patchNews(editId, editData, token);
      Toastify({
        text: "News updated successfully",
        duration: 3000,
        gravity: "top",
        position: "right",
      }).showToast();
      setEditModalIsOpen(false);
      getNews();
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
        <span className="text-xl font-bold">News</span>
        <Button type="primary" size="large" onClick={openModal}>
          Add News
        </Button>
      </div>

      <div className="bg-black/10 h-full w-full">
        {modalIsOpen && (
          <Modal
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            buttonTitle={"Add News"}
            submitTitle={addNews}
            modalTitle={"Add News"}
          >
            <Input title={"image"} name={"image"} required={true} type="file" />
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
          </Modal>
        )}
      </div>
      <div className="bg-black/10 h-full w-full">
        {editModalIsOpen && (
          <Modal
            modalIsOpen={editModalIsOpen}
            setModalIsOpen={setEditModalIsOpen}
            buttonTitle={"Edit News"}
            submitTitle={handleEditSubmit}
            modalTitle={"Edit News"}
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
              title={"title_en"}
              name={"title_en"}
              value={editData.title_en}
              onChange={(e) =>
                setEditData({ ...editData, title_en: e.target.value })
              }
              required={true}
            />
            <Input
              title={"title_ru"}
              name={"title_ru"}
              value={editData.title_ru}
              onChange={(e) =>
                setEditData({ ...editData, title_ru: e.target.value })
              }
              required={true}
            />
            <Input
              title={"title_de"}
              name={"title_de"}
              value={editData.title_de}
              onChange={(e) =>
                setEditData({ ...editData, title_de: e.target.value })
              }
              required={true}
            />
            <Input
              title={"description_en"}
              name={"description_en"}
              value={editData.description_en}
              onChange={(e) =>
                setEditData({ ...editData, description_en: e.target.value })
              }
              required={true}
            />
            <Input
              title={"description_ru"}
              name={"description_ru"}
              value={editData.description_ru}
              onChange={(e) =>
                setEditData({ ...editData, description_ru: e.target.value })
              }
              required={true}
            />
            <Input
              title={"description_de"}
              name={"description_de"}
              value={editData.description_de}
              onChange={(e) =>
                setEditData({ ...editData, description_de: e.target.value })
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
            <th className="w-[33%] border border-black/10 px-2">Title (EN)</th>
            <th className="w-[33%] border border-black/10 px-2">Description</th>
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
            news.map((item, index) => (
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
                  {item?.title_en}
                </td>
                <td className="border border-black/10 px-2 text-center">
                  {item?.description_en}
                </td>

                <td className="border border-black/10 px-2">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      type="primary"
                      size="large"
                      onClick={(e) => {
                        editNews(item.id);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      danger
                      size="large"
                      onClick={() => {
                        deleteNews(item?.id);
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

export default News;
