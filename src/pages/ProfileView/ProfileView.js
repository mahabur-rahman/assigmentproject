import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Heading from "../../components/heading/heading";
import { useGlobalContext } from "../../utils/ContextProvider";
import "./ProfileView.css";
const ProfileView = () => {
  const { id } = useParams();
  const { data, handleEdit } = useGlobalContext();
  const findItem = data.find((item) => item.id === id);

  return (
    <div className="profile-view-main">
      <div className="container-profile-view container">
        <div className="heading-profile-view">
          <Heading heading="Users View" />
        </div>
        <div className="content-profile-view">
          <div className="col-profile-view">
            <div className="item-list row">
              <div className="label">First name * </div>
              <div className="first-name">{findItem.first_name}</div>
            </div>
            <div className="item-list row">
              <div className="label">Last name * </div>
              <div className="last-name">{findItem.last_name}</div>
            </div>
            <div className="item-list row">
              <div className="label">User Type * </div>
              <div className="user-type">{findItem.user_type}</div>
            </div>
            <div className="item-list row">
              <div className="label">Division * </div>
              <div className="division">{findItem.division}</div>
            </div>
            <div className="item-list row">
              <div className="label">District * </div>
              <div className="district">{findItem.district}</div>
            </div>
            <div className="row buttons-profile-view ">
              <Link to="/" className="btn-profile-view btn-back">
                Back
              </Link>
              <Link
                to={`/profileedit/${findItem.id}`}
                onClick={() => handleEdit(findItem)}
                className="btn-profile-view btn-edit"
              >
                Edit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
