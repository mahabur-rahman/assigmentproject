import React, { useEffect } from "react";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
const SingleTabComponent = ({ index, value, adminLists, userLists }) => {
  const userInfo = [
    { name: "Fistname Lastname" },
    { name: "District" },
    { name: "Division" },
    { name: "Active/Inactive" },
    { btnTable: "Details View" },
  ];

  return (
    <>
      {value === index && (
        <div className="single-tab-main">
          <ProfileInfo userInfo={userInfo} heading />
          {adminLists &&
            adminLists.map((item, i) => {
              return (
                <ProfileInfo
                  key={i}
                  userInfo={userInfo}
                  bg={i % 2 === 0 ? true : false}
                />
              );
            })}
          {userLists &&
            userLists.map((item, i) => {
              return (
                <ProfileInfo
                  key={i}
                  userInfo={userInfo}
                  bg={i % 2 === 0 ? true : false}
                />
              );
            })}
        </div>
      )}
    </>
  );
};
export default SingleTabComponent;
