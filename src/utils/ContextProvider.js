import React, { useContext, useEffect, useState, useRef } from "react";
import Context from "./store";
import axios from "axios";
const allUsers = "https://60f2479f6d44f300177885e6.mockapi.io/users?&page=1&limit=5";
/// find multiple keymatch
// const urlall = "https://60f2479f6d44f300177885e6.mockapi.io/users?user_type=employee&district=dhaka&division=dhaka&page=1&limit=2";

const ContextProvider = ({ children }) => {
  // main
  const [isShowModal, setIsShowModal] = useState(false);
  const showModal = () => {
    setIsShowModal(true);
  };
  const hideModal = () => {
    setIsShowModal(false);
  };
  // tempdata

  const [data, setData] = useState([]);
  const fetchData = (url) => {
    axios
      .get(url)
      .then((res) => {
        if (res) {
          setData(res.data);
        } else {
          setData([]);
        }
      })
      .then((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData(allUsers);
  }, []);
  //

  //
  const [fistName, setFistName] = useState("");
  const [lastName, setLastName] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");

  const handleEdit = (item) => {
    const { first_name, last_name, division, district } = item;
    setFistName(first_name);
    setLastName(last_name);
    setDivision(division);
    setDistrict(district);
  };

  return (
    <Context.Provider
      value={{
        isShowModal,
        showModal,
        hideModal,
        data,
        fetchData,
        setData,
        handleEdit,
        fistName,
        setFistName,
        lastName,
        setLastName,
        division,
        setDivision,
        district,
        setDistrict,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(Context);
};

export default ContextProvider;
