import React from "react";
import { FaPlus } from "react-icons/fa";
import { useGlobalContext } from "../../utils/ContextProvider";
import "./heading.css";
const allUsers = "https://60f2479f6d44f300177885e6.mockapi.io/users?";
const Heading = (props) => {
  const { userLists, heading } = props;
  const { showModal, fetchData } = useGlobalContext();
  const handleUserLists = () => {
    fetchData(allUsers);
  };
  return (
    <>
      <div
        className={`${
          userLists ? "heading-userLists-main row" : "heading-main"
        }`}
      >
        <h3 className="heading" onClick={handleUserLists}>
          {heading}
        </h3>
        {userLists && (
          <button className="row btn-add-user" onClick={showModal}>
            <span>add user</span>
            <FaPlus />
          </button>
        )}
      </div>
      <hr />
    </>
  );
};

export default Heading;
