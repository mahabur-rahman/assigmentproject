import React, { useContext } from "react";
import TabsComponent from "../../components/TabComponents/tabsComponent";
import { FaPlus } from "react-icons/fa";
import "./profileLists.css";
import Modal from "../../components/addUserModal/Modal";
import Heading from "../../components/heading/heading";

const ProfileLists = () => {
  return (
    <section className="section-profile-lists">
      <Modal />
      <div className="container-profile-lists container">
        <Heading userLists heading="Users Lists" />
        <TabsComponent />
      </div>
    </section>
  );
};

export default ProfileLists;
