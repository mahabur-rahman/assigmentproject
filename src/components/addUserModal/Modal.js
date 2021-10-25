import React, { useContext } from "react";
import Context from "../../utils/store";
import { FaTimes } from "react-icons/fa";
import "./modal.css";
import AddUserForm from "../addUserForm/addUserForm";
const Modal = () => {
  const { isShowModal, hideModal } = useContext(Context);
  return (
    <>
      <div
        onClick={hideModal}
        className={` ${
          isShowModal ? "active-modal-bg modal-bg" : "modal-bg"
        }  `}
      />
      <div className={`modal-main ${isShowModal ? "modal-active" : ""}`}>
        <div className="modal-container">
          <div className="content-modal">
            <div className="header-modal row">
              <h2 className="heading-header-modal">
                Profile Information: Create
              </h2>
              <button className="btn-close-modal row" onClick={hideModal}>
                <FaTimes />
              </button>
            </div>
            <div className="line-modal-header-end" />
            <AddUserForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
