import React, { useContext, useState } from "react";
import { State } from "country-state-city";
import axios from "axios";
import "./formStyle.css";
import Context from "../../utils/store";
import { useFormik } from "formik";
const url = "https://60f2479f6d44f300177885e6.mockapi.io/users";

const FormAddUser = () => {
  const { hideModal, fetchData } = useContext(Context);
  const user_typeSelect = {
    id: "",
    value: "",
    option: [
      { value: "", text: "Select User Type" },
      { value: "admin", text: "Admin" },
      { value: "employee", text: "Employee" },
    ],
  };

  //validation by formik formik
  const validate = (values) => {
    const errors = {};
    if (!values.first_name) {
      errors.first_name = "Required";
    } else if (values.first_name.length > 10) {
      errors.first_name = "Must be 15 characters or less";
    }
    if (!values.last_name) {
      errors.last_name = "Required";
    } else if (values.last_name.length > 10) {
      errors.last_name = "Must be 15 characters or less";
    }
    if (!values.user_type) {
      errors.user_type = "Required";
    }
    if (!values.division) {
      errors.division = "Required";
    }
    if (!values.district) {
      errors.district = "Required";
    }

    return errors;
  };

  // formik function
  const formik = useFormik({
    // initialvalue
    initialValues: {
      first_name: "",
      last_name: "",
      user_type: "",
      division: "",
      district: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      // alert(JSON.stringify(values, null, 2));
      axios({
        method: "post",
        url,
        data: values,
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then(function (response) {
          console.log(response);
          fetchData();
        })
        .catch(function (error) {
          console.log(error);
        });

      resetForm();
    },
  });

  // get all state of bd
  const stateOFBd = State.getStatesOfCountry("BD");
  // seperate district and division
  let divitionOfState = stateOFBd.filter(
    (item) => item.name.match(/Division/) && item
  );
  const newDivisionArray = [
    { name: "Select your division", value: "" },
    ...divitionOfState,
  ];
  let districtOfState = stateOFBd.filter(
    (item) => item.name.match(/District/) && item
  );
  const newDistrictArray = [
    { name: "Select your district", value: "" },
    ...districtOfState,
  ];

  return (
    <div className="form-main" onSubmit={formik.handleSubmit}>
      <form className="form-add-user">
        <div className={`input-field-main ${formik.errors && "items-start"}`}>
          <label htmlFor="first_name">
            First Name
            <span>*</span>
          </label>
          <div className="input-field first_Name-field">
            <input
              type=""
              name="first_name"
              id="first_name"
              placeholder="Enter your first name"
              onChange={(e) => {
                formik.handleChange(e);
              }}
              value={formik.values.first_name}
              onBlur={formik.handleBlur}
            />
            {formik.touched.first_name && formik.errors.first_name ? (
              <div className="error-inputField">{formik.errors.first_name}</div>
            ) : null}
          </div>
        </div>

        <div className={`input-field-main ${formik.errors && "items-start"}`}>
          <label htmlFor="last_name">
            Last Name length
            <span>*</span>
          </label>
          <div className="input-field last_Name-field">
            <input
              type=""
              name="last_name"
              id="last_name"
              placeholder="Enter your last name "
              onChange={(e) => {
                formik.handleChange(e);
              }}
              value={formik.values.last_name}
              onBlur={formik.handleBlur}
            />
            {formik.touched.last_name && formik.errors.last_name ? (
              <div className="error-inputField">{formik.errors.last_name}</div>
            ) : null}
          </div>
        </div>

        <div className={`input-field-main ${formik.errors && "items-start"}`}>
          <label htmlFor="user-type">
            User Type <span>*</span>
          </label>
          <div className="input-field user_type-field">
            <select
              name="user_type"
              id="user-type"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.user_type}
            >
              {user_typeSelect.option.map((item) => {
                return <option value={item.value}>{item.text}</option>;
              })}
            </select>
            {formik.touched.user_type && formik.errors.user_type ? (
              <div className="error-inputField">{formik.errors.user_type}</div>
            ) : null}
          </div>
        </div>
        <div className={`input-field-main ${formik.errors && "items-start"}`}>
          <label htmlFor="division">
            Division <span>*</span>
          </label>
          <div className="input-field division-field">
            <select
              name="division"
              className="my-2 p-1 px-3"
              id="division"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.division}
            >
              {newDivisionArray.map((item) => {
                const { name, value } = item;
                let newName = name.replace(name.match(/Division/), "");
                return (
                  <>
                    {value && <option value="">{name}</option>}
                    <option
                      value={newName.toLowerCase()}
                      className="bg-green-50"
                    >
                      {name.replace(name.match(/Division/), "")}
                    </option>
                  </>
                );
              })}
            </select>
            {formik.touched.division && formik.errors.division ? (
              <div className="error-inputField">{formik.errors.division}</div>
            ) : null}
          </div>
        </div>
        <div className={`input-field-main ${formik.errors && "items-start"}`}>
          <label htmlFor="district">
            District <span>*</span>
          </label>
          <div className="input-field district-field">
            <select
              name="district"
              className="my-2 p-1 px-3"
              id="district"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.district}
            >
              {newDistrictArray.map((item) => {
                const { name, value } = item;
                const newName = name.replace(name.match(/District/), "");
                return (
                  <>
                    {value && <option value="">{name}</option>}
                    <option
                      value={newName.toLowerCase()}
                      className="bg-green-50"
                    >
                      {name.replace(name.match(/Division/), "")}
                    </option>
                  </>
                );
              })}
            </select>
            {formik.touched.district && formik.errors.district ? (
              <div className="error-inputField">{formik.errors.district}</div>
            ) : null}
          </div>
        </div>

        <div className="buttons-form">
          <button className="btn-cancle" onClick={hideModal}>
            Cancle
          </button>
          <button type="submit" className="btn-save">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormAddUser;
