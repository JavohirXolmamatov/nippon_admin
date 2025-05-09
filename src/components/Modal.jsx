function Modal({
  setModalIsOpen,
  children,
  buttonTitle,
  submitTitle,
  modalTitle,
}) {
  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div className="absolute bg-black/20 top-0 left-0 w-full h-full flex justify-center items-center overflow-hidden ">
      <div className="w-[700px] min-h-[400px] max-h-[800px] bg-white rounded-md p-8  overflow-y-scroll">
        <div className="flex justify-between items-center text-xl font-bold">
          <span>{modalTitle}</span>
          <button onClick={closeModal}>X</button>
        </div>
        <form className="my-4" onSubmit={submitTitle}>
          {children}
          <button
            type="submit"
            className="py-2 bg-green-500 w-full  rounded-md"
          >
            <span className="block text-white w-full font-bold ">
              {buttonTitle}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
