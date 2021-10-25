import axios from "axios";
import { State } from "country-state-city";
import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Heading from "../../components/heading/heading";
import { useGlobalContext } from "../../utils/ContextProvider";
import "./ProfileEdit.css";

const ProfileEdit = () => {
  const {
    fistName,
    setFistName,
    lastName,
    setLastName,
    division,
    setDivision,
    district,
    setDistrict,
    fetchData,
  } = useGlobalContext();
  const { id } = useParams();

  // const findItem = data.find((item) => item.id === id);

  // get all state of bd
  const stateOFBd = State.getStatesOfCountry("BD");
  // seperate district and division
  let divitionOfState = stateOFBd.filter(
    (item) => item.name.match(/Division/) && item
  );
  const newDivisionArray = [
    { name: "", empty: "Select your division", value: "" },
    ...divitionOfState,
  ];
  let districtOfState = stateOFBd.filter(
    (item) => item.name.match(/District/) && item
  );
  const newDistrictArray = [
    { name: "", empty: "Select your district" },
    ...districtOfState,
  ];

  // input state
  const url = "https://60f2479f6d44f300177885e6.mockapi.io/users";

  const editUrl = `${url}/${id}`;
  const editData = {
    first_name: fistName,
    last_name: lastName,
    district,
    division,
  };
  const handleSave = (e) => {
    e.preventDefault();
    // put request by axios package
    axios
      .put(editUrl, editData)
      .then((response) => {
        setFistName("");
        setLastName("");
        setDivision("");
        setDistrict("");
        console.log(response);
        fetchData(url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="profile-edit-main">
      <div className="container container-profile-edit">
        <div className="heading-profile-edit">
          <Heading heading="Users Update" />
        </div>
        <div className="content-profile-edit">
          <form className="form-edit-profile">
            <div className="profile-edit-input-field-main">
              <label htmlFor="">Name</label>
              <div className="fields name-filed ">
                <input
                  value={fistName}
                  onChange={(e) => setFistName(e.target.value)}
                  type="text"
                  placeholder="First name"
                />
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  placeholder="Last name"
                />
              </div>
            </div>
            <div className="select-fields-profile-edit">
              <div className="select-field-labels row">
                <label htmlFor="">District</label>
                <label htmlFor="">Division</label>
              </div>
              <div className="select-fields  row">
                <select
                  className="district-select-field "
                  name=""
                  id=""
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                >
                  {newDistrictArray.map((item) => {
                    const { name, empty } = item;
                    const newName = name.replace(name.match(/District/), "");
                    return (
                      <>
                        {empty && <option value="">{empty}</option>}
                        {name === "" ? null : (
                          <option
                            value={newName.toLowerCase()}
                            className="bg-green-50"
                          >
                            {name.replace(name.match(/District/), "")}
                          </option>
                        )}
                      </>
                    );
                  })}
                </select>
                <select
                  className="division-select-field "
                  name=""
                  id=""
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                >
                  {newDivisionArray.map((item) => {
                    const { name, empty } = item;
                    let newName = name.replace(name.match(/Division/), "");
                    return (
                      <>
                        {empty && <option value="">{empty}</option>}
                        {name === "" ? null : (
                          <option
                            value={newName.toLowerCase()}
                            className="bg-green-50"
                          >
                            {name.replace(name.match(/Division/), "")}
                          </option>
                        )}
                      </>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="buttons-profile-edit row">
              <Link
                to={`/profileview/${id}`}
                className="btn-profile-edit btn-cancle"
              >
                Cancle
              </Link>
              <button
                onClick={handleSave}
                className="btn-profile-edit btn-save"
              >
                <span>Save</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
