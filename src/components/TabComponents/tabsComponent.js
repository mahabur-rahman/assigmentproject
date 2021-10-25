import React, { useState } from "react";
import { useGlobalContext } from "../../utils/ContextProvider";
import AdminLists from "../AdminLists/AdminLists";
import UserLists from "../EmployeeLists/EmployeeLists";
import "./tabsComponent.css";
const adminUsers =
  "https://60f2479f6d44f300177885e6.mockapi.io/users?&user_type=admin&page=1&limit=5";
const employeeUsers =
  "https://60f2479f6d44f300177885e6.mockapi.io/users?&user_type=employee&page=1&limit=5";
const TabComponent = () => {
  const { fetchData } = useGlobalContext();
  const [index, setIndex] = useState(0);

  const handleAdmin = () => {
    setIndex(1);
    fetchData(adminUsers);
  };
  const handleEmployee = () => {
    setIndex(0);
    fetchData(employeeUsers);
  };

  return (
    <>
      <div className="tabs-component-main">
        <div className="row-tabs-component row">
          <button
            className={`btn-tab-name ${
              index === 1 && "btn-active-tab-name btn-tab-name"
            }`}
            onClick={handleAdmin}
          >
            Admin User Type
          </button>
          <button
            className={`btn-tab-name ${
              index === 0 && "btn-active-tab-name btn-tab-name"
            }`}
            onClick={handleEmployee}
          >
            Employee User Type
          </button>
        </div>
        <AdminLists index={index} value={1} />
        <UserLists index={index} value={0} />
      </div>
    </>
  );
};

export default TabComponent;
