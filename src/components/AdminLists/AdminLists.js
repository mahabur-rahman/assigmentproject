import React, { useContext, useEffect } from "react";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import { useGlobalContext } from "../../utils/ContextProvider";
const AdminLists = ({ index, value }) => {
  const { userInfo, data } = useGlobalContext();
  return (
    <>
      {value === index && (
        <div className="single-tab-main">
          {data.map((item, i) => {
            return (
              <ProfileInfo
                key={i}
                {...item}
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
export default AdminLists;
