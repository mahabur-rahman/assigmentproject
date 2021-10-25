import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import "./ProfileInfo.css";
// "https://60f2479f6d44f300177885e6.mockapi.io/users?user_type=employee&district=dhaka&division=dhaka&page=1&limit=2"
const UserInfo = (props) => {
  const {
    bg,
    heading,
    first_name,
    last_name,
    user_type,
    division,
    district,
    id,
    selectDivision,
    setSelectDistict,
    setSelectDivision,
    selectDistict,
  } = props;

  const districtUrl = "https://bdapis.herokuapp.com/api/v1.1/division";
  const divisionsUrl = "https://bdapis.herokuapp.com/api/v1.1/divisions";

  const [divisionData, setDivisionData] = useState([]);
  const [districtData, setDistrictData] = useState([]);

  const fetchDivision = () => {
    axios.get(divisionsUrl).then((respose) => {
      if (respose) {
        setDivisionData(respose.data.data);
      } else {
        setDivisionData([]);
      }
    });
  };

  useEffect(() => {
    fetchDivision();
  }, []);

  const newdivisionData = [
    { division: "", empty: "Select your Division", value: "" },
    ...divisionData,
  ];

  useEffect(() => {
    axios.get(`${districtUrl}/${selectDivision}`).then((respose) => {
      respose.data.data && setDistrictData(respose.data.data);
    });
  }, [selectDivision]);
  const newDistrictData = [
    { district: "", empty: "Select your District", value: "" },
    ...districtData,
  ];

  return (
    <>
      {heading ? (
        <div
          className={`container-user-info ${
            heading
              ? "container-user-info heading-container-user-info "
              : "container-user-info"
          } `}
        >
          <div
            className={`row user-info-row ${
              bg ? " user-info-row-bg" : " border-no-bg"
            }`}
          >
            <div className="user-info-col">
              <div className="name">{"Fistname Lastname"}</div>
            </div>
            <div className="user-info-col">
              <div className="district-dropdown">
                <select
                  name=""
                  id=""
                  value={selectDistict}
                  onChange={(e) => setSelectDistict(e.target.value)}
                >
                  {newDistrictData.map((item) => {
                    const { district, empty } = item;
                    return (
                      <>
                        {empty && <option>{empty}</option>}
                        {district === "" ? null : (
                          <option value={district.toLowerCase()}>
                            {district}
                          </option>
                        )}
                      </>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="user-info-col">
              <div className="division-dropdown">
                <select
                  name=""
                  id=""
                  value={selectDivision}
                  onChange={(e) => setSelectDivision(e.target.value)}
                >
                  {newdivisionData.map((item) => {
                    const { division, empty } = item;
                    return (
                      <>
                        {empty && <option>{empty}</option>}
                        {division === "" ? null : (
                          <option value={division.toLowerCase()}>
                            {division}
                          </option>
                        )}
                      </>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="user-info-col">
              <div className="status text-center">Active/Inactive</div>
            </div>
            <div className="user-info-col">
              <div className="btn-heading text-center">Details View</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-user-info container-user-info">
          <div
            className={`row user-info-row ${
              bg ? " user-info-row-bg" : " border-no-bg"
            }`}
          >
            <div className="user-info-col">
              <div className="name">
                {first_name + " "} {last_name}
              </div>
            </div>
            <div className="user-info-col">
              <div className="district">{district}</div>
            </div>
            <div className="user-info-col">
              <div className="division">{division}</div>
            </div>
            <div className="user-info-col">
              <div className="status text-center">{user_type}</div>
            </div>
            <div className="user-info-col">
              <Link
                className="btn-user-info text-center"
                to={`/profileview/${id + ""}`}
              >
                Details View
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default UserInfo;
