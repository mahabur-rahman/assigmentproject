import { City, State } from "country-state-city";
import React from "react";

const ProfileLIstsHeading = () => {
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
  // let districtOfState = stateOFBd.filter((item) => item.name.match(/District/) && item);
  // const newDistrictArray = [{ name: "", empty: "Select your district" }, ...districtOfState];
  // let city = City.getCitiesOfCountry("BD");
  // city = City.getCitiesOfState("BD", "13");
  // console.log(city);

  return (
    <div>
      <h2>Profile Lists Heading</h2>
    </div>
  );
};

export default ProfileLIstsHeading;
