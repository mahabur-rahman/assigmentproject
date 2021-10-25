import React, { createRef, forwardRef, useRef } from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import "./addUserForm.css";
import { State } from "country-state-city";
import { useGlobalContext } from "../../utils/ContextProvider";
import axios from "axios";
import { useEffect } from "react/cjs/react.development";
const url = "https://60f2479f6d44f300177885e6.mockapi.io/users";
const MyTextInput = forwardRef(({ label, ...props }, ref) => {
  const [field, meta] = useField(props);
  return (
    <div
      className={`input-field-main ${
        meta.error && "items-start active-error-input-margin"
      }`}
    >
      <label htmlFor={props.id || props.name}>{label}</label>
      <div className="input-field">
        <input ref={ref} className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error-inputField">{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
});

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div
      className={`input-field-main ${
        meta.error && "items-start active-error-input-margin"
      }`}
    >
      <label htmlFor={props.id || props.name}>{label}</label>
      <div className={`input-field ${props.InputStyle}`}>
        <select {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error-inputField">{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
};

const AddUserForm = () => {
  const { hideModal, fetchData } = useGlobalContext();

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

  const firstNameRef = createRef();
  // const lastNameRef = useRef(null);

  useEffect(() => {
    console.log(firstNameRef.current.value);
  });
  console.log(firstNameRef);
  return (
    <div className="form-main">
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          user_type: "",
          division: "",
          district: "",
        }}
        validationSchema={Yup.object({
          first_name: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          last_name: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          user_type: Yup.string()
            .oneOf(["admin", "employee"], "Invalid Job Type")
            .required("Required"),
          division: Yup.string().required("Required"),
          district: Yup.string().required("Required"),
        })}
        onSubmit={(values, { resetForm, setSubmitting }) => {
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
              fetchData(url);
            })
            .catch(function (error) {
              console.log(error);
            });
          resetForm();
        }}
      >
        <Form className="form-add-user">
          <MyTextInput
            label="First Name"
            name="first_name"
            type="text"
            placeholder="Enter your first name"
            ref={firstNameRef}
          />
          <MyTextInput
            label="Last Name"
            name="last_name"
            type="text"
            placeholder="Enter your last name"
            ref={firstNameRef}
          />

          <MySelect label="User Type" name="user_type">
            <option value="">Select User type</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </MySelect>
          <MySelect label="Division" name="division">
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
          </MySelect>
          <MySelect label="District" name="district">
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
          </MySelect>
          <div className="buttons-form">
            <button className="btn-cancle" type="button" onClick={hideModal}>
              Cancle
            </button>
            <button type="submit" className="btn-save">
              Save
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AddUserForm;
